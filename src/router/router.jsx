import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainLayout/mainlayout";

// Sahifalar
import Home from "../pages/home";
import AboutUs from "../pages/aboutus";
import Team from "../pages/team";
import Portfolio from "../pages/portfolio";
import Services from "../pages/services";
import Careers from "../pages/career";
import UserProfile from "../pages/userpanel/user";
import Vacansy from "../pages/vacansy";
import ProjectPage from "../pages/projectpage";
import SingleService from "../pages/serviceInfo";
import NotFound from "../pages/notfound";
import AuthGuard from "../connection/AuthGuard";
import Footer from "../components/layouts/footer";

// AuthGuard

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "aboutus", element: <AboutUs /> },
      { path: "team", element: <Team /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "projects/:category", element: <ProjectPage /> },
      { path: "service/:slug", element: <SingleService /> },
      { path: "services", element: <Services /> },
      { path: "careers", element: <Careers /> },
      {
        path: "user",
        element: (
          <AuthGuard>
            <UserProfile />
          </AuthGuard>
        ),
      },
      { path: "vacansy/:slug", element: <Vacansy /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
