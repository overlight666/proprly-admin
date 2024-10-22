import { createContext, useContext } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext: any = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const token = window.localStorage.getItem("token");
  const login = (userToken) => {
    window.localStorage.setItem("token", userToken);
  };
  const logout = () => {
    window.localStorage.setItem("token", "");
  };
  const isAuthenticated = !!token;
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
