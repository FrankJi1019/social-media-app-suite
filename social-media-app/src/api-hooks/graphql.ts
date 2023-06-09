import { gql } from "@apollo/client"

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
`

export const MOMENT_BY_ID_QUERY = gql`
  query Moment($id: ID!) {
    moment(id: $id) {
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
      isLiked
      images
      tags {
        id
        name
      }
    }
  }
`

export const MOMENT_COMMENTS_QUERY = gql`
  query QueryComments($input: QueryCommentInput!) {
    comments(input: $input) {
      id
      content
      createdAt
      character {
        name
      }
      account {
        username
        profileImage
      }
    }
  }
`

export const ALL_CHARACTERS_QUERY = gql`
  query {
    characters {
      id
      name
    }
  }
`

export const POST_MOMENT_MUTATION = gql`
  mutation createMoment($input: CreateMomentInput!) {
    createMoment(input: $input) {
      id
    }
  }
`

export const LIKE_MOMENT_MUTATION = gql`
  mutation likeMoment($input: LikeAndUnlikeMomentInput!) {
    likeMoment(input: $input) {
      id
    }
  }
`

export const UNLIKE_MOMENT_MUTATION = gql`
  mutation unlikeMoment($input: LikeAndUnlikeMomentInput!) {
    unlikeMoment(input: $input) {
      id
    }
  }
`

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
    }
  }
`

export const ALL_CATEGORIES_QUERY = gql`
  query {
    categories {
      id
      name
    }
  }
`

export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      id
      name
    }
  }
`

export const ADD_FRIEND_MUTATION = gql`
  mutation AddFriend($input: CreateFriendshipInput!) {
    createFriendship(input: $input)
  }
`

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      id
    }
  }
`

export const CHAT_HISTORY_QUERY = gql`
  query ($input: FetchChatHistoryInput!) {
    chats(input: $input) {
      id
      sender {
        username
      }
      receiver {
        username
      }
      content
      createdAt
    }
  }
`

export const FIND_OR_CREATE_FRIEND_MUTATION = gql`
  mutation FindOrCreateFriendship($input: FindOrCreateFriendshipInput!) {
    findOrCreateFriendship(input: $input) {
      id
    }
  }
`

export const FETCH_FRIENDSHIP_BY_ID = gql`
  query FindFriendshipById($id: ID!) {
    friendship(id: $id) {
      id
      userAccount {
        username
      }
      friendAccount {
        username
      }
      userCharacter {
        name
      }
      friendCharacter {
        name
      }
    }
  }
`

export const FETCH_FRIENDS_BY_USER = gql`
  query FetchFriends($username: String!) {
    account(username: $username) {
      friends {
        friendAccount {
          username
          profileImage
        }
        friendCharacter {
          name
        }
      }
    }
  }
`

export const REPORT_MOMENT_MUTATION = gql`
  mutation CreateReport($input: ReportMomentInput!) {
    reportMoment(input: $input) {
      id
    }
  }
`

export const ACCOUNT_BY_USERNAME_QUERY = gql`
  query GetAccount($username: String!) {
    account(username: $username) {
      id
      username
      profileImage
    }
  }
`
