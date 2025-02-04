/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import type { ReactNode } from "react";
import { createContext, useState } from "react";
import type { userData } from "../types";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
  user: userData | null;
  setUser: (newState: any) => void;
  token: string;
  setToken: (newState: string) => void;
};

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {},
  setUser: () => {},
  setToken: () => {},
  user: null,
  token: "",
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated,
  );
  const [user, setUser] = useState<userData | null>(initialValue.user);
  const [token, setToken] = useState(initialValue.token);

  //   if (user && user.userType === "admin") {
  //     setUser({ ...user, permissions: ["can_add_organization"] });
  //   }
  //   if (user && user.userType === "builder") {
  //     setUser({ ...user, permissions: ["can_view_organization"] });
  //   }

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
