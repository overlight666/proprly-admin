import type { FC, PropsWithChildren } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { SidebarProvider, useSidebarContext } from "../context/SidebarContext";
import classNames from "classnames";

interface NavbarSidebarLayoutProps {
  isFooter?: boolean;
}

const NavbarSidebarLayout: FC<PropsWithChildren<NavbarSidebarLayoutProps>> =
  function ({ children, isFooter = true }) {
    return (
      <SidebarProvider>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <MainContent isFooter={isFooter}>{children}</MainContent>
          </div>
        </div>
      </SidebarProvider>
    );
  };

const MainContent: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = function ({
  children,
  isFooter,
}) {
  const { isOpenOnSmallScreens: isSidebarOpen } = useSidebarContext();

  return (
    <main
      className={classNames(
        "flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900",
        "transition-all duration-300"
      )}
    >
      <div className="h-full">
        {children}
        {isFooter && (
          <div className="mx-4 mt-4">
            <MainContentFooter />
          </div>
        )}
      </div>
    </main>
  );
};

const MainContentFooter: FC = function () {
  return (
    <>
      <p className="my-8 text-center text-sm text-gray-500 dark:text-gray-300">
        &copy; 2021-2025 proprly. All rights reserved.
      </p>
    </>
  );
};

export default NavbarSidebarLayout;