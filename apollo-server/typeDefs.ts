const typeDefs = `#graphql
  scalar DateTime
  
  enum Role {
    USER
    ADMIN
  }

  type User {
    id: String
    name: String
    email: String
    emailVerified: DateTime
    image: String
    role: Role
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Transaction {
    id: String
    userId: String
    concept: String
    amount: Float
    createdAt: DateTime
  }

  type Query {
    users(page: Int, pageSize: Int): [User]
    user(id: String!): User
    transactions(page: Int, pageSize: Int): [Transaction]
    transaction(id: String!): Transaction
    usersCount: Int!
  }

  type Mutation {
    updateUser(id: String!, name: String, email: String, role: Role): User
    createTransaction(userId: String!, concept: String!, amount: Float!): Transaction
    updateTransaction(id: String!, concept: String, amount: Float): Transaction
    deleteTransaction(id: String!): Boolean
  }
`;

export default typeDefs;
