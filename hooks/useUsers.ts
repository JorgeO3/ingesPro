'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useUsersDispatch, useUsersState } from '@/lib/store/UsersContext';
import { UPDATE_USER } from '@/lib/graphql/mutations';
import { GET_USERS } from '@/lib/graphql/queries';
import type { OnChangeFn, PaginationState } from '@tanstack/react-table';

const initialPaginationState: PaginationState = {
  pageIndex: 0,
  pageSize: 5,
};

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(initialPaginationState);
  const [rowCount, setRowCount] = useState(5);

  const state = useUsersState();
  const dispatch = useUsersDispatch();

  const { error, refetch, data } = useQuery(GET_USERS, {
    variables: {
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    },
    onCompleted: (data) => {
      dispatch({ type: 'SET_USERS', payload: data.users });
      setRowCount(data.usersCount);
      setIsLoading(false);
    },
  });

  const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
    (updater) => {
      setPagination((prev) => {
        const nextState =
          typeof updater === 'function' ? updater(prev) : updater;
        console.log('nextState', nextState);
        return nextState;
      });
    },
    [],
  );

  useEffect(() => {
    setIsLoading(true);
    refetch({
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    }).then(() => setIsLoading(false));
  }, [pagination, refetch]);

  const toggleForm = useCallback(() => {
    dispatch({ type: 'TOGGLE_FORM' });
  }, [dispatch]);

  const memoizedUsers = useMemo(() => state.users, [state.users]);
  const memoizedIsFormOpen = useMemo(
    () => state.isFormOpen,
    [state.isFormOpen],
  );

  return {
    users: memoizedUsers,
    loading: isLoading,
    error: error,
    isFormOpen: memoizedIsFormOpen,
    toggleForm,
    updateUser: () => {},
    pagination,
    rowCount,
    onPaginationChange: handlePaginationChange,
  };
};
