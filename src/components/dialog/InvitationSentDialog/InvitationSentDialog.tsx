import { type FC } from "react";
import { InvitationSentDialogProps } from "./InvitationSentDialog.types";
import { Dialog } from "primereact/dialog";
import { AvatarGroup } from "primereact/avatargroup";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

const InvitationSentDialog: FC<InvitationSentDialogProps> = ({
    isOpenInvitationModal,
    setIsOpenInvitationModal,
    members
}) => {
    return (
        <Dialog
            header="Invitations sent"
            visible={isOpenInvitationModal}
            style={{ width: 430 }}
            onHide={() => setIsOpenInvitationModal(false)}
            draggable={false}
        >
            <h4 style={{ textAlign: 'center' }}>Invitation link was sent to your teammates</h4>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0px' }}>
                <AvatarGroup>
                    {members.map((member, index) => (
                        <Avatar
                            label={member.email.substring(0, 1).toUpperCase()}
                            style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
                            size="large"
                            shape="circle"
                            key={index}
                        />
                    ))}
                </AvatarGroup>
            </div>
            <Button severity="info" style={{ width: '100%' }} onClick={() => {
                setIsOpenInvitationModal(false)
            }}>
                <span style={{ textAlign: 'center', width: '100%' }}>Let's start</span>
            </Button>
        </Dialog>
    )
}

export default InvitationSentDialog