import { useSearchParams, Navigate } from 'react-router-dom';
import { AUTH_LOGIN_PATH, INVITATION_TOKEN } from 'src/constants';

const InviteHandler = () => {
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');
    if (token) {
        localStorage.setItem(INVITATION_TOKEN, token);
    }

    return <Navigate to={AUTH_LOGIN_PATH} replace />
}

export default InviteHandler;