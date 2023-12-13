import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { publicRoutes, privateRoutes } from "config/RoutesConfigs";
import PrivateRoute from "routes/PrivateRoute";
import PublicRoute from "./PublicRoute";
import { AUTH_LOGIN_PATH } from "constants/";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate replace to={AUTH_LOGIN_PATH} />} />
                {publicRoutes.map((route) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={route.key}
                            path={route.path}
                            element={
                                <PublicRoute>
                                    <Page />
                                </PublicRoute>
                            }
                        />
                    )
                })}
                {privateRoutes.map((route) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={route.key}
                            path={route.path}
                            element={
                                <PrivateRoute>
                                    <Page />
                                </PrivateRoute>
                            }
                        />
                    )

                })}
                <Route path="*" element={<Navigate replace to={AUTH_LOGIN_PATH} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;