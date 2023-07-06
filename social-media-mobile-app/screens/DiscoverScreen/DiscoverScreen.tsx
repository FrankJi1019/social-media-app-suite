import Screen from "../../containers/Screen";
import { Text, useTheme } from "react-native-paper";
import { FC } from "react";
import { View, FlatList, Pressable, SafeAreaView } from "react-native";
import { MomentBrief } from "../../types/moment";
import Moment from "../../components/Moment";

interface DiscoverScreenProps {
  currentFilter: string;
  filterOptions: Array<{
    text: string;
    filter: string;
  }>;
  moments: Array<MomentBrief>;
  onChangeFilter: (filter: string) => void;
}

const DiscoverScreen: FC<DiscoverScreenProps> = ({
  filterOptions,
  currentFilter,
  moments,
  onChangeFilter,
}) => {
  const theme = useTheme();

  return (
    <Screen hideHeader title="Discover">
      <SafeAreaView style={{ flex: 1 }}>
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
        <View style={{ flex: 1 }}>
          <FlatList
            data={moments}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <View
                style={{
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  borderBottomColor: "#f8f8f8",
                  borderBottomWidth: 16,
                }}
              >
                <Moment
                  profile={item.profile}
                  character={item.character.name}
                  time={item.postDate}
                  content={item.content}
                  likeNumber={item.likeNumber}
                  commentNumber={item.commentNumber}
                  images={item.images}
                />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default DiscoverScreen;
