/* eslint-disable prettier/prettier */
import type { ReactNode } from "react";
import { createContext, useState } from "react";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
  user: object;
  setUser: (newState: object) => void;
  token: string;
  setToken: (newState: string) => void;
};

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {},
  setUser: () => {},
  setToken: () => {},
  user: {},
  token: "",
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated
  );
  const [user, setUser] = useState(initialValue.user);
  const [token, setToken] = useState(initialValue.token);
  console.log(authenticated, user, token);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
