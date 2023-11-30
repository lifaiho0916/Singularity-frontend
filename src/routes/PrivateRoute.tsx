import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_ACCESS_TOKEN, AUTH_LOGIN_PATH } from "src/constants";
import Layout from "src/layouts";
interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const navigate = useNavigate();
    const token = localStorage.getItem(AUTH_ACCESS_TOKEN);

    React.useEffect(() => {
        if (!token) {
            navigate(AUTH_LOGIN_PATH);
        }
    }, [token, navigate]);

    return <Layout isAuthenticated={true}>{children}</Layout>;
};

export default PrivateRoute;