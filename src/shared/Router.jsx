import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import useAuthStore from "../zustand/useAuthStore";
import Profile from "../pages/Profile";

const PublicRoute = () => {
  const isLogin = useAuthStore((state) => state.isLogin);
  return <>{isLogin ? <Navigate to="/" /> : <Outlet />}</>;
};
const PrivateRoute = () => {
  const isLogin = useAuthStore((state) => state.isLogin);
  return <>{isLogin ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
