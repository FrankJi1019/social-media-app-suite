import Screen from "../../containers/Screen";
import { Text, useTheme } from "react-native-paper";
import { FC } from "react";
import { View, FlatList, Pressable, SafeAreaView } from "react-native";

interface DiscoverScreenProps {
  currentFilter: string;
  filterOptions: Array<{
    text: string;
    filter: string;
  }>;
  onChangeFilter: (filter: string) => void;
}

const DiscoverScreen: FC<DiscoverScreenProps> = ({
  filterOptions,
  currentFilter,
  onChangeFilter,
}) => {
  const theme = useTheme();

  return (
    <Screen hideHeader title="Discover">
      <SafeAreaView>
        <View
          style={{
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
          }}
        >
          <FlatList
            horizontal
            data={filterOptions}
            renderItem={({ item: { text, filter }, index }) => (
              <Pressable onPress={() => onChangeFilter(filter)}>
                <View
                  style={{
                    paddingVertical: 4,
                    paddingHorizontal: 6,
                    marginHorizontal: 6,
                    marginLeft: index === 0 ? 16 : 6,
                    marginRight: index === filterOptions.length - 1 ? 16 : 6,
                  }}
                >
                  <Text
                    variant="bodyLarge"
                    style={{
                      transform: [
                        { scale: currentFilter === filter ? 1.1 : 1 },
                      ],
                      color:
                        currentFilter === filter
                          ? theme.colors.onPrimary
                          : "#777",
                      fontWeight: "500",
                    }}
                  >
                    {text}
                  </Text>
                </View>
              </Pressable>
            )}
            keyExtractor={(item) => item.filter}
          />
        </View>
        <View>
          <Text>Filtering by {currentFilter}</Text>
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default DiscoverScreen;
