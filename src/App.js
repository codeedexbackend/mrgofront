import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Aboutus from "./pages/Aboutus";
import ExpressService from "./pages/ExpressService";
import Smartbox from "./pages/Smartbox";
import B2b from "./pages/B2b";
import Ecommerce from "./pages/Ecommerce";
import ContactUs from "./pages/ContactUs";
import ShippingRegistration from "./components/ShippingRegistration";
import Home from "./pages/Home";
import Track from "./components/Track";
import UserControl from "./Admin/Pages/UserControl";
import Ahome from "./Admin/Pages/Ahome";
import User from "./Admin/Pages/User";
import Request from "./Admin/Pages/Request";
import Billing from "./Admin/Pages/Billing";
import Atrack from "./Admin/Pages/Atrack";
import Booking from "./Admin/Pages/Booking";
import LoginForm from "./Admin/Pages/LoginForm";
import Profile from "./pages/Profile";
import Notification from "./Admin/Pages/Notification";
import Afooter from "./Admin/Pages/Afooter";
import Acontact from "./Admin/Pages/Acontact";
import ContactDetails from "./Admin/Pages/ContactDeatils";
import ProductList from "./Admin/Pages/ProductList";
import ProductFinal from "./components/ProductFinal";
import TrackingOrder from "./Admin/Pages/TrackingOrder";
import MyOrders from "./pages/MyOrders";
import Label from "./components/Label";
import ForgotPassword from "./pages/ForgotPassword";
import Pnf from "./pages/Pnf";
import InProduct from "./Admin/Pages/InProduct";
import Astatus from "./Admin/Pages/Astatus";
import Billingprint from "./Admin/Pages/Billingprint";
import Forgot from "./pages/Forgot";
import OTPVerification from "./pages/OTPVerification";
import Password from "./pages/Password";
import UserInvoice from "./pages/UserInvoice";

function App() {
  const location = useLocation();

  // Function to check if the user is logged in as admin
  const isAdminLoggedIn = () => {
    // Check if admin token exists in local storage or session
    const adminToken = localStorage.getItem("adminToken");
    return adminToken; // Returns true if adminToken is truthy, false otherwise
  };

  // Custom route component to restrict access to admin pages if not logged in
  const AdminRoute = ({ element }) => {
    return isAdminLoggedIn() ? element : <Navigate to="/admin/login" />;
  };

  return (
    <div className="App">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/expressservice" element={<ExpressService />} />
        <Route path="/smartbox" element={<Smartbox />} />
        <Route path="/b2b" element={<B2b />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/shipping" element={<ShippingRegistration />} />
        <Route path="/track" element={<Track />} />
        <Route path="/invoice/:id" element={<UserInvoice />} />
        <Route
          path="/productfinal/:userId/:invoice"
          element={<ProductFinal />}
        />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/admin/*" element={<AdminRoute element={<Ahome />} />} />
        <Route
          path="/admin/user"
          element={<AdminRoute element={<UserControl />} />}
        />
        <Route
          path="/admin/:userId"
          element={<AdminRoute element={<User />} />}
        />
        <Route
          path="/admin/Billing"
          element={<AdminRoute element={<Billing />} />}
        />
        <Route
          path="/admin/Track"
          element={<AdminRoute element={<Atrack />} />}
        />
        <Route
          path="/admin/Booking"
          element={<AdminRoute element={<Booking />} />}
        />
        <Route path="/admin/Login" element={<LoginForm />} />
        <Route
          path="/admin/Notification"
          element={<AdminRoute element={<Notification />} />}
        />
        <Route
          path="/admin/Acontact"
          element={<AdminRoute element={<Acontact />} />}
        />
        <Route
          path="/admin/Astatus"
          element={<AdminRoute element={<Astatus />} />}
        />
        <Route
          path="/admin/Acontact/:id"
          element={<AdminRoute element={<ContactDetails />} />}
        />
        <Route
          path="/admin/Product/:id"
          element={<AdminRoute element={<ProductList />} />}
        />
        <Route
          path="/admin/Trackorder"
          element={<AdminRoute element={<TrackingOrder />} />}
        />
        <Route path="/orders/:id" element={<MyOrders />} />
        <Route path="/label/:userId/:orderId" element={<Label />} />
        <Route
          path="/product/:userId/:invoice"
          element={<AdminRoute element={<InProduct />} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot" element={<Forgot></Forgot>}></Route>
        <Route
          path="/otp"
          element={<OTPVerification></OTPVerification>}
        ></Route>
        <Route path="/new-password" element={<Password></Password>}></Route>
        <Route path="/*" element={<Pnf />} />
        <Route
          path="/admin/invoice/:userId/:invoice"
          element={<AdminRoute element={<Billingprint />} />}
        />
      </Routes>
    </div>
  );
}

export default App;