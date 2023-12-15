import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTHENTICATED_ENTRY, AUTH_ACCESS_TOKEN } from "constants/";
import Layout from "layouts";
interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    const navigate = useNavigate();
    const token = localStorage.getItem(AUTH_ACCESS_TOKEN);

    React.useEffect(() => {
        if (token) {
            navigate(AUTHENTICATED_ENTRY);
        }
    }, [token, navigate]);

    return <Layout isAuthenticated={false}>{children}</Layout>;
};

export default PublicRoute;