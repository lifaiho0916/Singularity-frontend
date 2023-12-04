import "src/assets/styles/components/projectTemplate.scss";
interface templateProps {
    title: string
}

const ProjectTemplate = ({ title }: templateProps) => {
    return (
        <div className="project-template">
            <div className="template"></div>
            <div className="description">
                <h6>{title}</h6>
                <i className="pi pi-ellipsis-h" style={{ cursor: 'pointer', fontSize: 12 }}></i>
            </div>
        </div>
    )
}

export default ProjectTemplate;
