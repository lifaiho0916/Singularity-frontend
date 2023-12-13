import React from "react";
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom'
import { login } from 'store/slices/authSlice';
import { notify } from 'store/slices/toastSlice';
import { AcceptMemberInvitation } from "libs/axios/api/project";
import { AUTHENTICATED_ENTRY, AUTH_ACCESS_TOKEN, AUTH_LOGIN_PATH, INVITATION_TOKEN } from "constants/";

const OAuth2RedirectHandler = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');
    const error = searchParams.get('error');

    React.useEffect(() => {
        if (token && localStorage.getItem(AUTH_ACCESS_TOKEN) === null) {
            AcceptInvitation(token);
        }
        if (error) {
            dispatch(notify({ type: 'error', content: error as string, title: '' }));
            navigate(AUTH_LOGIN_PATH);
        }
    }, [])

    const AcceptInvitation = async (token: string) => {
        dispatch(login(token));
        if (localStorage.getItem(INVITATION_TOKEN)) {
            const invitationToken = localStorage.getItem(INVITATION_TOKEN)
            const res = await AcceptMemberInvitation(invitationToken as string)
            if (res) {
                console.log(res);
                localStorage.removeItem(INVITATION_TOKEN);
            }
        }
        dispatch(notify({ type: 'success', content: 'User logged in successfuly', title: '' }));
        navigate(AUTHENTICATED_ENTRY);
    }

    return <></>
}

export default OAuth2RedirectHandler;