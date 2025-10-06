import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/home";
import AboutUs from "./pages/aboutus";
import Team from "./pages/team";
import Portfolio from "./pages/portfolio";
import Services from "./pages/services";
import Careers from "./pages/vacancy/Vacancy.jsx";
import UserProfile from "./pages/userpanel/user";
import ProjectPage from "./pages/projectpage";
import SingleService from "./pages/serviceInfo";
import NotFound from "./pages/notfound";
import ProjectInfo from "./pages/ProjectInfo";
import AuthGuard from "./connection/AuthGuard";
import MainLayout from "./layouts/mainLayout/mainlayout";

// ✅ yangi qo‘shilganlar
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import RecoveryPassword from "./pages/auth/RecoveryPassword";
import CursorTrail from "./components/CursorTrail.jsx";
import Vacancy from "./pages/vacancy/Vacancy.jsx";
import {VacancyItem} from "./pages/vacancy/VacacncyItem.jsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <CursorTrail/>
            <Routes>
                {/* Auth sahifalar */}
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/recoveryPassword" element={<RecoveryPassword/>}/>

                {/* Main sahifalar */}
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="aboutus" element={<AboutUs/>}/>
                    <Route path="team" element={<Team/>}/>
                    <Route path="portfolio" element={<Portfolio/>}/>
                    <Route path="projects/:category" element={<ProjectPage/>}/>
                    <Route path="service/:slug" element={<SingleService/>}/>
                    <Route path="services" element={<Services/>}/>
                    {/*vacancy*/}
                    <Route path="vacancy" element={<Vacancy/>}/>
                    <Route path="vacancy-info/:id" element={<VacancyItem/>}/>

                    <Route path="project/:id" element={<ProjectInfo/>}/>
                    <Route
                        path="user"
                        element={
                            <AuthGuard>
                                <UserProfile/>
                            </AuthGuard>
                        }
                    />
                    {/*<Route path="vacansy/:slug" element={<Vacansy/>}/>*/}
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
