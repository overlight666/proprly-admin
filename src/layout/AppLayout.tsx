import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import React from "react";
import LoadingOverlay from 'react-loading-overlay'
import { useRecoilValue } from "recoil";
import { isLoadingAtom } from "../_state";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();


  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out overflow-hidden ${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
          } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  const isLoading = useRecoilValue(isLoadingAtom);
  return (
    <SidebarProvider>
      <LoadingOverlay
        className="w-[100vw] h-[100vh] sticky bottom-0 overflow-hidden"
        active={isLoading}
        spinner
        text='Loading your content...'
      >
        <LayoutContent />
      </LoadingOverlay>
    </SidebarProvider>
  );
};

export default AppLayout;
