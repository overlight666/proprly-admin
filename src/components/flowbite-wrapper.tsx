import { Flowbite, useThemeMode } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import theme from "../flowbite-theme";
import LoadingOverlay from 'react-loading-overlay-ts'
import { isLoadingAtom } from "@/_recoil/states";
import { useRecoilValue } from "recoil";
const FlowbiteWrapper: FC = function () {
  const [dark, setDark] = useState(false)
  const isLoading = useRecoilValue(isLoadingAtom);
  const [themeMode] = useThemeMode();

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDark(isDark);
  }, [themeMode])

  return (
    <Flowbite theme={{ dark, theme }}>
      <LoadingOverlay
        className={`w-[100vw] h-[100vh] sticky bottom-0 ${isLoading && 'overflow-hidden'}`}
        active={isLoading}
        spinner
        text='Loading your content...'
      >
        {/* <PersistFlowbiteThemeToLocalStorage /> */}
        <Outlet />
      </LoadingOverlay>
    </Flowbite>
  );
};

// const PersistFlowbiteThemeToLocalStorage: FC = function () {
//   const [themeMode] = useThemeMode();
//   useEffect(() => {
//     localStorage.setItem("theme", themeMode);
//   }, [themeMode]);

//   return <></>;
// };

export default FlowbiteWrapper;
