import { useAuth } from "../../providers/CognitoAuthProvider";
import ProfileScreen from "./ProfileScreen";
import { useCallback } from "react";

const ProfileScreenBuilder = () => {
  const { signIn, isSessionValid } = useAuth();

  const signInHandler = useCallback(
    (username: string, password: string) => {
      signIn(username, password);
    },
    [signIn]
  );

  const registerHandler = useCallback((username: string, password: string) => {
    console.log(username, password);
  }, []);

  return (
    <ProfileScreen
      isAuthenticated={isSessionValid}
      onSignIn={signInHandler}
      onRegister={registerHandler}
    />
  );
};

export default ProfileScreenBuilder;
