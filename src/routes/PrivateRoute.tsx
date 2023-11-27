import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_ACCESS_TOKEN, AUTH_LOGIN_PATH } from "src/constants";
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

    return <>{children}</>;
};

export default PrivateRoute;