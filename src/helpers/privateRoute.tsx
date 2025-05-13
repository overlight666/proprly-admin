/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "@/_recoil/states";

const PrivateRoutes = ({ children }: any) => {
    const token = useRecoilValue(tokenAtom);

    if (!token) return <Navigate to="/sign-in" replace />;

    return children;
};
export default PrivateRoutes;
