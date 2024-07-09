// import { useCallback, useEffect, useMemo, useState } from 'react';
// import { useMutation, useQuery } from '@apollo/client';
// import { useUsersContext } from '@/lib/store/UsersContext';
// import { UPDATE_USER } from '@/lib/graphql/mutations';
// import { GET_USERS } from '@/lib/graphql/queries';
// import type { OnChangeFn, PaginationState } from '@tanstack/react-table';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
// }

// export const useUsers = () => {
//   const { state, dispatch } = useUsersContext();
//   const [paginationState, setPaginationState] = useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: 5,
//   });
//   const [isLoading, setIsLoading] = useState(true);

//   const queryVariables = useMemo(
//     () => ({
//       page: paginationState.pageIndex + 1,
//       pageSize: paginationState.pageSize,
//     }),
//     [paginationState.pageIndex, paginationState.pageSize],
//   );

//   const { data, error, refetch } = useQuery(GET_USERS, {
//     variables: queryVariables,
//     notifyOnNetworkStatusChange: true,
//     onCompleted: (fetchedData) => {
//       dispatch({ type: 'SET_USERS', payload: fetchedData.users });
//       setIsLoading(false);
//     },
//   });

//   const [mutateUser] = useMutation(UPDATE_USER);

//   useEffect(() => {
//     if (data?.users) {
//       dispatch({ type: 'SET_USERS', payload: data.users });
//     }
//   }, [data, dispatch]);

//   useEffect(() => {
//     dispatch({ type: 'SET_LOADING', payload: isLoading });
//   }, [isLoading, dispatch]);

//   useEffect(() => {
//     dispatch({ type: 'SET_ERROR', payload: error ? error.message : null });
//   }, [error, dispatch]);

//   // biome-ignore format: off
//   const handleUpdateUser = useCallback(async (user: User) => {
//     setIsLoading(true);
//     try {
//       const { data: updatedData } = await mutateUser({ variables: user });
//       dispatch({ type: 'UPDATE_USER', payload: updatedData.updateUser });
//       return updatedData.updateUser;
//     } catch (updateError) {
//       dispatch({ type: 'SET_ERROR', payload: `Error updating user: ${updateError}` });
//       throw updateError;
//     } finally {
//       setIsLoading(false);
//     }
//   }, [dispatch, mutateUser]);

//   const toggleForm = useCallback(() => {
//     dispatch({ type: 'TOGGLE_FORM' });
//   }, [dispatch]);

//   const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
//     (updater) => {
//       setPaginationState((prevState) => {
//         const nextState =
//           typeof updater === 'function' ? updater(prevState) : updater;
//         console.log('nextState', nextState);
//         return nextState;
//       });
//     },
//     [],
//   );

//   useEffect(() => {
//     console.log('paginationState updated', paginationState);
//     setIsLoading(true);
//     refetch({
//       page: paginationState.pageIndex + 1,
//       pageSize: paginationState.pageSize,
//     }).then(() => setIsLoading(false));
//   }, [paginationState, refetch]);

//   return {
//     users: state.users,
//     loading: isLoading,
//     error: state.error,
//     isFormOpen: state.isFormOpen,
//     toggleForm,
//     updateUser: handleUpdateUser,
//     pagination: paginationState,
//     totalCount: data?.users.totalCount ?? 10000,
//     pageCount: data?.users.pageCount ?? 10000,
//     onPaginationChange: handlePaginationChange,
//   };
// };

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useUsersContext } from '@/lib/store/UsersContext';
import { UPDATE_USER } from '@/lib/graphql/mutations';
import { GET_USERS } from '@/lib/graphql/queries';
import type { OnChangeFn, PaginationState } from '@tanstack/react-table';

const initialPaginationState: PaginationState = {
  pageIndex: 0,
  pageSize: 5,
};

export const useUsers = () => {
  const { state, dispatch } = useUsersContext();
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(initialPaginationState);

  const { error, refetch, data } = useQuery(GET_USERS, {
    variables: {
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    },
    onCompleted: (data) => {
      dispatch({ type: 'SET_USERS', payload: data.users });
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

  return {
    users: state.users,
    loading: isLoading,
    error: error,
    isFormOpen: state.isFormOpen,
    toggleForm,
    updateUser: () => {},
    pagination,
    totalCount: data?.usersCount ?? 10000,
    onPaginationChange: handlePaginationChange,
  };
};
