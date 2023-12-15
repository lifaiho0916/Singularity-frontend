// Public Pages
import LoginPage from "pages/Auth/Login";
import HomePage from "pages/Home";
import OAuth2RedirectHandler from "pages/Auth/OAuth2";
import InviteHandler from "pages/Invite";

// Private Pages
import Dashboard from 'pages/App/Dashboard';
import Project from "pages/App/Project";

export const publicRoutes = [
    {
        key: 'home',
        path: '/',
        component: HomePage
    },
    {
        key: 'login',
        path: '/login',
        component: LoginPage
    },
    {
        key: 'oauth2',
        path: '/oauth2/redirect',
        component: OAuth2RedirectHandler
    },
    {
        key: 'invite',
        path: '/invite',
        component: InviteHandler
    }
];

export const privateRoutes = [
    {
        key: 'dashboard',
        path: '/app/dashboard',
        component: Dashboard
    },
    {
        key: 'project',
        path: '/app/project/:projectId/*',
        component: Project
    }
];