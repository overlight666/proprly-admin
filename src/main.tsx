// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import React from "react";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <RecoilRoot>
    <ThemeProvider>
      <ToastContainer position="bottom-right" />
      <AppWrapper>
        <App />
      </AppWrapper>
    </ThemeProvider>
  </RecoilRoot>
  // </StrictMode>
);
