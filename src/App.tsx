import { type FC } from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages";
// import ProfileLockPage from "./pages/authentication/profile-lock";
// import ResetPasswordPage from "./pages/authentication/reset-password";
// import EcommerceBillingPage from "./pages/e-commerce/billing";
// import EcommerceInvoicePage from "./pages/e-commerce/invoice";
// import EcommerceProductsPage from "./pages/e-commerce/products";
// import KanbanPage from "./pages/kanban";
// import MailingComposePage from "./pages/mailing/compose";
// import MailingInboxPage from "./pages/mailing/inbox";
// import MailingReadPage from "./pages/mailing/read";
// import MailingReplyPage from "./pages/mailing/reply";

// import ServerErrorPage from "./pages/pages/500";
// import MaintenancePage from "./pages/pages/maintenance";
// import PricingPage from "./pages/pages/pricing";
// import UserFeedPage from "./pages/users/feed";
// import UserListPage from "./pages/users/list";
// import UserProfilePage from "./pages/users/profile";
// import UserSettingsPage from "./pages/users/settings";

import { SignIn } from "./pages/authentication/SignIn";
import { SignUp } from "./pages/authentication/SignUp";
import { ForgotPassword } from "./pages/authentication/ForgotPassword";
import NotFoundPage from "./pages/pages/404";
import FlowbiteWrapper from "./components/flowbite-wrapper";
import PrivateRoutes from "./helpers/privateRoute";
import { OrganizationPage } from "./pages/organization";
import EditOrganization from "./pages/organization/pages/EditOrganization";
import AddOrganization from "./pages/organization/pages/AddOrganization";
import ViewOrganization from "./pages/organization/pages/ViewOrganization";
import NewProject from "./pages/project/pages/NewProject";
import { Tooltip } from "react-tooltip";
import { ProjectPage } from "./pages/project";
import AccountSettingsPage from "./pages/admin/account-settings/AccountSettingsPage";
import { SignupLeads } from "./pages/admin/signup-leads/SignupLeads";
import MasterConfiguration from "./pages/admin/master-configuration/MasterConfiguration";
import RegionManagement from "./pages/admin/region-management/RegionManagement";
import SupportTickets from "./pages/admin/support-tickets/SupportTickets";
import ContactSupport from "./pages/admin/contact-support/ContactSupport";
import ProfilePage from "./pages/admin/profile/ProfilePage";
import EditProfilePage from "./pages/admin/profile/pages/EditProfilePage";
import TimezoneManagement from "./pages/admin/region-management/TimezoneManagement";
import AddProperty from "./pages/project/tabs/property/pages/NewProperty";
import EditProperty from "./pages/project/tabs/property/pages/EditProperty";
import { Properties } from "./pages/project/pages/properties/Properties";
import { CommonAreaPage } from "./pages/project/pages/common-area/CommonAreaPage";
import { ItpPage } from "./pages/project/pages/itp/ItpPage";
import { AppointmentsPage } from "./pages/project/pages/appointments/AppointmentsPage";

