import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"
import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  GetUserCommand,
  InitiateAuthCommand,
  SignUpCommand,
  GetUserCommandOutput
} from "@aws-sdk/client-cognito-identity-provider"
import Cookies from "universal-cookie"
import { isTokenValid } from "../utils/auth"
import { ProviderProps } from "../types/props"

export type User = GetUserCommandOutput

interface CognitoAuthProviderValue {
  signIn: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  confirmUser: (username: string, code: string) => Promise<void>
  getAccessToken: () => Promise<string | undefined>
  getAccessTokenWithoutRefresh: () => string | undefined
  currentUser: User | null
  isSessionValid: () => boolean
  signOut: () => void
}

interface CognitoAuthProviderProps extends ProviderProps {
  clientId: string
  userPoolId: string
  region: string
}

const context = createContext({} as CognitoAuthProviderValue)

const CognitoAuthProvider: FC<CognitoAuthProviderProps> = ({
  children,
  region,
  clientId
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const accessTokenCookieName = useMemo(() => "cognito-access-token", [])
  const refreshTokenCookieName = useMemo(() => "cognito-refresh-token", [])
  const cognitoClient = useMemo(
    () => new CognitoIdentityProviderClient({ region }),
    [region]
  )

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = new Cookies().get(refreshTokenCookieName)
    if (!refreshToken) {
      return
    }
    const res = await cognitoClient.send(
      new InitiateAuthCommand({
        ClientId: clientId,
        AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
        AuthParameters: {
          REFRESH_TOKEN: refreshToken
        }
      })
    )
    const newAccessToken = res.AuthenticationResult?.AccessToken
    new Cookies().set(accessTokenCookieName, newAccessToken)
  }, [accessTokenCookieName, clientId, cognitoClient, refreshTokenCookieName])

  const getAccessToken = useCallback(async () => {
    const accessToken = new Cookies().get(accessTokenCookieName)
    if (!(accessToken && isTokenValid(accessToken))) {
      new Cookies().remove(accessTokenCookieName)
      await refreshAccessToken()
    }
    return accessToken
  }, [accessTokenCookieName, refreshAccessToken])

  const fetchUserWithToken = useCallback(async () => {
    const accessToken = await getAccessToken()
    if (!accessToken) return null
    return (
      (await cognitoClient.send(
        new GetUserCommand({
          AccessToken: new Cookies().get(accessTokenCookieName) as string
        })
      )) || null
    )
  }, [accessTokenCookieName, cognitoClient, getAccessToken])

  const signIn = useCallback(
    async (username: string, password: string) => {
      try {
        const res = await cognitoClient.send(
          new InitiateAuthCommand({
            ClientId: clientId,
            AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
            AuthParameters: {
              USERNAME: username,
              PASSWORD: password
            }
          })
        )
        const cookies = new Cookies()
        const now = new Date()
        cookies.set(
          accessTokenCookieName,
          res.AuthenticationResult?.AccessToken,
          { expires: new Date(now.setMonth(now.getMonth() + 1)) }
        )
        cookies.set(
          refreshTokenCookieName,
          res.AuthenticationResult?.RefreshToken,
          { expires: new Date(now.setMonth(now.getMonth() + 2)) }
        )
        const user = await fetchUserWithToken()
        setCurrentUser(user)
      } catch (e: any) {
        throw new Error(e.message)
      }
    },
    [
      accessTokenCookieName,
      clientId,
      cognitoClient,
      fetchUserWithToken,
      refreshTokenCookieName,
      setCurrentUser
    ]
  )

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      try {
        await cognitoClient.send(
          new SignUpCommand({
            ClientId: clientId,
            Username: username,
            Password: password,
            UserAttributes: [{ Name: "email", Value: email }]
          })
        )
      } catch (e: any) {
        throw new Error(
          e.message.includes(":") ? e.message.split(": ")[1] : e.message
        )
      }
    },
    [clientId, cognitoClient]
  )

  const confirmUser = useCallback(
    async (username: string, code: string) => {
      try {
        await cognitoClient.send(
          new ConfirmSignUpCommand({
            ClientId: clientId,
            Username: username,
            ConfirmationCode: code
          })
        )
      } catch (e: any) {
        throw new Error(e.message)
      }
    },
    [clientId, cognitoClient]
  )

  const getAccessTokenWithoutRefresh = useCallback(() => {
    const token = new Cookies().get(accessTokenCookieName)
    if (token && isTokenValid(token)) {
      return token
    } else {
      new Cookies().remove(accessTokenCookieName)
    }
  }, [accessTokenCookieName])

  const isSessionValid = useCallback(() => {
    const accessToken = new Cookies().get(accessTokenCookieName)
    if (!accessToken) return false
    if (isTokenValid(accessToken)) {
      return true
    } else {
      new Cookies().remove(accessTokenCookieName)
      return false
    }
  }, [accessTokenCookieName])

  const signOut = useCallback(() => {
    const cookies = new Cookies()
    cookies.remove(refreshTokenCookieName)
    cookies.remove(accessTokenCookieName)
    setCurrentUser(null)
  }, [accessTokenCookieName, refreshTokenCookieName, setCurrentUser])

  useEffect(() => {
    ;(async () => {
      const token = new Cookies().get(accessTokenCookieName)
      if (!token && new Cookies().get(refreshTokenCookieName)) {
        await getAccessToken()
      }
      const user = await fetchUserWithToken()
      setCurrentUser(user)
    })()
  }, [
    accessTokenCookieName,
    fetchUserWithToken,
    getAccessToken,
    refreshTokenCookieName,
    setCurrentUser
  ])

  const values = useMemo(
    () =>
      ({
        signIn,
        register,
        confirmUser,
        getAccessToken,
        getAccessTokenWithoutRefresh,
        currentUser,
        isSessionValid,
        signOut
      } as CognitoAuthProviderValue),
    [
      confirmUser,
      getAccessToken,
      getAccessTokenWithoutRefresh,
      currentUser,
      isSessionValid,
      register,
      signIn,
      signOut
    ]
  )

  return <context.Provider value={values}>{children}</context.Provider>
}

export default CognitoAuthProvider

export const useAuth = () => useContext(context)
