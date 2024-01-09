import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { logout } from "store/slices/authSlice";
import { notify } from "store/slices/toastSlice";
import { AUTH_LOGIN_PATH } from "constants/";
import { getCurrentUser } from "libs/axios/api/auth";
import { setCurrentUser } from "store/slices/authSlice";
import type { RootState } from "store";
import type { IUser } from "libs/types";
import "./AppTopbar.scss";

const AppTopbar = () => {
  const { isLogged, currentUser } = useSelector((state: RootState) => state.auth);
  const [ activeTab, setActiveTab ] = React.useState(0);
  const location = useLocation();
  const { projectId } = useParams();
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
          dispatch(setCurrentUser(res as IUser));
      }
  }

  React.useEffect(() => {
      if (isLogged) {
          GetCurrentUser()
      }
  }, [isLogged])

  React.useEffect(() => {
    if (projectId) {
      switch (location.pathname) {
        case `/app/project/${projectId}/design-workspace`:
          setActiveTab(0)
          break;
        case `/app/project/${projectId}/backend-workspace`:
          setActiveTab(1)
          break;
        case `/app/project/${projectId}/architecture-workspace`:
          setActiveTab(2)
          break;
        default:
          break;
      }
    }
  }, [location, projectId])

  const NavigateWorkspace = (index: number) => {
    setActiveTab(index);
    switch (index) {
      case 0:
        navigate(`/app/project/${projectId}/design-workspace`);
        break;
      case 1:
        navigate(`/app/project/${projectId}/backend-workspace`);
        break;
      case 2:
        navigate(`/app/project/${projectId}/architecture-workspace`);
        break;
      default:
        break;
    }
  }

  return (
    <div className="app-header">
      <div className="logo" onClick={ ()=>navigate('/app') }>
        <h2>SINGULARITY</h2>
      </div>
      {location.pathname.indexOf('preview') === -1 &&
          <div className='tab-board'>
            <div className="navigate-board">
              <Button className={`nav-button${activeTab == 0 ? '-active' : ''}`} onClick={()=>{NavigateWorkspace(0)}} > DESIGN </Button>
              <Button className={`nav-button${activeTab == 1 ? '-active' : ''}`} onClick={()=>{NavigateWorkspace(1)}}> BACK-END </Button>
              <Button className={`nav-button`} disabled> ARCHITECTURE </Button>
            </div>
            <Button className="nav-button-preivew" size="small" onClick={() => navigate(`/app/project/${projectId}/preview`)}>
              <span>PREVIEW</span>
            </Button>
          </div>
        }
      <div className="profile">
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