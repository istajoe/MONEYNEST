// src/App.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import CultureHome from "./pages/inside-moneynest/cultureHome";
import CareersPage from "./pages/inside-moneynest/career/careerHome";
import PressPage from "./pages/inside-moneynest/press/pressHome";
import BankingHome from "./pages/solution/bankingHome";
import Home from "./pages/Home";
import About from "./pages/about";
import Contact from "./pages/Contact";
import ResourceHome from "./pages/resources/resourcesHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PaymentSuccess from "./pages/paymentSuccess";
import DepositForm from "./pages/depositForm";
import AirtimePurchase from "./pages/airtimePurchase";
import Transfer from "./pages/tranfer";
import DataPurchase from "./pages/dataPurchase";
import BillPayment from "./pages/billPayment";
import CryptoWallet from "./pages/cryptoWallet";
import ForexTrade from "./pages/forexTrade";
import USDAccount from "./pages/USDAccount";
import ReservedAccount from "./pages/ReservedAccount";

import { AuthProvider } from "./context/AuthContext";

function AppContent() {
  const location = useLocation();

  // ✅ Hide Navbar only on /resources
  const hideNavbar = location.pathname.startsWith("/resources");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/banking" element={<BankingHome />} />
        <Route path="/culture" element={<CultureHome />} />
        <Route path="/career" element={<CareersPage />} />
        <Route path="/press" element={<PressPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources" element={<ResourceHome />} />

        {/* Guest-only Routes */}
        <Route element={<PrivateRoute guestOnly />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected user Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/deposit" element={<DepositForm />} />
          <Route path="/airtime" element={<AirtimePurchase />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/data" element={<DataPurchase />} />
          <Route path="/bill" element={<BillPayment />} />
          <Route path="/crypto" element={<CryptoWallet />} />
          <Route path="/forex" element={<ForexTrade />} />
          <Route path="/usd" element={<USDAccount />} />
          <Route path="/reserved-account" element={<ReservedAccount />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Route>              

        {/* Admin Routes */}
        <Route element={<PrivateRoute adminOnly />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* ✅ Footer stays visible everywhere */}
      <Footer />
    </>
  );
}

function App() {
  return <AppContent />; // no double AuthProvider
}


export default App;
