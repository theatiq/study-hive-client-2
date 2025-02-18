import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Shared/Secret/Secret";
import Dashboard from "../Layouts/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/Cart/AllUsers/AllUsers";
import CreateSession from "../Pages/Dashboard/CreateSession/CreateSession";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import AllStudySessions from "../Pages/Dashboard/AllStudySessions/AllStudySessions";
import EveryStudySessions from "../Pages/Dashboard/EveryStudySessions/EveryStudySessions";
import UploadMaterials from "../Pages/Dashboard/UploadMaterials/UploadMaterials";
import AllMaterials from "../Pages/Dashboard/AllMaterials/AllMaterials";
import UpdateMaterial from "../Pages/Dashboard/UpdateMaterial/UpdateMaterial";
import UpdateSession from "../Pages/Dashboard/UpdateSession/UpdateSession";
import AllMaterialsAdmin from "../Pages/Dashboard/AllMaterialsAdmin/AllMaterialsAdmin";
import ReadMore from "../Pages/ReadMore/ReadMore";
import BookedSession from "../Pages/Dashboard/BookedSession/BookedSession";
import ViewDetails from "../Pages/Dashboard/ViewDetails/ViewDetails";
import CreateNotes from "../Pages/Dashboard/CreateNotes/CreateNotes";
import UpdateNotes from "../Pages/Dashboard/UpdateNotes/UpdateNotes";
import AllStudyMaterials from "../Pages/Dashboard/AllStudyMaterials/AllStudyMaterials";
import StudentMaterials from "../Pages/Dashboard/StudentMaterials/StudentMaterials";
import ErrorPage from "../Pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "menu",
        element: <Menu></Menu>,
      },
      {
        path: "order/:category",
        element: <Order></Order>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "secret",
        element: (
          <PrivateRoute>
            <Secret></Secret>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "readMore/:id",
    element: (
      <PrivateRoute>
        <ReadMore></ReadMore>
      </PrivateRoute>
    ),
    loader: ({ params }) =>
      fetch(`https://study-hive-server-weld.vercel.app/session/${params.id}`),
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // Student routes
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "bookedSession",
        element: <BookedSession></BookedSession>,
      },
      {
        path: "viewDetails/:id",
        element: <ViewDetails></ViewDetails>,
        loader: ({ params }) =>
          fetch(
            `https://study-hive-server-weld.vercel.app/viewDetails/${params.id}`
          ),
      },
      {
        path: "createNotes",
        element: <CreateNotes></CreateNotes>,
      },
      {
        path: "updateNotes",
        element: <UpdateNotes></UpdateNotes>,
      },
      {
        path: "allStudyMaterials",
        element: <AllStudyMaterials></AllStudyMaterials>,
      },
      {
        path: "studentMaterials/:id",
        element: <StudentMaterials></StudentMaterials>,
        loader: ({ params }) =>
          fetch(
            `https://study-hive-server-weld.vercel.app/materialStudent/${params.id}`
          ),
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      // Student User
      // Tutor Routes
      {
        path: "createSession",
        element: <CreateSession></CreateSession>,
      },
      {
        path: "allStudySessions",
        element: <AllStudySessions></AllStudySessions>,
      },
      {
        path: "uploadMaterials",
        element: <UploadMaterials></UploadMaterials>,
      },
      {
        path: "allMaterials",
        element: <AllMaterials></AllMaterials>,
      },
      {
        path: "updateMaterials/:id",
        element: <UpdateMaterial></UpdateMaterial>,
        loader: ({ params }) =>
          fetch(
            `https://study-hive-server-weld.vercel.app/materials/${params.id}`
          ),
      },
      {
        path: "updateSession/:id",
        element: <UpdateSession></UpdateSession>,
        loader: ({ params }) =>
          fetch(
            `https://study-hive-server-weld.vercel.app/session/${params.id}`
          ),
      },

      // Tutor Routes

      // Admin routes
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "everyStudySessions",
        element: <EveryStudySessions></EveryStudySessions>,
      },
      {
        path: "allMaterialsAdmin",
        element: <AllMaterialsAdmin></AllMaterialsAdmin>,
      },
      {
        path: "manageItems",
        element: (
          <AdminRoute>
            <ManageItems></ManageItems>
          </AdminRoute>
        ),
      },
      {
        path: "updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem></UpdateItem>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://study-hive-server-weld.vercel.app/menu/${params.id}`),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
