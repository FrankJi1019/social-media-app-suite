import { StyleSheet, Text, View } from "react-native";
import { GRAPHQL_URL } from "@env";
import { useFetchAllCategories } from "../api-hooks/category";

const HomeScreen = () => {
  const { data, loading } = useFetchAllCategories();

  console.log(data);

  return (
    <View style={styles.container}>
      <Text>{GRAPHQL_URL}</Text>
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

export default HomeScreen;
