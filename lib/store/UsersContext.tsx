import { useReducer, useContext, createContext } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  isFormOpen: boolean;
}

const INITIAL_STATE: UsersState = {
  users: [],
  loading: false,
  error: null,
  isFormOpen: false,
};

type UsersAction =
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'DELETE_USER'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'TOGGLE_FORM' };

interface UsersContextType {
  state: UsersState;
  dispatch: React.Dispatch<UsersAction>;
}

// biome-ignore format: off
function usersReducer(state: UsersState, action: UsersAction): UsersState {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER': 
      return { ...state, users: state.users.map((user) => user.id === action.payload.id ? action.payload : user)};
    case 'SET_USERS':
      console.log('seteando los usuarios en', action.payload.length);
      return { ...state, users: action.payload };
    case 'DELETE_USER':
      return { ...state, users: state.users.filter((user) => user.id !== action.payload)};
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'TOGGLE_FORM':
      return { ...state, isFormOpen: !state.isFormOpen };
    default:
      return state;
  }
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

interface UsersProviderProps {
  children: React.ReactNode;
}

function UsersProvider({ children }: UsersProviderProps) {
  const [state, dispatch] = useReducer(usersReducer, INITIAL_STATE);
  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
}

function useUsersContext() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsersContext must be used within a UsersProvider');
  }
  return context;
}

export { UsersProvider, useUsersContext };
