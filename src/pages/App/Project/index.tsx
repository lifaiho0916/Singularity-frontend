import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { useNavigate, useParams, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { getProjectById, setOpenAtById } from 'libs/axios/api/project';
import { setProject, setStructure } from 'store/slices/projectSlice';
import { InviteMembersDialog } from 'components/dialog/InviteMembersDialog';
import { InvitationSentDialog } from 'components/dialog/InvitationSentDialog';
import type { IMember, IProject } from 'libs/types';
import type { RootState } from 'store';

import DesignWorkspace from 'pages/App/Project/Design';
import BackendWorkspace from 'pages/App/Project/Backend';
import ArchitectureWorkspace from 'pages/App/Project/Architecture';
import Preview from "pages/App/Project/Preview";
import 'assets/styles/pages/app/project.scss';

const WorkspaceContent = () => {
    return (
        <Routes>
            <Route path="design-workspace" element={<DesignWorkspace />} />
            <Route path="backend-workspace" element={<BackendWorkspace />} />
            <Route path="architecture-workspace" element={<ArchitectureWorkspace />} />
            <Route path="preview" element={<Preview />} />
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
    const [members, setMembers] = React.useState<IMember[]>([]);
    const [activeTab, setActiveTab] = React.useState(0);
    const { project } = useSelector((state: RootState) => state.project);

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
            case 2:
                navigate(`/app/project/${projectId}/architecture-workspace`);
                break;
            default:
                break;
        }
    }

    React.useEffect(() => {
        if (projectId) {
            GetProjectById(Number(projectId));
            setOpenAtById(Number(projectId))
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
                case `/app/project/${projectId}/architecture-workspace`:
                    setActiveTab(2)
                    break;
                default:
                    break;
            }
        }
    }, [location, projectId])

    return (
        <div className="project-board">
            {location.pathname.indexOf('preview') === -1 &&
                <div className='tab-board'>
                    <TabView 
                        activeIndex={activeTab} 
                        onTabChange={(e) => NavigateWorkspace(e.index)}
                    >
                        <TabPanel header="DESIGN" />
                        <TabPanel header="BACKEND" />
                        <TabPanel header="ARCHITECTURE" disabled/>
                    </TabView>
                    <Button
                        style={{
                            position: 'absolute',
                            top: 6,
                            right: 5
                        }}
                        raised
                        size="small"
                        onClick={() => navigate(`/app/project/${projectId}/preview`)}
                    >
                        <span>PREVIEW</span>
                    </Button>
                </div>
            }
            <WorkspaceContent />
            <InviteMembersDialog
                isOpenInviteModal={isOpenInviteModal}
                members={members}
                setMembers={setMembers}
                setIsOpenInvitationModal={setIsOpenInvitationModal}
                setIsOpenInviteModal={setIsOpenInviteModal}
            />
            <InvitationSentDialog
                isOpenInvitationModal={isOpenInvitationModal}
                setIsOpenInvitationModal={setIsOpenInvitationModal}
                members={members}
            />
        </div>
    )
}

export default Project;