import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate, Routes, Route } from 'react-router-dom';
import { getProjectById, setOpenAtById, getProjectImage } from 'libs/axios/api/project';
import { initCurrentElement, setProject, setStructure } from 'store/slices/projectSlice';
import { InviteMembersDialog } from 'components/dialog/InviteMembersDialog';
import { InvitationSentDialog } from 'components/dialog/InvitationSentDialog';
import type { IMember, IProject } from 'libs/types';
import type { RootState } from 'store';
import { saveDataInIndexDB } from 'libs/indexedDB';

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
    const dispatch = useDispatch();
    const [isOpenInviteModal, setIsOpenInviteModal] = React.useState(false);
    const [isOpenInvitationModal, setIsOpenInvitationModal] = React.useState(false);
    const [members, setMembers] = React.useState<IMember[]>([]);
    const { project } = useSelector((state: RootState) => state.project);

    const GetProjectById = async (projectId: number) => {
        const res = await getProjectById(projectId);
        if (res) {
            dispatch(setProject(res as IProject));
        }
    }

    const GetProjectImages = async (projectId: number) => {
        const res = await getProjectImage(projectId)
        if (res) {
            saveDataInIndexDB(res)
        }
    }

    React.useEffect(() => {
        if (projectId) {
            dispatch(initCurrentElement(null));
            GetProjectById(Number(projectId));
            setOpenAtById(Number(projectId));
            GetProjectImages(Number(projectId));
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

    return (
        <div className="project-board">
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