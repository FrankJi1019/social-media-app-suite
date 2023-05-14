import jwt from "jwt-decode"

export const isTokenValid = (accessToken: string) => {
  const { exp } = jwt(accessToken) as { exp: number }
  return +new Date() < exp * 1000
}