const App: FC = function () {
  // if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  //   document.documentElement.classList.add('dark');
  // } else {
  //   document.documentElement.classList.remove('dark')
  // }
  return (
    <BrowserRouter>
      <Tooltip
        id="tooltip"
        style={{
          zIndex: 99999,
        }}
      />
      <Routes>
        <Route element={<FlowbiteWrapper />}>
          <Route path="/" element={
            <PrivateRoutes>
              <OrganizationPage />
            </PrivateRoutes>
          } index />
          <Route path="/dashboard" element={
            <PrivateRoutes>
              <DashboardPage />
            </PrivateRoutes>
          } />
          <Route path="/signup-leads" element={
            <PrivateRoutes>
              <SignupLeads />
            </PrivateRoutes>
          } />
          <Route path="/master-configuration" element={
            <PrivateRoutes>
              <MasterConfiguration />
            </PrivateRoutes>
          } />
          <Route path="/region-management" element={
            <PrivateRoutes>
              <RegionManagement />
            </PrivateRoutes>
          } />
          <Route path="/support-tickets" element={
            <PrivateRoutes>
              <SupportTickets />
            </PrivateRoutes>
          } />
          <Route path="/contact-support" element={
            <PrivateRoutes>
              <ContactSupport />
            </PrivateRoutes>
          } />
          <Route path="/profile" element={
            <PrivateRoutes>
              <ProfilePage />
            </PrivateRoutes>
          } />
          <Route path="/profile/edit" element={
            <PrivateRoutes>
              <EditProfilePage />
            </PrivateRoutes>
          } />
          <Route path="/account-settings" element={
            <PrivateRoutes>
              <AccountSettingsPage />
            </PrivateRoutes>
          } />
          <Route path="/region-management/:regionId" element={
            <PrivateRoutes>
              <TimezoneManagement />
            </PrivateRoutes>
          } />
          <Route path="/organization/edit/:id" element={
            <PrivateRoutes>
              <EditOrganization />
            </PrivateRoutes>
          } />
          <Route path="/organization/new" element={
            <PrivateRoutes>
              <AddOrganization />
            </PrivateRoutes>
          } />
          <Route path="/organization/view/:id" element={
            <PrivateRoutes>
              <ViewOrganization />
            </PrivateRoutes>
          } />
          <Route path="/organization/:id/project/new" element={
            <PrivateRoutes>
              <NewProject />
            </PrivateRoutes>
          } />
          <Route path="/organization/:id/project/view/:project_id" element={
            <PrivateRoutes>
              <ProjectPage />
            </PrivateRoutes>
          } />
          <Route path="/organization/:id/project/:project_id/property/new" element={
            <PrivateRoutes>
              <AddProperty />
            </PrivateRoutes>
          } />
          <Route path="/organization/:id/project/:project_id/property/view/:property_id" element={
            <PrivateRoutes>
              <EditProperty />
            </PrivateRoutes>
          } />

          <Route path="/organization/:id/project/:project_id/property/view" element={
            <PrivateRoutes>
              <Properties />
            </PrivateRoutes>
          } />

          <Route path="/organization/:id/project/:project_id/common-area/view" element={
            <PrivateRoutes>
              <CommonAreaPage />
            </PrivateRoutes>
          } />

          <Route path="/organization/:id/project/:project_id/itp/view" element={
            <PrivateRoutes>
              <ItpPage />
            </PrivateRoutes>
          } />

          <Route path="/organization/:id/project/:project_id/appointments/view" element={
            <PrivateRoutes>
              <AppointmentsPage />
            </PrivateRoutes>
          } />

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-in/admin" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          {/* <Route path="/mailing/compose" element={<MailingComposePage />} />
          <Route path="/mailing/inbox" element={<MailingInboxPage />} />
          <Route path="/mailing/read" element={<MailingReadPage />} />
          <Route path="/mailing/reply" element={<MailingReplyPage />} />
          <Route path="/kanban" element={<KanbanPage />} />
          <Route path="/pages/pricing" element={<PricingPage />} />
          <Route path="/pages/maintenance" element={<MaintenancePage />} />

          <Route path="/pages/500" element={<ServerErrorPage />} />
          
          <Route
            path="/forgot-password/admin"
            element={<ForgotPassword />}
          />
          <Route
            path="/authentication/reset-password"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/authentication/profile-lock"
            element={<ProfileLockPage />}
          />
          <Route
            path="/e-commerce/billing"
            element={<EcommerceBillingPage />}
          />
          <Route
            path="/e-commerce/invoice"
            element={<EcommerceInvoicePage />}
          />
          <Route
            path="/e-commerce/products"
            element={<EcommerceProductsPage />}
          />
          <Route path="/users/feed" element={<UserFeedPage />} />
          <Route path="/users/list" element={<UserListPage />} />
          <Route path="/users/profile" element={<UserProfilePage />} />
          <Route path="/users/settings" element={<UserSettingsPage />} /> */}

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
