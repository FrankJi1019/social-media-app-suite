import ProfileScreen from "./ProfileScreen";
import { useCallback } from "react";

const ProfileScreenBuilder = () => {
  const signInHandler = useCallback((username: string, password: string) => {
    console.log(username, password);
  }, []);

  const registerHandler = useCallback((username: string, password: string) => {
    console.log(username, password);
  }, []);

  return (
    <ProfileScreen onSignIn={signInHandler} onRegister={registerHandler} />
  );
};

export default ProfileScreenBuilder;
