import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import SignupPage from "./sections/auth/signup/SignPage";
import ForgetPage from "./sections/auth/Forget/ForgetPage";
import ResetPage from "./sections/auth/Reset/ResetPage";
import FloorCreation from "./components/adminSection/FloorManagement/FloorCreation";
import ShopCreate from "./components/adminSection/ShopManagement/ShopCreate";
import UserForm from "./components/adminSection/CreateUser/UserForm";
import AddAmmenity from "./components/adminSection/AmmenityManagement/AddAmmenity";
import AddAmmenitySlots from "./components/adminSection/AmmenityManagement/AddAmmenitySlots";
import MaintenanceRequestHome from "./components/adminSection/MaintenaceRequests/MaintenanceRequestHome";
import AddWellnessBoard from "./components/adminSection/WellnessBoard/AddWellnessBoard";
import CreateInvoiceForm from "./components/adminSection/CreateUser/CreateInvoiceForm";
import AmmenityRequestHome from "./components/adminSection/AmmenityRequest/AmmenityRequestHome";
import RequestAcceptModal from "./components/adminSection/MaintenaceRequests/RequestAcceptModal";
import ProfileUpdate from "./components/ProfileUpdate/ProfileUpdate";
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "user", element: <UserPage /> },
        { path: "/dashboard/profile", element: <ProfileUpdate /> },
        {
          path: "/dashboard/user/createUser",
          element: <UserForm />,
        },
        { path: "products", element: <ProductsPage /> },
        { path: "blog", element: <BlogPage /> },
        {
          path: "/dashboard/floorCreation",
          element: <FloorCreation />,
        },
        {
          path: "/dashboard/shopCreate",
          element: <ShopCreate />,
        },
        {
          path: "/dashboard/createAmmenities",
          element: <AddAmmenity />,
        },
        {
          path: "/dashboard/createAmmenitySlots/:ammenityId",
          element: <AddAmmenitySlots />,
        },
        {
          path: "/dashboard/maintenance",
          element: <MaintenanceRequestHome />,
        },
        { path: "/dashboard/wellnessboard", element: <AddWellnessBoard /> },
        { path: "/dashboard/requests", element: <AmmenityRequestHome /> },
        { path: "/dashboard/createInvoice", element: <CreateInvoiceForm /> },
        {
          path: "/dashboard/maintenanceRequestModal",
          element: <RequestAcceptModal />,
        },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "signup",
      element: <SignupPage />,
    },
    {
      path: "forget",
      element: <ForgetPage />,
    },
    {
      path: "/admin/resetPassword/:token",
      element: <ResetPage />,
    },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
