import { IMember } from "libs/types";

export interface InviteMembersDialogProps {
    isOpenInviteModal: boolean,
    setIsOpenInviteModal: (value: boolean) => void,
    setIsOpenInvitationModal: (value: boolean) => void,
    members: Array<IMember>,
    setMembers: (value: Array<IMember>) => void
}   
