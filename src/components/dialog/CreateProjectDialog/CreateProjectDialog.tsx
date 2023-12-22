import { useState, type FC } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "store";
import type { IProject } from "libs/types";
import { createProject } from "libs/axios/api/project";
import { CreateProjectDialogProps } from "./CreateProjectDialog.types";

const CreateProjectDialog: FC<CreateProjectDialogProps> = ({
    isOpenProjectModal,
    setIsOpenProjectModal
}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = useSelector((state: RootState) => state.auth);
    const { template } = useSelector((state: RootState) => state.template);

    const CreateNewProject = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const projectData = {
            name: event.currentTarget["projectName"].value,
            creator: currentUser,
            templateId: template?.id
        }
        const res = await createProject(projectData) as IProject;
        if (res) {
            setIsOpenProjectModal(false);
            navigate(`/app/project/${res.id}`)
        }
        setIsLoading(false);
    }

    return (
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
    )
}

export default CreateProjectDialog