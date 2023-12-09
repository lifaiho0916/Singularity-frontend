// Public Pages
import LoginPage from "src/pages/Auth/Login";
import HomePage from "src/pages/Home";
import OAuth2RedirectHandler from "src/pages/Auth/OAuth2";
import InviteHandler from "src/pages/Invite";

// Private Pages
import Dashboard from 'src/pages/App/Dashboard';
import Workspace from "src/pages/App/Workspace";

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
        path: '/app/project',
        component: Workspace
    }
];