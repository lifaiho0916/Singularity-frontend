import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { CascadeSelect } from 'primereact/cascadeselect';
import { TabView, TabPanel } from 'primereact/tabview';
import { PROJECT_POSITIONS } from "constants/";
import { useNavigate, useParams, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { notify } from 'store/slices/toastSlice';
import { InviteMembersByProject, getProjectById, setOpenAtById } from 'libs/axios/api/project';
import { setProject, setStructure } from 'store/slices/projectSlice';
import type { IMember, IProject } from 'libs/types';
import type { RootState } from 'store';

import DesignWorkspace from 'pages/App/Project/Design';
import BackendWorkspace from 'pages/App/Project/Backend';
// import ArchitectureWorkspace from 'pages/App/Project/Architecture';

import 'assets/styles/pages/app/project.scss';

const WorkspaceContent = () => {
    return (
        <Routes>
            <Route path="design-workspace" element={<DesignWorkspace />} />
            <Route path="backend-workspace" element={<BackendWorkspace />} />
            {/* <Route path="architecture-workspace" element={<ArchitectureWorkspace />} /> */}
            <Route path="*" element={<Navigate to="design-workspace" replace />} />
        </Routes>
    )
}

const Project = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [isOpenInviteModal, setIsOpenInviteModal] = React.useState(false);
    const [isOpenInvitationModal, setIsOpenInvitationModal] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [members, setMembers] = React.useState<IMember[]>([]);
    const [activeTab, setActiveTab] = React.useState(0);
    const { project } = useSelector((state: RootState) => state.project);

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

    const GetProjectById = async (projectId: number) => {
        const res = await getProjectById(projectId);
        if (res) {
            dispatch(setProject(res as IProject));
        }
    }

    const NavigateWorkspace = (index: number) => {
        switch (index) {
            case 0:
                navigate(`/app/project/${projectId}/design-workspace`);
                break;
            case 1:
                navigate(`/app/project/${projectId}/backend-workspace`);
                break;
            // case 2:
            //     navigate(`/app/project/${projectId}/architecture-workspace`);
            //     break;
            default:
                break;
        }
    }

    React.useEffect(() => {
        if (projectId) {
            GetProjectById(Number(projectId));
            setOpenAtById(Number(projectId))
            InitialMembers();
        }
    }, [projectId]);

    React.useEffect(() => {
        if (project && project.id === Number(projectId)) {
            dispatch(setStructure(JSON.parse(project.data)));
            if (project.openedAt === null) {
                setIsOpenInviteModal(true);
            }
        }
    }, [project, projectId]);

    React.useEffect(() => {
        if (projectId) {
            switch (location.pathname) {
                case `/app/project/${projectId}/design-workspace`:
                    setActiveTab(0)
                    break;
                case `/app/project/${projectId}/backend-workspace`:
                    setActiveTab(1)
                    break;
                // case `/app/project/${projectId}/architecture-workspace`:
                //     setActiveTab(2)
                //     break;
                default:
                    break;
            }
        }
    }, [location, projectId])

    return (
        <div className="project-board">
            <div style={{ margin: 5 }}>
                <TabView activeIndex={activeTab} onTabChange={(e) => NavigateWorkspace(e.index)}>
                    <TabPanel header="DESIGN" />
                    <TabPanel header="BACKEND" />
                    {/* <TabPanel header="ARCHITECTURE" /> */}
                </TabView>
            </div>
            <WorkspaceContent />
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
        </div>
    )
}

export default Project;