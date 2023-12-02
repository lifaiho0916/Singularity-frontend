import { Button } from 'primereact/button';
import { GOOGLE_AUTH_URL } from 'src/constants';
import 'src/assets/styles/pages/login.scss';

const Login = () => {

    const LoginBtnClick = async () => {
        window.location.href = GOOGLE_AUTH_URL;
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