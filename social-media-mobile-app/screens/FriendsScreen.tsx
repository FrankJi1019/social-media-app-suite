import { Text, View, StyleSheet } from "react-native";

const MomentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MOMENTS SCREEN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MomentsScreen;
