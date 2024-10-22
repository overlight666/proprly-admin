import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isAuthenticated }: any = useAuth();
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};
export default PrivateRoutes;
