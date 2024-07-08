import { gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $role: Role) {
    createUser(name: $name, email: $email, role: $role) {
      id
      name
      email
      role
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $name: String, $email: String, $role: Role) {
    updateUser(id: $id, name: $name, email: $email, role: $role) {
      id
      name
      email
      role
    }
  }
`;

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($userId: String!, $concept: String!, $amount: Float!) {
    createTransaction(userId: $userId, concept: $concept, amount: $amount) {
      id
      userId
      concept
      amount
      createdAt
    }
  }
`;

const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($id: String!, $concept: String, $amount: Float) {
    updateTransaction(id: $id, concept: $concept, amount: $amount) {
      id
      concept
      amount
    }
  }
`;

const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`;

export {
  CREATE_USER,
  UPDATE_USER,
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
};
