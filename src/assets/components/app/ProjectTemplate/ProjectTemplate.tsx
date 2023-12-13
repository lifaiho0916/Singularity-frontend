import { type FC } from 'react'
import { ProjectTemplateProps } from './ProjectTemplate.types'
import "./ProjectTemplate.scss";

const ProjectTemplate:FC<ProjectTemplateProps> = ({ template, createProject }) => {
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
