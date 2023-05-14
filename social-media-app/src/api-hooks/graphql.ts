import { gql } from "@apollo/client"

export const ALL_MOMENTS_QUERY = gql`
  query AllMoments($input: FilterMomentInput) {
    moments(input: $input) {
      id
      username
      character {
        name
      }
      content
      createdAt
      likeNumber
      commentNumber
      isLiked
    }
  }
`

export const MOMENT_BY_ID_QUERY = gql`
  query Moment($id: ID!) {
    moment(id: $id) {
      id
      username
      character {
        name
      }
      content
      createdAt
      likeNumber
      isLiked
      comments {
        id
        username
        content
        createdAt
        character {
          name
        }
      }
      tags {
        id
        name
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
