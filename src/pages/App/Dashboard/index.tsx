import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import { Menu } from 'primereact/menu';
import type { MenuItemCommandEvent } from 'primereact/menuitem';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ProjectTemplate } from 'components';
import { notify } from 'store/slices/toastSlice';
import { setProject, setProjects, InitProject } from 'store/slices/projectSlice';
import { setTemplates, setTemplate } from 'store/slices/templateSlice';
import type { RootState } from 'store';
import type { IMember, IProject, IProjectMember, ITemplate } from 'libs/types';
import { getProjectsByCreator, deleteProject } from 'libs/axios/api/project';
import { getAllTemplates } from 'libs/axios/api/template';
import { CreateProjectDialog } from 'components/dialog/CreateProjectDialog';
import { InviteMembersDialog } from 'components/dialog/InviteMembersDialog';
import { InvitationSentDialog } from 'components/dialog/InvitationSentDialog';
import "assets/styles/pages/app/dashboard.scss";

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

    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric'
    }

    return (
        <tr onClick={() => NavigateWorkspace(id)}>
            <td style={{ display: 'flex', alignItems: 'center' }}>
                <div className="template"></div>
                <span className='project-name'>{name}</span>
            </td>
            <td>{openedAt ? new Date(openedAt).toLocaleDateString(undefined, options) : ''}</td>
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
    const { projects } = useSelector((state: RootState) => state.project);
    const { templates } = useSelector((state: RootState) => state.template);
    const [isOpenProjectModal, setIsOpenProjectModal] = React.useState(false);
    const [isOpenInviteModal, setIsOpenInviteModal] = React.useState(false);
    const [isOpenInvitationModal, setIsOpenInvitationModal] = React.useState(false);
    const [members, setMembers] = React.useState<IMember[]>([]);

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
            dispatch(InitProject());
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
                                        setIsOpenInviteModal(true);
                                    }}
                                    NavigateWorkspace={(id: number) => {
                                        navigate(`/app/project/${id}`);
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
            <CreateProjectDialog
                isOpenProjectModal={isOpenProjectModal}
                setIsOpenProjectModal={setIsOpenProjectModal}
            />
            <InvitationSentDialog
                isOpenInvitationModal={isOpenInvitationModal}
                setIsOpenInvitationModal={setIsOpenInvitationModal}
                members={members}
            />
            <InviteMembersDialog
                isOpenInviteModal={isOpenInviteModal}
                setIsOpenInviteModal={setIsOpenInviteModal}
                members={members}
                setMembers={setMembers}
                setIsOpenInvitationModal={setIsOpenInvitationModal}
            />
        </div>
    );
}

export default Dashboard;