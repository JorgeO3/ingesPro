import { useReducer, useContext, createContext, useMemo } from 'react';

interface User {
  id: string;
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
  | { type: 'DELETE_USER'; payload: string }
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

const UsersStateContext = createContext<UsersState | undefined>(undefined);
const UsersDispatchContext = createContext<
  React.Dispatch<UsersAction> | undefined
>(undefined);

const UsersContext = createContext<UsersContextType | undefined>(undefined);

interface UsersProviderProps {
  children: React.ReactNode;
}

function UsersProvider({ children }: UsersProviderProps) {
  const [state, dispatch] = useReducer(usersReducer, INITIAL_STATE);
  const memoizedState = useMemo(() => state, [state]);
  return (
    <UsersStateContext.Provider value={memoizedState}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
}

function useUsersState() {
  const context = useContext(UsersStateContext);
  if (context === undefined) {
    throw new Error('useUsersState must be used within a UsersProvider');
  }
  return context;
}

function useUsersDispatch() {
  const context = useContext(UsersDispatchContext);
  if (context === undefined) {
    throw new Error('useUsersDispatch must be used within a UsersProvider');
  }
  return context;
}

export { UsersProvider, useUsersState, useUsersDispatch };

// import {
//   useReducer,
//   useContext,
//   createContext,
//   useMemo,
// } from 'react';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
// }

// interface UsersState {
//   users: User[];
//   loading: boolean;
//   error: string | null;
//   isFormOpen: boolean;
// }

// const INITIAL_STATE: UsersState = {
//   users: [],
//   loading: false,
//   error: null,
//   isFormOpen: false,
// };

// type UsersAction =
//   | { type: 'ADD_USER'; payload: User }
//   | { type: 'UPDATE_USER'; payload: User }
//   | { type: 'SET_USERS'; payload: User[] }
//   | { type: 'DELETE_USER'; payload: string }
//   | { type: 'SET_LOADING'; payload: boolean }
//   | { type: 'SET_ERROR'; payload: string | null }
//   | { type: 'TOGGLE_FORM' };

// interface UsersContextType {
//   state: UsersState;
//   dispatch: React.Dispatch<UsersAction>;
// }

// // Reducer function
// function usersReducer(state: UsersState, action: UsersAction): UsersState {
//   switch (action.type) {
//     case 'ADD_USER':
//       return { ...state, users: [...state.users, action.payload] };
//     case 'UPDATE_USER':
//       return {
//         ...state,
//         users: state.users.map((user) =>
//           user.id === action.payload.id ? action.payload : user,
//         ),
//       };
//     case 'SET_USERS':
//       return { ...state, users: action.payload };
//     case 'DELETE_USER':
//       return {
//         ...state,
//         users: state.users.filter((user) => user.id !== action.payload),
//       };
//     case 'SET_LOADING':
//       return { ...state, loading: action.payload };
//     case 'SET_ERROR':
//       return { ...state, error: action.payload };
//     case 'TOGGLE_FORM':
//       return { ...state, isFormOpen: !state.isFormOpen };
//     default:
//       return state;
//   }
// }

// const UsersContext = createContext<UsersContextType | undefined>(undefined);

// interface UsersProviderProps {
//   children: React.ReactNode;
// }

// function UsersProvider({ children }: UsersProviderProps) {
//   const [state, dispatch] = useReducer(usersReducer, INITIAL_STATE);

//   // Memorizar el estado y el dispatch para evitar re-renderizaciones innecesarias
//   const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

//   return (
//     <UsersContext.Provider value={contextValue}>
//       {children}
//     </UsersContext.Provider>
//   );
// }

// function useUsersContext() {
//   const context = useContext(UsersContext);
//   if (!context) {
//     throw new Error('useUsersContext must be used within a UsersProvider');
//   }
//   return context;
// }

// // Selector de contexto
// function useUsersSelector(selector: (state: UsersState) => any) {
//   const { state } = useUsersContext();
//   return useMemo(() => selector(state), [state, selector]);
// }

// export { UsersProvider, useUsersContext, useUsersSelector };
