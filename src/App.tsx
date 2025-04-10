import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import PrivateRoute from "./_components/PrivateRoute";
import Organization from "./pages/Organizations/Organization";
import AddOrganization from "./pages/Organizations/AddOrganization";
import { Tooltip } from "react-tooltip";
import SelectedOrganization from "./pages/Organizations/SelectedOrganization";
import React from "react";
import AddProject from "./pages/Projects/Add/AddProject";
import EditProperty from "./pages/Properties/Edit/EditProperty";
import AddProperty from "./pages/Properties/Add/AddProperty";
import EditProject from "./pages/Projects/Edit/EditProject";
import SelectedProject from "./pages/Projects/Component/SelectedProject";
import SignupLeads from "./pages/Admin/SignupLeads/SignupLeads";
import MasterConfiguration from "./pages/Admin/Configuration/MasterConfiguration";
import SupportTickets from "./pages/Admin/SupportTickets/SupportTickets";
import ContactSupport from "./pages/Admin/ContactSupport/ContactSupport";
import RegionManagement from "./pages/Admin/RegionManagement/RegionManagement";
import TimezoneManagement from "./pages/Admin/RegionManagement/TimezoneManagement";
import ForgotPassword from "./pages/Admin/ResetPassword/ForgotPassword";
import ResetPassword from "./pages/Admin/ResetPassword/ResetPassword";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Tooltip
          id="tooltip"
          style={{
            zIndex: 99999,
          }}
        />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route
              index
              path="/"
              element={
                <PrivateRoute>
                  <Organization />
                </PrivateRoute>
              }
            />

            <Route
              index
              path="/organization/new"
              element={
                <PrivateRoute>
                  <AddOrganization />
                </PrivateRoute>
              }
            />
            <Route
              index
              path="/organization/edit"
              element={
                <PrivateRoute>
                  <AddOrganization />
                </PrivateRoute>
              }
            />

            <Route
              index
              path="/organization/:id"
              element={
                <PrivateRoute>
                  <SelectedOrganization />
                </PrivateRoute>
              }
            />

            <Route
              index
              path="/organization/:id/project/:project_id"
              element={
                <PrivateRoute>
                  <SelectedProject />
                </PrivateRoute>
              }
            />

            <Route
              index
              path="/organization/:id/project/new"
              element={
                <PrivateRoute>
                  <AddProject />
                </PrivateRoute>
              }
            />

            <Route
              index
              path="/organization/:id/project/:project_id/edit"
              element={
                <PrivateRoute>
                  <EditProject />
                </PrivateRoute>
              }
            />

            <Route
              index
              path="/organization/:id/project/:project_id/property/new"
              element={
                <PrivateRoute>
                  <AddProperty />
                </PrivateRoute>
              }
            />

            <Route
              index
              path="/organization/:id/project/:project_id/property/:property_id"
              element={
                <PrivateRoute>
                  <EditProperty />
                </PrivateRoute>
              }
            />

            <Route
              index
              path="/signup-leads"
              element={
                <PrivateRoute>
                  <SignupLeads />
                </PrivateRoute>
              }
            />

            <Route
              index
              path="/master-configuration"
              element={
                <PrivateRoute>
                  <MasterConfiguration />
                </PrivateRoute>
              }
            />
            <Route
              index
              path="/support-tickets"
              element={
                <PrivateRoute>
                  <SupportTickets />
                </PrivateRoute>
              }
            />
            <Route
              index
              path="/contact-support"
              element={
                <PrivateRoute>
                  <ContactSupport />
                </PrivateRoute>
              }
            />

            <Route
              index
              path="/region-management"
              element={
                <PrivateRoute>
                  <RegionManagement />
                </PrivateRoute>
              }
            />

            <Route
              index
              path="/region-management/:regionId"
              element={
                <PrivateRoute>
                  <TimezoneManagement />
                </PrivateRoute>
              }
            />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signin/admin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password/admin" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password/admin" element={<ResetPassword />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
