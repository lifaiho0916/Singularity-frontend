import { useDispatch } from 'react-redux';
import { useSearchParams, Navigate } from 'react-router-dom'
import { login } from 'src/store/slices/authSlice';
import { notify } from 'src/store/slices/toastSlice';
import { AUTHENTICATED_ENTRY, AUTH_LOGIN_PATH } from 'src/constants';

const OAuth2RedirectHandler = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');
    const error = searchParams.get('error');
    if (token) {
        dispatch(login(token));
        dispatch(notify({ type: 'success', content: 'User logged in successfuly', title: '' }));
        return <Navigate to={AUTHENTICATED_ENTRY} replace />
    } else {
        dispatch(notify({ type: 'error', content: error as string, title: '' }));
        return <Navigate to={AUTH_LOGIN_PATH} replace />
    }
}

export default OAuth2RedirectHandler;