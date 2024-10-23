/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./authProvider";
import { useContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PublicRoute = () => {
  const { authenticated, user } = useContext(AuthContext);

  if (authenticated && user?.userType === "builder")
    return <Navigate to="/organization" replace />;
  if (authenticated && user?.userType === "admin")
    return <Navigate to="/organization" replace />;
  return <Outlet />;
};
export default PublicRoute;
