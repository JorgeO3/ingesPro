import { gql } from '@apollo/client';

export const queries = gql`
  query GetUsers($page: Int, $pageSize: Int) {
    users(page: $page, pageSize: $pageSize) {
      id
      name
      phone
      email
      role
    }
  }

  query GetUser($id: String!) {
    user(id: $id) {
      id
      name
      email
      phone
      role
      createdAt
      updatedAt
    }
  }

  query GetTransactions($page: Int, $pageSize: Int) {
    transactions(page: $page, pageSize: $pageSize) {
      id
      userId
      concept
      amount
      createdAt
    }
  }

  query GetTransaction($id: String!) {
    transaction(id: $id) {
      id
      userId
      concept
      amount
      createdAt
    }
  }
`;
