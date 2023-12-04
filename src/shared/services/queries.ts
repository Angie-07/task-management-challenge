import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      avatar
      createdAt
      email
      fullName
      id
      type
      updatedAt
    }
  }
`;
export const GET_TASKS = gql`
  query GetTasks($input: FilterTaskInput!) {
    tasks(input: $input) {
      assignee {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
      createdAt
      creator {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
      dueDate
      id
      name
      pointEstimate
      position
      status
      tags
    }
  }
`;
export const GET_USERS = gql`
  query GetUsers {
    users {
      avatar
      createdAt
      email
      fullName
      id
      type
      updatedAt
    }
  }
`;
