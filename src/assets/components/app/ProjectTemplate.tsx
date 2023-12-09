import "src/assets/styles/components/projectTemplate.scss";
import type { ITemplate } from "src/libs/types";
interface templateProps {
    template: ITemplate,
    createProject: () => void
}

const ProjectTemplate = ({ template, createProject }: templateProps) => {
    return (
        <div className="project-template" onClick={createProject}>
            <div className="template"></div>
            <div className="description">
                <h6>{template.name}</h6>
                <i className="pi pi-ellipsis-h" style={{ cursor: 'pointer', fontSize: 12 }}></i>
            </div>
        </div>
    )
}

export default ProjectTemplate;
