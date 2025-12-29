import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/navigationBar";

export default function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="app-content">
        <Outlet />
      </main>
    </>
  );
}
