import { View } from "react-native";
import { FC, useState } from "react";
import { TextInput, Button } from "react-native-paper";

interface SignInFormProps {
  onSignIn: (username: string, password: string) => void;
  onSwitchForm: () => void;
}

const SignInForm: FC<SignInFormProps> = ({ onSignIn, onSwitchForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 52,
        justifyContent: "space-between",
      }}
    >
      <View>
        <View style={{ paddingVertical: 24 }}>
          <TextInput
            dense
            value={username}
            onChangeText={(newText) => setUsername(newText)}
            placeholder="Username"
            left={<TextInput.Icon icon="account" color="#bbb" />}
            contentStyle={{ padding: 0, margin: 0 }}
            style={{ borderBottomColor: "#e5e5ec", borderBottomWidth: 2 }}
          />
        </View>
        <View style={{ paddingVertical: 24 }}>
          <TextInput
            dense
            secureTextEntry
            value={password}
            onChangeText={(newText) => setPassword(newText)}
            placeholder="Password"
            left={<TextInput.Icon icon="lock" color="#bbb" />}
            contentStyle={{ padding: 0, margin: 0 }}
            style={{ borderBottomColor: "#e5e5ec", borderBottomWidth: 2 }}
          />
        </View>
      </View>
      <View>
        <Button mode="contained" onPress={() => onSignIn(username, password)}>
          Sign In
        </Button>
        <Button onPress={onSwitchForm}>New to IncognitoNet?</Button>
      </View>
    </View>
  );
};

export default SignInForm;
