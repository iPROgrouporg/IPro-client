import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFound from "./components/notfount/notfound.jsx";
import AuthGuard from "./connection/AuthGuard";
import MainLayout from "./layouts/mainLayout/mainlayout";
import AboutUs from "./pages/about/aboutus.jsx";
import Home from "./pages/home/home.jsx";
import Portfolio from "./pages/portfolio/Portfolio.jsx";
import ProjectInfo from "./pages/portfolio/ProjectInfo.jsx";
import ProjectPage from "./pages/portfolio/ProjectsPage.jsx";
import Services from "./pages/services/Services.jsx";
import Team from "./pages/team/team.jsx";
import UserProfile from "./pages/userpanel/user";

<<<<<<< Updated upstream
import { Test } from "./components/Test.jsx";
import Login from "./pages/auth/Login";
import RecoveryPassword from "./pages/auth/RecoveryPassword";
import Register from "./pages/auth/Register";
import ServicesItem from "./pages/services/ServicesItem.jsx";
import { VacancyItem } from "./pages/vacancy/VacacncyItem.jsx";
import Vacancy from "./pages/vacancy/Vacancy.jsx";
=======
import Login from "./pages/auth/Login.jsx";
import RecoveryPassword from "./pages/auth/RecoveryPassword.jsx";
import Vacancy from "./pages/vacancy/Vacancy.jsx";
import {VacancyItem} from "./pages/vacancy/VacacncyItem.jsx";
import ServicesItem from "./pages/services/ServicesItem.jsx";
import { Test } from "./components/Test.jsx";
import Register from "./pages/auth/Register.jsx";
>>>>>>> Stashed changes

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/recoveryPassword" element={<RecoveryPassword/>}/>
                <Route path="/test" element={<Test/>}/>

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
