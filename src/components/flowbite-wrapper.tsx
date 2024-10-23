/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flowbite, useThemeMode } from "flowbite-react";
import type { FC } from "react";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router";
import theme from "../flowbite-theme";
import type { UserState } from "../types";
import { useSelector } from "react-redux";
import { AuthContext } from "../hooks/authProvider";

const FlowbiteWrapper: FC = function () {
  const dark = localStorage.getItem("theme") === "dark";
  const { userData }: UserState = useSelector((state: any) => state.user);
  const { authenticated, user, setUser, setToken, setAuthenticated } =
    useContext(AuthContext);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (userData && !user && !authenticated && token) {
      setUser(userData.user);
      setToken(userData.token);
      setAuthenticated(true);
    }
  }, []);
  return (
    <Flowbite theme={{ dark, theme }}>
      <PersistFlowbiteThemeToLocalStorage />
      <Outlet />
    </Flowbite>
  );
};

const PersistFlowbiteThemeToLocalStorage: FC = function () {
  const [themeMode] = useThemeMode();

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  return <></>;
};

export default FlowbiteWrapper;
