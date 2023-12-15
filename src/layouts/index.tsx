import React from "react";
import AppTopbar from "layouts/AppTopbar";
interface LayoutProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
}

const Layout = ({ children, isAuthenticated }: LayoutProps) => {
    return (
        <React.Fragment>
            {isAuthenticated ? <AppTopbar /> : null}
            {children}
        </React.Fragment>
    )
}

export default Layout;