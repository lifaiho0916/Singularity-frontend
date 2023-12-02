import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { login } from 'src/store/slices/authSlice';
import { notify } from 'src/store/slices/toastSlice';
import { AUTHENTICATED_ENTRY, AUTH_LOGIN_PATH } from 'src/constants';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');
        if (token) {
            dispatch(login(token));
            dispatch(notify({ type: 'success', content: 'User logged in successfuly', title: '' }));
            navigate(AUTHENTICATED_ENTRY);
        } else {
            dispatch(notify({ type: 'error', content: error as string, title: '' }));
            navigate(AUTH_LOGIN_PATH);
        }
    })

    return <></>;
}

export default OAuth2RedirectHandler;