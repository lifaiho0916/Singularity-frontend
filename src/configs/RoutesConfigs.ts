import React from 'react';

export const publicRoutes = [
    {
        key: 'home',
        path: '/',
        component: React.lazy(() => import('src/pages/Home'))
    },
    {
        key: 'login',
        path: '/login',
        component: React.lazy(() => import('src/pages/Auth/Login'))
    }
];

export const privateRoutes = [
    {
        key: 'dashboard',
        path: '/app',
        component: React.lazy(() => import('src/pages/App/Dashboard'))
    }
];