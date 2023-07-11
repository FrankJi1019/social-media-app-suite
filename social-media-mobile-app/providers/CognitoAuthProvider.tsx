import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
} from "react";
import { getTokenStatus } from "../util/auth";
import { ProviderProps } from "../types/props";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Amplify, Auth } from "aws-amplify";
import { CognitoUserSession } from "amazon-cognito-identity-js";

type User = CognitoUserSession;

interface CognitoAuthProviderValue {
  isSessionValid: boolean;
  signIn: (username: string, password: string) => Promise<void>;
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
  userPoolId,
}) => {
  const [accessToken, setAccessToken] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const signIn = useCallback(async (username: string, password: string) => {
    const signInResponse = await Auth.signIn({ username, password });
    const user = {
      username: signInResponse.username,
      email: signInResponse.attributes.email,
    };
    const newAccessToken =
      signInResponse.signInUserSession.accessToken.jwtToken;
    const refreshToken = signInResponse.signInUserSession.refreshToken.token;
    setCurrentUser(await Auth.currentSession());
    setAccessToken(newAccessToken);
    await Promise.all([
      AsyncStorage.setItem(ACCESS_TOKEN_STORAGE_NAME, newAccessToken),
      AsyncStorage.setItem(REFRESH_TOKEN_STORAGE_NAME, refreshToken),
    ]);
  }, []);

  const isSessionValid = useMemo(
    () => getTokenStatus(accessToken) === "VALID",
    [accessToken]
  );

  useEffect(() => {
    (async () => {
      const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_STORAGE_NAME);
      if (accessToken && getTokenStatus(accessToken) === "VALID") {
        setAccessToken(accessToken);
        setCurrentUser(await Auth.currentSession());
      }
    })();
  }, []);

  useLayoutEffect(() => {
    Amplify.configure({
      aws_project_region: region,
      aws_cognito_identity_pool_id: userPoolId,
      aws_cognito_region: region,
      aws_user_pools_id: userPoolId,
      aws_user_pools_web_client_id: clientId,
    });
  }, [region, userPoolId, clientId]);

  const values = useMemo(
    () => ({ signIn, isSessionValid } as CognitoAuthProviderValue),
    [signIn, isSessionValid]
  );

  return <context.Provider value={values}>{children}</context.Provider>;
};

export default CognitoAuthProvider;

export const useAuth = () => useContext(context);
