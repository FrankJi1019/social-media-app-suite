import { Text, View, StyleSheet } from "react-native";

const PostMomentScreen = () => {
  return (
    <View style={styles.container}>
      <Text>POST MOMENT SCREEN</Text>
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

export default PostMomentScreen;
