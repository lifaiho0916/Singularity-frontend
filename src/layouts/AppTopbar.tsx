import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { logout } from "src/store/slices/authSlice";
import { notify } from "src/store/slices/toastSlice";
import { AUTH_LOGIN_PATH } from "src/constants";
import type { RootState } from "src/store";
import { getCurrentUser } from "src/libs/axios/api/auth";
import { setCurrentUser } from "src/store/slices/authSlice";
import "src/assets/styles/layouts/topbar.scss";
import { ICurrentUser } from "src/libs/types";

const AppTopbar = () => {
    const { isLogged, currentUser } = useSelector((state: RootState) => state.auth);
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

    const GetCurrentUser = async () => {
        const res = await getCurrentUser();
        if (res) {
            dispatch(setCurrentUser(res as ICurrentUser));
        }
    }

    React.useEffect(() => {
        if (isLogged) {
            GetCurrentUser()
        }
    }, [isLogged])

    return (
        <div className="app-header">
            <div className="logo">
                <h1>SINGULARITY</h1>
            </div>
            <div className="profile">
                <Avatar
                    icon="pi pi-user"
                    shape="circle"
                    image={currentUser?.avatar}
                    style={{ backgroundColor: '#2196F3', color: '#ffffff', cursor: 'pointer' }}
                    onClick={(event) => menuRight.current && menuRight.current.toggle(event)}
                />
                <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
            </div>
        </div>
    )
}

export default AppTopbar;