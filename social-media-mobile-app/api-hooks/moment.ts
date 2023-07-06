import { useQuery } from "@apollo/client";
import { ALL_MOMENTS_QUERY } from "./graphql";
import { MomentBrief } from "../types/moment";
import { Account } from "../types/account";
import { Character } from "../types/character";
import { useMemo } from "react";
import { utcTimestampToDate } from "../util/time";
// @ts-ignore
import profilePlaceholder from "../assets/placeholders/profile-placeholder.jpg";
import { Image } from "react-native";

export const useFetchAllMoments = (input?: {
  category?: string;
  followedBy?: string;
}) => {
  const { data, loading, error, refetch } = useQuery(ALL_MOMENTS_QUERY, {
    fetchPolicy: "network-only",
    variables: { input },
  });
  const moments: Array<MomentBrief> = useMemo(() => {
    if (!data || loading) return [];

    return data.moments.map(
      (moment: {
        id: string;
        account: Account;
        character: Character;
        content: string;
        createdAt: string;
        likeNumber: number;
        commentNumber: number;
        isLiked: boolean;
        images: Array<string>;
      }) => {
        return {
          ...moment,
          isOwnMoment: false,
          profile: Image.resolveAssetSource(profilePlaceholder).uri,
          postDate: utcTimestampToDate(Number(moment.createdAt)),
        } as MomentBrief;
      }
    );
  }, [data, loading]);
  return { data: moments, loading, error, reFetch: refetch };
};
