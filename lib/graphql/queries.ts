// queries.ts
import { gql } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers($page: Int, $pageSize: Int) {
    users(page: $page, pageSize: $pageSize) {
      id
      name
      email
      role
    }
  }
`;

const GET_USER = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      name
      email
      role
    }
  }
`;

const GET_TRANSACTIONS = gql`
  query GetTransactions($page: Int, $pageSize: Int) {
    transactions(page: $page, pageSize: $pageSize) {
      id
      userId
      concept
      amount
      createdAt
    }
  }
`;

const GET_TRANSACTION = gql`
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

export { GET_USERS, GET_USER, GET_TRANSACTIONS, GET_TRANSACTION };
