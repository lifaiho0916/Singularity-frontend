import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { logout } from "store/slices/authSlice";
import { notify } from "store/slices/toastSlice";
import { AUTH_LOGIN_PATH } from "constants/";
import { getCurrentUser } from "libs/axios/api/auth";
import { setCurrentUser } from "store/slices/authSlice";
import { setZoom } from "store/slices/projectSlice";
import type { RootState } from "store";
import type { IUser } from "libs/types";
import "./AppTopbar.scss";

const AppTopbar = () => {
  const { projectId } = useParams();
  const { isLogged, currentUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
      dispatch(setCurrentUser(res as IUser));
    }
  }

  React.useEffect(() => {
    if (isLogged) {
      GetCurrentUser()
    }
  }, [isLogged])

  const isWorkspace = React.useMemo(() => {
    if (location.pathname.indexOf('design-workspace') !== -1 || location.pathname.indexOf('backend-workspace') !== -1 || location.pathname.indexOf('architecture-workspace') !== -1) {
      return true;
    } return false;
  }, [location])

  return (
    <div className="app-header">
      <div className="logo" onClick={() => navigate('/app')}>
        <h1>SINGULARITY</h1>
      </div>
      {isWorkspace &&
        <div className="design-navigation">
          <Button raised text={location.pathname.indexOf('design-workspace') === -1} size="small" onClick={() => navigate(`/app/project/${projectId}/design-workspace`)}>DESIGN</Button>
          <Button raised text={location.pathname.indexOf('backend-workspace') === -1} size="small" onClick={() => navigate(`/app/project/${projectId}/backend-workspace`)}>BACKEND</Button>
          {/* <Button raised text={location.pathname.indexOf('architecture-workspace') === -1} size="small" onClick={() => navigate(`/app/project/${projectId}/architecture-workspace`)}>ARCHITECTURE</Button> */}
        </div>}
      <div className="profile">
        {isWorkspace &&
          <Button raised size="small" onClick={() => {
            dispatch(setZoom(1));
            navigate(`/app/project/${projectId}/preview`)
          }}>PREVIEW</Button>
        }
        {location.pathname.indexOf('preview') !== -1 &&
          <div>
            <Button raised size="small" onClick={() => {
              navigate(`/app/project/${projectId}/design-workspace`)
            }}>BACK TO EDITOR</Button>
            {/* <Button raised size="small" onClick={() => { }}>DEPLOY</Button> */}
          </div>
        }
        <Avatar
          shape="circle"
          image={currentUser?.avatar}
          style={{ cursor: 'pointer' }}
          onClick={(event) => menuRight.current && menuRight.current.toggle(event)}
        />
        <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
      </div>
    </div>
  )
}

export default AppTopbar;