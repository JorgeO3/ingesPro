import { useUsersContext } from '@/lib/store/UsersContext';
import { UPDATE_USER } from '@/lib/graphql/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USERS } from '@/lib/graphql/queries';
import { useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export const useUsers = () => {
  const { state, dispatch } = useUsersContext();

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery(GET_USERS, {
    onCompleted: (data) => {
      dispatch({ type: 'SET_USERS', payload: data.users });
    },
  });

  console.log({ usersData, usersLoading, usersError });

  const [updateUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (usersData?.users) {
      dispatch({ type: 'SET_USERS', payload: usersData.users });
    }
  }, [usersData, dispatch]);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: usersLoading });
  }, [usersLoading, dispatch]);

  useEffect(() => {
    usersError
      ? dispatch({ type: 'SET_ERROR', payload: usersError.message })
      : dispatch({ type: 'SET_ERROR', payload: null });
  }, [usersError, dispatch]);

  const handleUpdateUser = async (user: User) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { data } = await updateUser({ variables: user });
      dispatch({ type: 'UPDATE_USER', payload: data.updateUser });
      return data.updateUser;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: `Error updating user: ${error}` });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const toggleForm = () => {
    dispatch({ type: 'TOGGLE_FORM' });
  };

  return {
    users: state.users,
    loading: state.loading,
    error: state.error,
    isFormOpen: state.isFormOpen,
    updateUser: handleUpdateUser,
    toggleForm,
  };
};
