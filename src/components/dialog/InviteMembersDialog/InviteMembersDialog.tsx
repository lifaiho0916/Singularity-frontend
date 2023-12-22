import { useState, type FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { CascadeSelect } from "primereact/cascadeselect";
import { Button } from "primereact/button";
import { InviteMembersDialogProps } from "./InviteMembersDialog.types";
import { PROJECT_POSITIONS } from "constants/";
import { notify } from "store/slices/toastSlice";
import type { IMember } from "libs/types";
import { InviteMembersByProject } from "libs/axios/api/project";

const InviteMembersDialog: FC<InviteMembersDialogProps> = ({
    isOpenInviteModal,
    setIsOpenInviteModal,
    setIsOpenInvitationModal,
    members,
    setMembers,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { projectId } = useParams();

    const addNewMember = () => {
        const updatedMembers = [...members];
        updatedMembers.push({ email: '', position: '' });
        setMembers(updatedMembers);
    }

    const InitialMembers = () => {
        const initialMembers: IMember[] = [];
        initialMembers.push({ email: '', position: '' })
        initialMembers.push({ email: '', position: '' })
        initialMembers.push({ email: '', position: '' })
        setMembers(initialMembers);
    }

    const InviteMembers = async () => {
        setIsLoading(true);
        const updatesMembes = members.filter(member => member.email !== '' && member.position !== '');
        if (updatesMembes.length === 0) {
            dispatch(notify({ type: 'error', title: '', content: 'Please provide the email addresses and positions of your teammates' }))
            return
        }

        const res = await InviteMembersByProject(Number(projectId), updatesMembes)
        if (res) {
            dispatch(notify({ type: 'success', title: '', content: 'The invitation emails have been successfully delivered' }))
            setIsOpenInviteModal(false);
            setMembers(updatesMembes);
            setIsOpenInvitationModal(true);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (isOpenInviteModal) {
            InitialMembers();
        }
    }, [isOpenInviteModal])

    return (
        <Dialog
            header="Invite members"
            visible={isOpenInviteModal}
            style={{ width: 450 }}
            onHide={() => setIsOpenInviteModal(false)}
            draggable={false}
        >
            {members.map((member, index) => (
                <div style={{ display: 'flex', margin: '10px 0px' }} key={index}>
                    <InputText
                        type='email'
                        value={member.email}
                        placeholder='Email'
                        style={{ width: '60%' }}
                        onChange={(e) => {
                            const updatedMembers = [...members];
                            updatedMembers[index].email = e.target.value;
                            setMembers(updatedMembers);
                        }}
                    />
                    <CascadeSelect
                        value={member.position}
                        style={{ width: '40%' }}
                        onChange={(e) => {
                            const updatedMembers = [...members];
                            updatedMembers[index].position = e.value;
                            setMembers(updatedMembers);
                        }}
                        options={PROJECT_POSITIONS}
                        optionGroupChildren={[]}
                        placeholder="Position"
                    />
                </div>
            ))}
            <span onClick={addNewMember} style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}>+ Add New</span>
            <Button
                severity="info"
                style={{ width: '100%', margin: '10px 0px' }}
                onClick={InviteMembers}
                loading={isLoading}
            >
                <span style={{ textAlign: 'center', width: '100%' }}>Send</span>
            </Button>
            <div style={{ textAlign: 'center' }}>
                <span onClick={() => {
                    setIsOpenInviteModal(false)
                }} style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}>I don't want to invite members</span>
            </div>
        </Dialog>
    )
}

export default InviteMembersDialog;