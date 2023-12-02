// Public Pages
import LoginPage from "src/pages/Auth/Login";
import HomePage from "src/pages/Home";
import OAuth2RedirectHandler from "src/pages/Auth/OAuth2";

// Private Pages
import Dashboard from 'src/pages/App/Dashboard';

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
    }
];

export const privateRoutes = [
    {
        key: 'dashboard',
        path: '/app',
        component: Dashboard
    }
];