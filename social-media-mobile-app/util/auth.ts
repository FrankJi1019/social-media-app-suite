import jwt from "jwt-decode";

export const isTokenValid = (accessToken: string) => {
  const { exp } = jwt(accessToken) as { exp: number };
  return +new Date() < exp * 1000;
};

export const getTokenStatus = (
  accessToken: string
): "EMPTY" | "EXPIRED" | "VALID" => {
  if (accessToken.trim() === "") {
    return "EMPTY";
  } else if (!isTokenValid(accessToken)) {
    return "EXPIRED";
  } else {
    return "VALID";
  }
};
