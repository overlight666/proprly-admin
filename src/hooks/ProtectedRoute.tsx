/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authProvider";
import { useContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRoutes = ({ children }) => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) return <Navigate to="/sign-in" replace />;

  return children;
};
export default PrivateRoutes;
