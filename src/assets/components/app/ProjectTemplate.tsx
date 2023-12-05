import "src/assets/styles/components/projectTemplate.scss";
interface templateProps {
    title: string,
    createProject: () => void
}

const ProjectTemplate = ({ title, createProject }: templateProps) => {
    return (
        <div className="project-template" onClick={createProject}>
            <div className="template"></div>
            <div className="description">
                <h6>{title}</h6>
                <i className="pi pi-ellipsis-h" style={{ cursor: 'pointer', fontSize: 12 }}></i>
            </div>
        </div>
    )
}

export default ProjectTemplate;
