/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router";
import { useRecoilValue } from "recoil";

import { tokenAtom } from "../_state";

const PrivateRoutes = ({ children }: any) => {
  const token = useRecoilValue(tokenAtom);

  if (!token) return <Navigate to="/signin" replace />;

  return children;
};
export default PrivateRoutes;
