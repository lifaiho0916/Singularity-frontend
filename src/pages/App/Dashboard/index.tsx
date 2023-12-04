import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { CascadeSelect } from 'primereact/cascadeselect';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import ProjectTemplate from 'src/assets/components/app/ProjectTemplate';
import { notify } from 'src/store/slices/toastSlice';
import { setProject, setProjects } from 'src/store/slices/projectSlice';
import { PROJECT_POSITIONS } from 'src/constants';
import type { RootState } from 'src/store';
import type { IMember, IProject } from 'src/libs/types';
import { createProject, getProjectsByCreator } from 'src/libs/axios/api/project';
import "src/assets/styles/pages/app/dashboard.scss";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.auth);
    const { projects } = useSelector((state: RootState) => state.project);
    const [isOpenProjectModal, setIsOpenProjectModal] = React.useState(false);
    const [isOpenInviteModal, setIsOpenInviteModal] = React.useState(false);
    const [isOpenInvitationModal, setIsOpenInvitationModal] = React.useState(false);
    const [members, setMembers] = React.useState<IMember[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const templates = [
        {
            title: 'New document'
        },
        {
            title: 'App template'
        },
        {
            title: 'Login template'
        },
        {
            title: 'Eshop template'
        },
    ]

    const CreateNewProject = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const projectData = {
            name: event.currentTarget["projectName"].value,
            creator_id: currentUser?.id
        }
        const res = await createProject(projectData);
        if (res) {
            dispatch(setProject(res));
            setIsOpenProjectModal(false);
            const initialMembers: IMember[] = [];
            initialMembers.push({ email: '', position: '' })
            initialMembers.push({ email: '', position: '' })
            initialMembers.push({ email: '', position: '' })
            setMembers(initialMembers);
            setIsOpenInviteModal(true);
        }
        setIsLoading(false);
    }

    const InviteMembers = () => {
        const updatesMembes = members.filter(member => member.email !== '' && member.position !== '');
        if (updatesMembes.length === 0) {
            dispatch(notify({ type: 'error', title: '', content: 'Please provide the email addresses and positions of your teammates' }))
            return
        }
        setIsOpenInviteModal(false);
        setMembers(updatesMembes);
        setIsOpenInvitationModal(true);
    }

    const addNewMember = () => {
        const updatedMembers = [...members];
        updatedMembers.push({ email: '', position: '' });
        setMembers(updatedMembers);
    }

    const GetProjectsByCreator = async () => {
        const res = await getProjectsByCreator(currentUser?.id as number);
        if (res) {
            dispatch(setProjects(res as Array<IProject>));
        }
    }

    React.useEffect(() => {
        if (currentUser) {
            GetProjectsByCreator()
        }
    }, [currentUser])

    return (
        <div>
            <div className="new-project">
                <div className="header">
                    <h5>START NEW PROJECT</h5>
                    <i className="pi pi-ellipsis-h" style={{ cursor: 'pointer' }}></i>
                </div>
                <div className="tempates">
                    {templates.map((template, index) => (
                        <ProjectTemplate title={template.title} key={index} />
                    ))}
                </div>
            </div>
            <div className="project-list">
                {projects.length > 0 ?
                    <table>
                        <thead>
                            <tr>
                                <th>TODAY</th>
                                <th>LAST TIME OPENED</th>
                                <th>OWNED BY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project: IProject, index) => (
                                <tr key={index}>
                                    <td style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="template"></div>
                                        <span className='project-name'>{project.name}</span>
                                    </td>
                                    <td>{project.openedAt ? project.openedAt : ''}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <AvatarGroup>
                                                <Avatar
                                                    shape="circle"
                                                    image={project.creator.avatar}
                                                />
                                            </AvatarGroup>
                                            <Button icon="pi pi-ellipsis-v" rounded text severity="secondary" aria-label="Cancel" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    :
                    <div className="first-project">
                        <i className="pi pi-align-justify"></i>
                        <h2>Welcome create your first project!</h2>
                        <Button severity="info" onClick={() => {
                            setIsOpenProjectModal(true);
                        }}>Create first project</Button>
                    </div>
                }
            </div>
            <Dialog
                header="Create new project"
                visible={isOpenProjectModal}
                style={{ width: 400 }}
                onHide={() => setIsOpenProjectModal(false)}
                draggable={false}
            >
                <form onSubmit={CreateNewProject}>
                    <InputText
                        name="projectName"
                        placeholder="Project Name"
                        style={{ width: '100%', marginBottom: 20 }}
                        required
                    />
                    <Button severity="info" style={{ width: '100%' }} loading={isLoading}>
                        <span style={{ textAlign: 'center', width: '100%' }}>Create new project</span>
                    </Button>
                </form>
            </Dialog>
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
                <Button severity="info" style={{ width: '100%', margin: '10px 0px' }} onClick={InviteMembers}>
                    <span style={{ textAlign: 'center', width: '100%' }}>Send</span>
                </Button>
                <div style={{ textAlign: 'center' }}>
                    <span onClick={() => setIsOpenInviteModal(false)} style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}>I don't want to invite members</span>
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
                <Button severity="info" style={{ width: '100%' }} onClick={() => setIsOpenInvitationModal(false)}>
                    <span style={{ textAlign: 'center', width: '100%' }}>Let's start</span>
                </Button>
            </Dialog>
        </div>
    );
}

export default Dashboard;