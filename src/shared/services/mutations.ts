import { gql } from "@apollo/client";

export const ADD_TASK = gql`
  mutation AddTodo($input: CreateTaskInput!) {
    addTodo(input: $input) {
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