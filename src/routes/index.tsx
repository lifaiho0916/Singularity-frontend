import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { publicRoutes, privateRoutes } from "src/configs/RoutesConfigs";
import PrivateRoute from "src/routes/PrivateRoute";
import PublicRoute from "./PublicRoute";
import { AUTH_LOGIN_PATH } from "src/constants";

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
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;