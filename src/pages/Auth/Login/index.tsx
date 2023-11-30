import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { login } from 'src/store/slices/authSlice';
import { notify } from 'src/store/slices/toastSlice';
import { AUTHENTICATED_ENTRY } from 'src/constants';
import 'src/assets/styles/pages/login.scss';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LoginBtnClick = () => {
        dispatch(login("access_token"));
        dispatch(notify({ type: 'success', content: 'User logged in successfuly', title: '' }));
        navigate(AUTHENTICATED_ENTRY);
    }

    return (
        <div className='login'>
            <div className='left-part'>
                <div className='header'>
                    <h1>SINGULARITY</h1>
                </div>
                <div className="center">
                    <h3>Create.</h3>
                    <h3>Manage.</h3>
                    <h3>Deploy.</h3>
                    <h3>All in one</h3>
                </div>
                <div className="footer">
                    <ul>
                        <li>Product</li>
                        <li>Features</li>
                        <li>Showcase</li>
                        <li>Pricelist</li>
                    </ul>
                </div>
            </div>
            <div className='right-part'>
                <div className="social-login">
                    <h1 className='title'>Log in</h1>
                    <h2 className='description'>Let's try its free</h2>
                    <Button
                        label="Log in with google"
                        icon="pi pi-google"
                        severity="danger"
                        raised
                        size="small"
                        onClick={LoginBtnClick}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;