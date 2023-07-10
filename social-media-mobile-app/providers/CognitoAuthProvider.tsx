import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  GetUserCommand,
  InitiateAuthCommand,
  SignUpCommand,
  GetUserCommandOutput,
} from "@aws-sdk/client-cognito-identity-provider";
import { getTokenStatus } from "../util/auth";
import { ProviderProps } from "../types/props";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = GetUserCommandOutput;

interface CognitoAuthProviderValue {
  user: User;
  refreshAccessToken: () => Promise<void>;
  getAccessToken: () => string;
  fetchUserWithToken: () => Promise<User | null>;
  signIn: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  confirmUser: (username: string, code: string) => Promise<void>;
  isSessionValid: () => boolean;
  signOut: () => Promise<void>;
}

interface CognitoAuthProviderProps extends ProviderProps {
  clientId: string;
  userPoolId: string;
  region: string;
}

const context = createContext({} as CognitoAuthProviderValue);

const ACCESS_TOKEN_STORAGE_NAME = "cognito-access-token";
const REFRESH_TOKEN_STORAGE_NAME = "cognito-refresh-token";

const CognitoAuthProvider: FC<CognitoAuthProviderProps> = ({
  children,
  region,
  clientId,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");

  const cognitoClient = useMemo(
    () => new CognitoIdentityProviderClient({ region }),
    [region]
  );

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_NAME);
    if (!refreshToken || refreshToken.trim() === "") {
      return;
    }
    const res = await cognitoClient.send(
      new InitiateAuthCommand({
        ClientId: clientId,
        AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
        },
      })
    );
    const newAccessToken = res.AuthenticationResult?.AccessToken || "";
    await AsyncStorage.setItem(ACCESS_TOKEN_STORAGE_NAME, newAccessToken);
    setAccessToken(newAccessToken);
  }, [clientId, cognitoClient, setAccessToken]);

  const getAccessToken = useCallback(() => {
    const tokenStatus = getTokenStatus(accessToken);
    if (tokenStatus === "VALID" || tokenStatus === "EMPTY") {
      return accessToken;
    } else {
      setAccessToken("");
      return "";
    }
  }, [accessToken, setAccessToken]);

  const fetchUserWithToken = useCallback(async () => {
    if (getTokenStatus(accessToken) !== "VALID") {
      return null;
    }
    return (
      (await cognitoClient.send(
        new GetUserCommand({
          AccessToken: accessToken as string,
        })
      )) || null
    );
  }, [accessToken]);

  const signIn = useCallback(
    async (username: string, password: string) => {
      try {
        const res = await cognitoClient.send(
          new InitiateAuthCommand({
            ClientId: clientId,
            AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
            AuthParameters: {
              USERNAME: username,
              PASSWORD: password,
            },
          })
        );
        await Promise.all([
          AsyncStorage.setItem(
            ACCESS_TOKEN_STORAGE_NAME,
            res.AuthenticationResult?.AccessToken || ""
          ),
          AsyncStorage.setItem(
            REFRESH_TOKEN_STORAGE_NAME,
            res.AuthenticationResult?.RefreshToken || ""
          ),
        ]);
        const user = await fetchUserWithToken();
        setCurrentUser(user);
      } catch (e: any) {
        throw new Error(e.message);
      }
    },
    [clientId, cognitoClient, fetchUserWithToken, setCurrentUser]
  );

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      try {
        await cognitoClient.send(
          new SignUpCommand({
            ClientId: clientId,
            Username: username,
            Password: password,
            UserAttributes: [{ Name: "email", Value: email }],
          })
        );
      } catch (e: any) {
        throw new Error(
          e.message.includes(":") ? e.message.split(": ")[1] : e.message
        );
      }
    },
    [clientId, cognitoClient]
  );

  const confirmUser = useCallback(
    async (username: string, code: string) => {
      try {
        await cognitoClient.send(
          new ConfirmSignUpCommand({
            ClientId: clientId,
            Username: username,
            ConfirmationCode: code,
          })
        );
      } catch (e: any) {
        throw new Error(e.message);
      }
    },
    [clientId, cognitoClient]
  );

  const isSessionValid = useCallback(() => {
    return getTokenStatus(accessToken) === "VALID";
  }, [accessToken]);

  const signOut = useCallback(async () => {
    await Promise.all([
      AsyncStorage.removeItem(REFRESH_TOKEN_STORAGE_NAME),
      AsyncStorage.removeItem(ACCESS_TOKEN_STORAGE_NAME),
    ]);
    setCurrentUser(null);
  }, [setCurrentUser]);

  useEffect(() => {
    (async () => {
      if (getTokenStatus(accessToken) !== "VALID") {
        const storedAccessToken = await AsyncStorage.getItem(
          ACCESS_TOKEN_STORAGE_NAME
        );
        if (
          storedAccessToken &&
          getTokenStatus(storedAccessToken) === "VALID"
        ) {
          setAccessToken(storedAccessToken);
        } else {
          await refreshAccessToken();
        }
        const user = await fetchUserWithToken();
        setCurrentUser(user);
      }
    })();
  }, [accessToken, fetchUserWithToken, setCurrentUser]);

  const values = useMemo(
    () =>
      ({
        user: currentUser,
        refreshAccessToken,
        getAccessToken,
        fetchUserWithToken,
        signIn,
        register,
        confirmUser,
        isSessionValid,
        signOut,
      } as CognitoAuthProviderValue),
    [
      currentUser,
      refreshAccessToken,
      getAccessToken,
      fetchUserWithToken,
      signIn,
      register,
      confirmUser,
      isSessionValid,
      signOut,
    ]
  );

  return <context.Provider value={values}>{children}</context.Provider>;
};

export default CognitoAuthProvider;

export const useAuth = () => useContext(context);
