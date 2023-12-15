import React from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AcceptMemberInvitation } from "libs/axios/api/project";
import { AUTH_LOGIN_PATH, INVITATION_TOKEN, AUTH_ACCESS_TOKEN, AUTHENTICATED_ENTRY } from "constants/";

const InviteHandler = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    if(token) {
        localStorage.setItem(INVITATION_TOKEN, token);
    }

    React.useEffect(() => {
        if (localStorage.getItem(INVITATION_TOKEN)) {
            if (localStorage.getItem(AUTH_ACCESS_TOKEN) === null) {
                navigate(AUTH_LOGIN_PATH);
            } else {
                localStorage.removeItem(INVITATION_TOKEN);
                AcceptInvitation();
            }
        }
    }, [])

    const AcceptInvitation = async () => {
        const invitationToken = token
        const res = await AcceptMemberInvitation(invitationToken as string)
        if (res) {
            console.log(res);
            navigate(AUTHENTICATED_ENTRY);
        }
    }

    return <></>
}

export default InviteHandler;