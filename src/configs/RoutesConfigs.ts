// Public Pages
import LoginPage from "src/pages/Auth/Login";
import HomePage from "src/pages/Home";

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
    }
];

export const privateRoutes = [
    {
        key: 'dashboard',
        path: '/app',
        component: Dashboard
    }
];