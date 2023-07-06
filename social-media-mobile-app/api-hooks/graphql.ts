import { gql } from "@apollo/client";

export const ALL_CATEGORIES_QUERY = gql`
  query {
    categories {
      id
      name
    }
  }
`;

export const ALL_MOMENTS_QUERY = gql`
  query AllMoments($input: FilterMomentInput) {
    moments(input: $input) {
      id
      account {
        username
        profileImage
      }
      character {
        name
      }
      content
      createdAt
      likeNumber
      commentNumber
      isLiked
      images
    }
  }
`;
