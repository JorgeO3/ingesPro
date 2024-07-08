import {
  PrismaClient,
  type Role,
  type User,
  type Transaction,
} from '@prisma/client';
import { GraphQLError, type GraphQLResolveInfo } from 'graphql';
import dateTimeScalar from '@/lib/dateTimeScalar';

const prisma = new PrismaClient();

// Types
export interface MyContext {
  user?: {
    id: string;
    role: Role;
  };
}

interface PaginationArgs {
  page?: number;
  pageSize?: number;
}

// Auth Utils
const isAdmin = (context: MyContext): boolean => context.user?.role === 'ADMIN';

const isOwnerOrAdmin = (context: MyContext, ownerId?: string): boolean =>
  (ownerId !== undefined && context.user?.id === ownerId) || isAdmin(context);

const checkAuthorization = (authorized: boolean): void => {
  if (!authorized) {
    console.error('Not authorized!', authorized);
    throw new GraphQLError('Not authorized!', {
      extensions: { code: 'FORBIDDEN' },
    });
  }
};

interface PaginationArgs {
  page?: number;
  pageSize?: number;
}

type ResolverFunction<TParent, TArgs, TContext, TResult> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult>;

type PaginatedArgs<T extends PaginationArgs> = Omit<T, 'page' | 'pageSize'> & {
  skip: number;
  take: number;
};

const withPagination = <
  TParent,
  TArgs extends PaginationArgs,
  TContext,
  TResult,
>(
  resolver: ResolverFunction<TParent, PaginatedArgs<TArgs>, TContext, TResult>,
): ResolverFunction<TParent, TArgs, TContext, TResult> => {
  return (parent, args, context, info) => {
    const { page = 1, pageSize = 10, ...restArgs } = args;
    const paginatedArgs: PaginatedArgs<TArgs> = {
      ...(restArgs as Omit<TArgs, 'page' | 'pageSize'>),
      skip: (page - 1) * pageSize,
      take: pageSize,
    };
    return resolver(parent, paginatedArgs, context, info);
  };
};

// User Service
const userService = {
  findUsers: (skip: number, take: number): Promise<User[]> =>
    prisma.user.findMany({ skip, take }),

  findUser: (id: string): Promise<User | null> =>
    prisma.user.findUnique({ where: { id } }),

  updateUser: (id: string, data: Partial<User>): Promise<User> =>
    prisma.user.update({ where: { id }, data }),
};

// Transaction Service
const transactionService = {
  findTransactions: (skip: number, take: number): Promise<Transaction[]> =>
    prisma.transaction.findMany({ skip, take }),

  findTransaction: (id: string): Promise<Transaction | null> =>
    prisma.transaction.findUnique({ where: { id } }),

  createTransaction: (
    data: Omit<Transaction, 'id' | 'createdAt'>,
  ): Promise<Transaction> => prisma.transaction.create({ data }),

  updateTransaction: (
    id: string,
    data: Partial<Transaction>,
  ): Promise<Transaction> => prisma.transaction.update({ where: { id }, data }),

  deleteTransaction: (id: string): Promise<Transaction> =>
    prisma.transaction.delete({ where: { id } }),
};

// Resolvers
const resolvers = {
  DateTime: dateTimeScalar,

  Query: {
    users: withPagination(
      async (
        _: unknown,
        { skip, take }: { skip: number; take: number },
        context: MyContext,
      ): Promise<User[]> => {
        checkAuthorization(isAdmin(context));
        return userService.findUsers(skip, take);
      },
    ),

    user: async (
      _: unknown,
      { id }: { id: string },
      context: MyContext,
    ): Promise<User | null> => {
      checkAuthorization(isOwnerOrAdmin(context, id));
      return userService.findUser(id);
    },

    transactions: withPagination(
      async (
        _: unknown,
        { skip, take }: { skip: number; take: number },
        context: MyContext,
      ): Promise<Transaction[]> => {
        checkAuthorization(isAdmin(context));
        return transactionService.findTransactions(skip, take);
      },
    ),

    transaction: async (
      _: unknown,
      { id }: { id: string },
      context: MyContext,
    ): Promise<Transaction | null> => {
      const transaction = await transactionService.findTransaction(id);
      checkAuthorization(isOwnerOrAdmin(context, transaction?.userId));
      return transaction;
    },
  },

  Mutation: {
    updateUser: async (
      _: unknown,
      { id, ...data }: Partial<User> & { id: string },
      context: MyContext,
    ): Promise<User> => {
      checkAuthorization(isOwnerOrAdmin(context, id));
      return userService.updateUser(id, data);
    },

    createTransaction: async (
      _: unknown,
      data: Omit<Transaction, 'id' | 'createdAt'>,
      context: MyContext,
    ): Promise<Transaction> => {
      checkAuthorization(context.user?.id === data.userId);
      return transactionService.createTransaction(data);
    },

    updateTransaction: async (
      _: unknown,
      { id, ...data }: Partial<Transaction> & { id: string },
      context: MyContext,
    ): Promise<Transaction> => {
      const transaction = await transactionService.findTransaction(id);
      checkAuthorization(isOwnerOrAdmin(context, transaction?.userId));
      return transactionService.updateTransaction(id, data);
    },

    deleteTransaction: async (
      _: unknown,
      { id }: { id: string },
      context: MyContext,
    ): Promise<boolean> => {
      const transaction = await transactionService.findTransaction(id);
      checkAuthorization(isOwnerOrAdmin(context, transaction?.userId));
      await transactionService.deleteTransaction(id);
      return true;
    },
  },
};

export default resolvers;
