import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { logout } from "src/store/slices/authSlice";
import { notify } from "src/store/slices/toastSlice";
import { AUTH_LOGIN_PATH } from "src/constants";
import "src/assets/styles/layouts/topbar.scss";

const AppTopbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const menuRight = React.useRef<Menu | null>(null);
    const items = [
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            command: () => {

            }
        },
        {
            label: 'Settings',
            icon: 'pi pi-fw pi-cog',
            command: () => {

            }
        },
        { separator: true },
        {
            label: 'Log out',
            icon: 'pi pi-fw pi-sign-out',
            command: () => Logout()
        }
    ];

    const Logout = () => {
        dispatch(logout());
        dispatch(notify({ type: 'success', content: 'See you again soon!', title: '' }));
        navigate(AUTH_LOGIN_PATH);
    }

    return (
        <div className="app-header">
            <div className="logo">
                <h1>SINGULARITY</h1>
            </div>
            <div className="profile">
                <Avatar
                    icon="pi pi-user"
                    shape="circle"
                    style={{ backgroundColor: '#2196F3', color: '#ffffff', cursor: 'pointer' }}
                    onClick={(event) => menuRight.current && menuRight.current.toggle(event)}
                />
                <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
            </div>
        </div>
    )
}

export default AppTopbar;