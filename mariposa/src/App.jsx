import "./App.css";
import "./i18n.js";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { UserProvider } from "./utils/UserContext.jsx";
import GameRoom from "./mariposa/GameRoom/GameRoom";
import HomePage from "./mariposa/HomePage/HomePage";
import AboutPage from "./mariposa/AboutPage/AboutPage";
import ServicePage from "./mariposa/ServicePage/ServicePage";
import MemberPage from "./mariposa/AboutPage/MemberPage/MemberPage";
import Loader from "./component/Loader/Loader";
import LoginPage from "./mariposa/LoginPage/LoginPage.jsx";
import SelectRoom from "./mariposa/SelectRoom/SelectRoom.jsx";
import Servicefee from "./mariposa/ServicePage/Servicefee.jsx";
import Floorplan from "./mariposa/ServicePage/Floorplan.jsx";
import ConferenceRoom from "./mariposa/ConferenceRoom/ConferenceRoom.jsx";
import SingUp from "./mariposa/LoginPage/SingUp.jsx";
import PageNotFound from "./mariposa/404/PageNotFound.jsx";
import ProtectedRoute from "./utils/isAuthenticated.jsx";
import useAuth from "./utils/useAuth.jsx";
import CinemaRoom from "./mariposa/CinemaRoom/CinemaRoom.jsx";
import NavLogin from "./component/Nav/NavLogin.jsx";
import AdminPage from "./mariposa/Admin/AdminPage.jsx";
import Booking from './mariposa/Booking/ฺBooking.jsx';
import HistoryBooking from "./mariposa/Admin/HistoryBooking.jsx"


function App() {
  const { isAuthenticated, login, logout } = useAuth(); // ดึงสถานะล็อกอินจาก useAuth
  const [loading, setLoading] = useState(true); // เปลี่ยน state เริ่มต้นเป็น true
  const [authChecked, setAuthChecked] = useState(false); // เพิ่ม state เพื่อตรวจสอบสถานะการเช็กการล็อกอิน

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      const username = localStorage.getItem("username");
      if (authStatus) {
        login(username); // ตั้งค่า login ถ้าค่าจาก localStorage เป็น true
      }
      setAuthChecked(true); // ตั้งค่าว่าตรวจสอบการล็อกอินเรียบร้อยแล้ว
      setLoading(false); // หยุดการแสดง Loader เมื่อโหลดเสร็จ
    };
    checkAuth();
  }, [login]);

  const LanguageWrapper = ({ children }) => {
    const { lang } = useParams(); // ดึงภาษาออกจาก URL path
    const { i18n } = useTranslation();

    useEffect(() => {
      i18n.changeLanguage(lang); // เปลี่ยนภาษาตาม URL path
    }, [lang, i18n]);

    return children;
  };

  // ตรวจสอบสถานะการโหลดและการเช็กการล็อกอิน
  if (loading || !authChecked) {
    return <Loader loading={loading} />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/th/home" replace />,
    },
    {
      path: "/:lang/home",
      element: (
        <LanguageWrapper>
          <HomePage />
        </LanguageWrapper>
      ),
    },
    {
      path: "/:lang/dont",
      element: (
        <LanguageWrapper>
          <NavLogin logout={logout} />
        </LanguageWrapper>
      ),
    },
    {
      path: "/:lang/about",
      element: (
        <LanguageWrapper>
          <AboutPage />
        </LanguageWrapper>
      ),
    },
    {
      path: "/:lang/service",
      element: (
        <LanguageWrapper>
          <ServicePage />
        </LanguageWrapper>
      ),
    },
    {
      path: "/:lang/servicefee",
      element: (
        <LanguageWrapper>
          <Servicefee />
        </LanguageWrapper>
      ),
    },

    {
      path: "/:lang/floorplan",
      element: (
        <LanguageWrapper>
          <Floorplan />
        </LanguageWrapper>
      ),
    },
    {
      path: "/:lang/about/member",
      element: (
        <LanguageWrapper>
          <MemberPage />
        </LanguageWrapper>
      ),
    },
    {
      path: "/:lang/singup",
      element: (
        <LanguageWrapper>
          <SingUp />
        </LanguageWrapper>
      ),
    },
    {
      path: "/:lang/admin",
      element: (
        <LanguageWrapper>
          <AdminPage />
        </LanguageWrapper>
      ),
    },
    {
      path: "/:lang/login",
      element: (
        <LanguageWrapper>
          <LoginPage onLogin={login} />
        </LanguageWrapper>
      ),
    },
    {
      path: "/:lang/room",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <LanguageWrapper>
            <SelectRoom />
          </LanguageWrapper>
        </ProtectedRoute>
      ),
    },
    {
      path: "/:lang/conference",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <LanguageWrapper>
            <ConferenceRoom />
          </LanguageWrapper>
        </ProtectedRoute>
      ),
    },
    {
      path: "/:lang/cinemaroom",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <LanguageWrapper>
            <CinemaRoom />
          </LanguageWrapper>
        </ProtectedRoute>
      ),
    },
    {
      path: "/:lang/gameroom",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <LanguageWrapper>
            <GameRoom />
          </LanguageWrapper>
        </ProtectedRoute>
      ),
    },
    {
      path: "/:lang/booking",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <LanguageWrapper>
            <Booking />
          </LanguageWrapper>
        </ProtectedRoute>
      ),
    },
    {
      path: "/:lang/historybooking",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <LanguageWrapper>
            <HistoryBooking />
          </LanguageWrapper>
        </ProtectedRoute>
      ),
    },
    
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <div className="App">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  );
}

export default App;
