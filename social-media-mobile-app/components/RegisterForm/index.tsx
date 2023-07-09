import { View } from "react-native";
import { FC, useState } from "react";
import { TextInput, Button } from "react-native-paper";

interface RegisterFormProps {
  onRegister: (username: string, password: string) => void;
  onSwitchForm: () => void;
}

const ResigterForm: FC<RegisterFormProps> = ({ onRegister, onSwitchForm }) => {
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
        <View style={{ paddingVertical: 24 }}>
          <TextInput
            dense
            secureTextEntry
            value={password}
            onChangeText={(newText) => setPassword(newText)}
            placeholder="Confirm Password"
            left={<TextInput.Icon icon="lock" color="#bbb" />}
            contentStyle={{ padding: 0, margin: 0 }}
            style={{ borderBottomColor: "#e5e5ec", borderBottomWidth: 2 }}
          />
        </View>
      </View>
      <View>
        <Button mode="contained" onPress={() => onRegister(username, password)}>
          Register
        </Button>
        <Button onPress={onSwitchForm}>Already got account?</Button>
      </View>
    </View>
  );
};

export default ResigterForm;
