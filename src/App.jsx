import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/home/home.jsx";
import AboutUs from "./pages/about/aboutus.jsx";
import Team from "./pages/team/team.jsx";
import Portfolio from "./pages/portfolio/Portfolio.jsx";
import Services from "./pages/services/Services.jsx";
import UserProfile from "./pages/userpanel/user";
import ProjectPage from "./pages/portfolio/ProjectsPage.jsx";
import NotFound from "./components/notfount/notfound.jsx";
import ProjectInfo from "./pages/portfolio/ProjectInfo.jsx";
import AuthGuard from "./connection/AuthGuard";
import MainLayout from "./layouts/mainLayout/mainlayout";

import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import RecoveryPassword from "./pages/auth/RecoveryPassword";
import Vacancy from "./pages/vacancy/Vacancy.jsx";
import {VacancyItem} from "./pages/vacancy/VacacncyItem.jsx";
import ServicesItem from "./pages/services/ServicesItem.jsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/recoveryPassword" element={<RecoveryPassword/>}/>

                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="aboutus" element={<AboutUs/>}/>
                    <Route path="team" element={<Team/>}/>
                    <Route path="portfolio" element={<Portfolio/>}/>
                    <Route path="projects/:category" element={<ProjectPage/>}/>
                    <Route path="services" element={<Services/>}/>
                    <Route path="services-info/:id" element={<ServicesItem/>}/>
                    <Route path="vacancy" element={<Vacancy/>}/>
                    <Route path="vacancy-info/:id" element={<VacancyItem/>}/>
                    <Route path="project/:id" element={<ProjectInfo/>}/>
                </Route>
                <Route
                    path="user"
                    element={
                        <AuthGuard>
                            <UserProfile/>
                        </AuthGuard>
                    }
                />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
