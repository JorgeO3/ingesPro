import { useUsersContext } from '@/lib/store/UsersContext';
import { userData } from '@/lib/users';
import { useCallback } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UserInput {
  name: string;
  email: string;
  phone: string;
}

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

// biome-ignore format: off
export const useUsers = () => {
  const { state, dispatch } = useUsersContext();

  const setLoading = useCallback((isLoading: boolean) => 
    dispatch({ type: 'SET_LOADING', payload: isLoading }), [dispatch]);

  const setError = useCallback((error: string) => 
    dispatch({ type: 'SET_ERROR', payload: error }), [dispatch]);

  const handleApiCall = useCallback(async (apiCall: () => Promise<void>) => {
    setLoading(true);
    try {
      await apiCall();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const fetchUsers = useCallback(() => {
    return handleApiCall(async () => {
      // const response = await fetch(BASE_URL);
      // const users = await response.json();
      dispatch({ type: 'SET_USERS', payload: userData });
    });
  }, [dispatch, handleApiCall]);

  const updateUser = useCallback((updatedUser: User) => {
    return handleApiCall(async () => {
      const url = `${BASE_URL}/${updatedUser.id}`;
      const body = JSON.stringify(updatedUser);
      const headers = {
        'Content-type': 'application/json; charset=UTF-8',
      };
      await fetch(url, { method: 'PUT', body, headers });
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    });
  }, [dispatch, handleApiCall]);

  const toggleForm = useCallback(() => {
    dispatch({ type: 'TOGGLE_FORM' });
  } , [dispatch]);

  return {
    loading: state.loading,
    users: state.users,
    error: state.error,
    isFormOpen: state.isFormOpen,
    fetchUsers,
    updateUser,
    toggleForm,
  };
};
