import { FC } from "react";
import { FlatList, Image, View } from "react-native";
import { Text, Avatar } from "react-native-paper";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface MomentProps {
  profile: string;
  character: string;
  time: Date;
  content: string;
  likeNumber: number;
  commentNumber: number;
  images: Array<string>;
}

const Moment: FC<MomentProps> = ({
  profile,
  character,
  time,
  content,
  likeNumber,
  commentNumber,
  images,
}) => {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ marginRight: 8 }}>
          <Avatar.Image source={{ uri: profile }} size={40} />
        </View>
        <View>
          <Text>{character}</Text>
          <Text style={{ color: "#a5a5a5" }}>
            {moment(time).format("YYYY-MM-DD")}
          </Text>
        </View>
      </View>
      <View style={{ marginVertical: 8 }}>
        {content && (
          <Text variant="bodyMedium" numberOfLines={3}>
            {content}
          </Text>
        )}
        <View style={{ width: "100%" }}>
          <FlatList
            style={{ width: "100%" }}
            numColumns={3}
            data={images}
            keyExtractor={(image) => image}
            renderItem={({ item }) => (
              <View style={{ width: "33.33%", padding: 4 }}>
                <Image
                  resizeMode="cover"
                  source={{ uri: item }}
                  style={{ width: "100%", aspectRatio: 1 }}
                />
              </View>
            )}
          />
        </View>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 16,
          }}
        >
          <MaterialCommunityIcons
            name="cards-heart"
            size={20}
            color="#a5a5a5"
          />
          <Text
            variant="bodyMedium"
            style={{ color: "#a5a5a5", marginLeft: 2 }}
          >
            {likeNumber}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="comment-processing"
            size={20}
            color="#a5a5a5"
          />
          <Text
            variant="bodyMedium"
            style={{ color: "#a5a5a5", marginLeft: 2 }}
          >
            {commentNumber}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Moment;
