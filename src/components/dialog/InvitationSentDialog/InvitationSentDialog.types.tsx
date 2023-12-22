import type { IMember } from "libs/types"

export interface InvitationSentDialogProps {
    isOpenInvitationModal: boolean,
    setIsOpenInvitationModal: (value: boolean) => void,
    members: Array<IMember>
}   
