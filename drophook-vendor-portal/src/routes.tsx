import React from "react";

import async from "./components/Async";

// All pages that rely on 3rd party components (other than Material-UI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Layouts
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
import DocLayout from "./layouts/Doc";
//import PresentationLayout from "./layouts/Presentation";

// Guards
import AuthGuard from "./components/guards/AuthGuard";

// Auth components
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import Page404 from "./pages/auth/Page404";
import Page500 from "./pages/auth/Page500";

// Components
import Accordion from "./pages/components/Accordion";
import Alerts from "./pages/components/Alerts";
import Avatars from "./pages/components/Avatars";
import Badges from "./pages/components/Badges";
import Buttons from "./pages/components/Buttons";
import Cards from "./pages/components/Cards";
import Chips from "./pages/components/Chips";
import Dialogs from "./pages/components/Dialogs";
import Lists from "./pages/components/Lists";
import Menus from "./pages/components/Menus";
import Pagination from "./pages/components/Pagination";
import Progress from "./pages/components/Progress";
import Snackbars from "./pages/components/Snackbars";
import Tooltips from "./pages/components/Tooltips";

// Form components
import SelectionCtrls from "./pages/forms/SelectionControls";
import Selects from "./pages/forms/Selects";
import TextFields from "./pages/forms/TextFields";

// Icon components
import MaterialIcons from "./pages/icons/MaterialIcons";

// Page components
import Blank from "./pages/pages/Blank";
import InvoiceDetails from "./pages/pages/InvoiceDetails";
import InvoiceList from "./pages/pages/InvoiceList";
// import Orders from "./pages/pages/Orders";
import Pricing from "./pages/pages/Pricing";
import Settings from "./pages/pages/Settings";
import Projects from "./pages/pages/Projects";
import Chat from "./pages/pages/Chat";

// Table components
import AdvancedTable from "./pages/tables/AdvancedTable";

// Documentation
import Welcome from "./pages/docs/Welcome";
import GettingStarted from "./pages/docs/GettingStarted";
import Routing from "./pages/docs/Routing";
import Auth0 from "./pages/docs/auth/Auth0";
import Cognito from "./pages/docs/auth/Cognito";
import Firebase from "./pages/docs/auth/Firebase";
import JWT from "./pages/docs/auth/JWT";
import Guards from "./pages/docs/Guards";
import EnvironmentVariables from "./pages/docs/EnvironmentVariables";
import Deployment from "./pages/docs/Deployment";
import Theming from "./pages/docs/Theming";
import APICalls from "./pages/docs/APICalls";
import Redux from "./pages/docs/Redux";
import Internationalization from "./pages/docs/Internationalization";
import ESLintAndPrettier from "./pages/docs/ESLintAndPrettier";
import MigratingToNextJS from "./pages/docs/MigratingToNextJS";
import Support from "./pages/docs/Support";
import Changelog from "./pages/docs/Changelog";

// Landing
//import Landing from "./pages/presentation/Landing";

// Protected routes
import ProtectedPage from "./pages/protected/ProtectedPage";
import VendorRequest from "./pages/pages/vendorrequest";
import Vendor from "./pages/pages/vendor";
import { VendorRequestDetails } from "./pages/pages/vendorRequestDetails";
import VendorSignUp from "./pages/auth/VendorSignUp";
import { Users } from "./pages/pages/users";
import { UsersAdd } from "./pages/pages/usersAdd";
import { VendorDetails } from "./pages/pages/vendorDetails";
import { UsersDetails } from "./pages/pages/usersDetails";
import { ProductDetails } from "./pages/pages/productDetails";
import ForgotPassword from "./components/auth/ForgotPassword";
import { CreatePassword } from "./components/auth/createPassword";
import { UserEdit } from "./pages/pages/userEdit";
import { ProfileDetails } from "./pages/pages/ProfileDetails";
import ProductsAdd from "./pages/pages/ProductsAdd";
import { Products } from "./pages/pages/Products";

// Dashboard components
const Default = async(() => import("./pages/dashboards/Default"));
const Analytics = async(() => import("./pages/dashboards/Analytics"));
const SaaS = async(() => import("./pages/dashboards/SaaS"));

