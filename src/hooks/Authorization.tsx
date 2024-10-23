/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Unauthorized from "../pages/pages/unauthorized";
import { useSelector } from "react-redux";
import type { UserState } from "../types";
const Authorization = ({ permissions }) => {
  const { userData }: UserState = useSelector((state: any) => state.user);
  const [isAllowed, setIsAllowed] = useState(false);
  useEffect(() => {
    if (userData.user) {
      const userpermission = userData.user?.permissions;
      const allowed =
        userpermission &&
        permissions.some((allowed) => userpermission.includes(allowed));
      setIsAllowed(allowed);
    }
  }, []);

  return userData.user ? (
    isAllowed ? (
      <Outlet />
    ) : (
      <Unauthorized />
    )
  ) : (
    <Navigate to="/sign-in" state={{ path: location.pathname }} replace />
  );
  //   return <Navigate to="/sign-in" state={{ path: location.pathname }} replace />;
};
export default Authorization;
