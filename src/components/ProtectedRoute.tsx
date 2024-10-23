import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../hooks/authProvider";
import { useContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) return <Navigate to="/sign-in" replace />;

  return <Outlet />;
};
export default PrivateRoutes;
