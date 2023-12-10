import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { CascadeSelect } from 'primereact/cascadeselect';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import { Menu } from 'primereact/menu';
import type { MenuItemCommandEvent } from 'primereact/menuitem';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import ProjectTemplate from 'src/assets/components/app/ProjectTemplate';
import { notify } from 'src/store/slices/toastSlice';
import { setProject, setProjects } from 'src/store/slices/projectSlice';
import { setTemplates, setTemplate } from 'src/store/slices/templateSlice';
import { PROJECT_POSITIONS } from 'src/constants';
import type { RootState } from 'src/store';
import type { IMember, IProject, IProjectMember, ITemplate } from 'src/libs/types';
import { createProject, getProjectsByCreator, deleteProject, InviteMembersByProject } from 'src/libs/axios/api/project';
import { getAllTemplates } from 'src/libs/axios/api/template';
import "src/assets/styles/pages/app/dashboard.scss";

interface ProjectRowProps {
    project: IProject,
    deleteProject: (id: number) => void,
    inviteMembers: (id: number) => void,
    NavigateWorkspace: (id: number) => void
}

const ProjectRow = ({ project, deleteProject, inviteMembers, NavigateWorkspace }: ProjectRowProps) => {
    const { id, openedAt, name, creator } = project;
    const menu = React.useRef<Menu | null>(null);
    const items = [
        {
            label: 'Invite members',
            command: (event: MenuItemCommandEvent) => {
                event.originalEvent.stopPropagation();
                inviteMembers(id)
            }
        },
        {
            label: 'Delete project',
            command: (event: MenuItemCommandEvent) => {
                event.originalEvent.stopPropagation();
                deleteProject(id)
            }
        }
    ];

    return (
        <tr onClick={() => {
            NavigateWorkspace(id)
        }}>
            <td style={{ display: 'flex', alignItems: 'center' }}>
                <div className="template"></div>
                <span className='project-name'>{name}</span>
            </td>
            <td>{openedAt ? openedAt : ''}</td>
            <td>
                <AvatarGroup>
                    <Avatar
                        shape="circle"
                        image={creator.avatar}
                    />
                </AvatarGroup>
            </td>
            <td>
                <AvatarGroup>
                    {project.members.map((member: IProjectMember, index) => (
                        <Avatar
                            key={index}
                            shape="circle"
                            image={member.user.avatar}
                        />
                    ))}
                </AvatarGroup>
            </td>
            <td>
                <Button
                    onClick={(event) => {
                        event.stopPropagation();
                        menu.current && menu.current.toggle(event)
                    }}
                    icon="pi pi-ellipsis-v"
                    rounded text
                    severity="secondary"
                    aria-label="Cancel"
                />
                <Menu model={items} popup ref={menu} popupAlignment="right" />
            </td>
        </tr>
    )
}

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: RootState) => state.auth);
    const { projects, project } = useSelector((state: RootState) => state.project);
    const { templates, template } = useSelector((state: RootState) => state.template);
    const [isOpenProjectModal, setIsOpenProjectModal] = React.useState(false);
    const [isOpenInviteModal, setIsOpenInviteModal] = React.useState(false);
    const [isOpenInvitationModal, setIsOpenInvitationModal] = React.useState(false);
    const [members, setMembers] = React.useState<IMember[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const CreateNewProject = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const projectData = {
            name: event.currentTarget["projectName"].value,
            creator: currentUser,
            templateId: template?.id
        }
        const res = await createProject(projectData);
        if (res) {
            dispatch(setProject(res as IProject));
            setIsOpenProjectModal(false);
            InitialMembers();
            setIsOpenInviteModal(true);
        }
        setIsLoading(false);
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

        const res = await InviteMembersByProject(project?.id as number, updatesMembes)
        if (res) {
            dispatch(notify({ type: 'success', title: '', content: 'The invitation emails have been successfully delivered' }))
            setIsOpenInviteModal(false);
            setMembers(updatesMembes);
            setIsOpenInvitationModal(true);
        }
        setIsLoading(false);
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

    const deleteProjectConfirm = (projectId: number) => {
        confirmDialog({
            message: 'Are you sure you want to delete?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept() { DeleteProject(projectId) }
        });
    }

    const DeleteProject = async (projectId: number) => {
        const res = await deleteProject(projectId);
        if (res) {
            const updatedProjects = projects.filter(project => project.id !== projectId);
            dispatch(setProjects(updatedProjects));
            dispatch(notify({ type: 'success', title: '', content: 'The project has been successfully deleted.' }))
        }
    }

    const GetAllTemplates = async () => {
        const res = await getAllTemplates();
        if (res) {
            const resTemplates = res as Array<ITemplate>
            dispatch(setTemplates([...resTemplates.sort((a, b) => a.id - b.id)]));
        }
    }

    React.useEffect(() => {
        if (currentUser) {
            GetProjectsByCreator();
            GetAllTemplates();
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
                        <ProjectTemplate template={template} key={index} createProject={() => {
                            dispatch(setTemplate(template));
                            setIsOpenProjectModal(true)
                        }} />
                    ))}
                </div>
            </div>
            <div className="project-list">
                {projects.length > 0 ?
                    <table>
                        <thead>
                            <tr>
                                <th>PROJECT</th>
                                <th>LAST TIME OPENED</th>
                                <th>OWNED BY</th>
                                <th>MEMBERS</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project: IProject, index) => (
                                <ProjectRow
                                    key={index}
                                    project={project}
                                    deleteProject={deleteProjectConfirm}
                                    inviteMembers={(id: number) => {
                                        dispatch(setProject(projects.filter(project => project.id === id)[0]));
                                        InitialMembers();
                                        setIsOpenInviteModal(true);
                                    }}
                                    NavigateWorkspace={(id: number) => {
                                        navigate('/app/project');
                                    }}
                                />
                            ))}
                        </tbody>
                    </table>
                    :
                    <div className="first-project">
                        <i className="pi pi-align-justify"></i>
                        <h2>Welcome create your first project!</h2>
                        <Button severity="info" onClick={() => {
                            dispatch(setTemplate(templates.filter((template: ITemplate) => template.defaultTemplate)[0]));
                            setIsOpenProjectModal(true);
                        }}>Create first project</Button>
                    </div>
                }
            </div>
            <ConfirmDialog />
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
                        navigate('/app/project')
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
                    navigate('/app/project')
                }}>
                    <span style={{ textAlign: 'center', width: '100%' }}>Let's start</span>
                </Button>
            </Dialog>
        </div>
    );
}

export default Dashboard;