// Form components
const Pickers = async(() => import("./pages/forms/Pickers"));
const Editors = async(() => import("./pages/forms/Editors"));
const Formik = async(() => import("./pages/forms/Formik"));

// Icon components
const FeatherIcons = async(() => import("./pages/icons/FeatherIcons"));
const Profile = async(() => import("./pages/pages/Profile"));
const Orders = async(() => import("./pages/pages/Orders"));
const Tasks = async(() => import("./pages/pages/Tasks"));
const Calendar = async(() => import("./pages/pages/Calendar"));

// Table components
const DataGrid = async(() => import("./pages/tables/DataGrid"));

// Chart components
const Chartjs = async(() => import("./pages/charts/Chartjs"));

// Maps components
const GoogleMaps = async(() => import("./pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("./pages/maps/VectorMaps"));
var accessToken = localStorage.getItem("accesstoken");
var isLoggedIn = localStorage.getItem("isLoggedIn");
// var routes: any;
// if (accessToken && accessToken !== "") {
const routes = [
    {
      path: "/",
      element: isLoggedIn ? <DashboardLayout /> : <AuthLayout />,
      children: [
        {
          path: "/",
          element: isLoggedIn ? <Profile/> : <SignIn />,
        },
      ],
    },
    {
      // path: "/",
      path: "dashboardtemp",
      element: <DashboardLayout />,
      children: [
        {
          path: "default",
          element: <Default />,
        },
        {
          path: "analytics",
          element: <Analytics />,
        },
        {
          path: "saas",
          element: <SaaS />,
        },
      ],
    },
    {
      path: "dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "default",
          element: <Default />,
        },
        {
          path: "analytics",
          element: <Analytics />,
        },
        {
          path: "saas",
          element: <SaaS />,
        },
      ],
    },
    {
      path: "pages",
      element: <DashboardLayout />,
      children: [
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "profiledetails",
          element: <ProfileDetails />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "pricing",
          element: <Pricing />,
        },
        {
          path: "chat",
          element: <Chat />,
        },
        {
          path: "blank",
          element: <Blank />,
        },
      ],
    },
    {
      path: "projects",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <Projects />,
        },
      ],
    },
    {
      path: "products",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <Products/>
        },
        {
          path: "productsadd",
          element: <ProductsAdd/>
        },
        {
          path: "productdetails/:id",
          element: <ProductDetails />,
        },
      ],
    },
    {
      path: "vendorrequest",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <VendorRequest />,
        },
        {
          path: "vendorrequestdetails/:id",
          element: <VendorRequestDetails />,
        },
      ],
    },
    {
      path: "vendor",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <Vendor />,
        },
        {
          path: "vendordetails/:id",
          element: <VendorDetails />,
        },
      ],
    },
    {
      path: "users",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <Users />,
        },
        {
          path: "usersadd",
          element: <UsersAdd />,
        },
        {
          path: "userdetails/:id",
          element: <UsersDetails />,
        },
        {
          path: "useredit/:id",
          element: <UserEdit />,
        },
      ],
    },
    {
      path: "invoices",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <InvoiceList />,
        },
        {
          path: "detail",
          element: <InvoiceDetails />,
        },
      ],
    },
    {
      path: "orders",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <Orders />,
        },
      ],
    },
    {
      path: "tasks",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <Tasks />,
        },
      ],
    },
    {
      path: "calendar",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <Calendar />,
        },
      ],
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        {
          path: "sign-in",
          element: <SignIn />,
        },
        {
          path: "sign-up",
          element: <SignUp />,
        },
        {
          path: "vendor-sign-up/:vendorid",
          element: <VendorSignUp />,
        },
        {
          path: "reset-password/:vendorid",
          element: <ResetPassword />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "create-password/:params",
          element: <CreatePassword />,
        },
        {
          path: "404",
          element: <Page404 />,
        },
        {
          path: "500",
          element: <Page500 />,
        },
      ],
    },
    {
      path: "components",
      element: <DashboardLayout />,
      children: [
        {
          path: "accordion",
          element: <Accordion />,
        },
        {
          path: "alerts",
          element: <Alerts />,
        },
        {
          path: "avatars",
          element: <Avatars />,
        },
        {
          path: "badges",
          element: <Badges />,
        },
        {
          path: "buttons",
          element: <Buttons />,
        },
        {
          path: "cards",
          element: <Cards />,
        },
        {
          path: "chips",
          element: <Chips />,
        },
        {
          path: "dialogs",
          element: <Dialogs />,
        },
        {
          path: "lists",
          element: <Lists />,
        },
        {
          path: "menus",
          element: <Menus />,
        },
        {
          path: "pagination",
          element: <Pagination />,
        },
        {
          path: "progress",
          element: <Progress />,
        },
        {
          path: "snackbars",
          element: <Snackbars />,
        },
        {
          path: "tooltips",
          element: <Tooltips />,
        },
      ],
    },
    {
      path: "forms",
      element: <DashboardLayout />,
      children: [
        {
          path: "pickers",
          element: <Pickers />,
        },
        {
          path: "selection-controls",
          element: <SelectionCtrls />,
        },
        {
          path: "selects",
          element: <Selects />,
        },
        {
          path: "text-fields",
          element: <TextFields />,
        },
        {
          path: "editors",
          element: <Editors />,
        },
        {
          path: "formik",
          element: <Formik />,
        },
      ],
    },
    {
      path: "tables",
      element: <DashboardLayout />,
      children: [
        {
          path: "advanced-table",
          element: <AdvancedTable />,
        },
        {
          path: "data-grid",
          element: <DataGrid />,
        },
      ],
    },
    {
      path: "icons",
      element: <DashboardLayout />,
      children: [
        {
          path: "material-icons",
          element: <MaterialIcons />,
        },
        {
          path: "feather-icons",
          element: <FeatherIcons />,
        },
      ],
    },
    {
      path: "charts",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <Chartjs />,
        },
      ],
    },
    {
      path: "maps",
      element: <DashboardLayout />,
      children: [
        {
          path: "google-maps",
          element: <GoogleMaps />,
        },
        {
          path: "vector-maps",
          element: <VectorMaps />,
        },
      ],
    },
    {
      path: "documentation",
      element: <DocLayout />,
      children: [
        {
          path: "welcome",
          element: <Welcome />,
        },
        {
          path: "getting-started",
          element: <GettingStarted />,
        },
        {
          path: "routing",
          element: <Routing />,
        },
        {
          path: "auth/auth0",
          element: <Auth0 />,
        },
        {
          path: "auth/cognito",
          element: <Cognito />,
        },
        {
          path: "auth/firebase",
          element: <Firebase />,
        },
        {
          path: "auth/jwt",
          element: <JWT />,
        },
        {
          path: "guards",
          element: <Guards />,
        },
        {
          path: "environment-variables",
          element: <EnvironmentVariables />,
        },
        {
          path: "deployment",
          element: <Deployment />,
        },
        {
          path: "theming",
          element: <Theming />,
        },
        {
          path: "api-calls",
          element: <APICalls />,
        },
        {
          path: "redux",
          element: <Redux />,
        },
        {
          path: "internationalization",
          element: <Internationalization />,
        },
        {
          path: "eslint-and-prettier",
          element: <ESLintAndPrettier />,
        },
        {
          path: "migrating-to-next-js",
          element: <MigratingToNextJS />,
        },
        {
          path: "support",
          element: <Support />,
        },
      ],
    },
    {
      path: "changelog",
      element: <DocLayout />,
      children: [
        {
          path: "",
          element: <Changelog />,
        },
      ],
    },
    {
      path: "private",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: "",
          element: <ProtectedPage />,
        },
      ],
    },
    {
      path: "*",
      element: <AuthLayout />,
      children: [
        {
          path: "*",
          element: <Page404 />,
        },
      ],
    }
  ];
// } else {
//   routes = [
//     {
//       path: "/",
//       element: <AuthLayout />,
//       children: [
//         {
//           path: "/",
//           element: <SignIn />,
//         },
//       ],
//     },
//     {
//       path: "auth",
//       element: <AuthLayout />,
//       children: [
//         {
//           path: "sign-up",
//           element: <SignUp />,
//         },
//         {
//           path: "forgot-password",
//           element: <ForgotPassword />,
//         },
//         {
//           path: "create-password/:params",
//           element: <CreatePassword />,
//         },
//       ],
//     },
//   ];
// }
export default routes;
