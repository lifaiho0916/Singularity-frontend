import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from 'store';
import { ElementTree } from "components/backend";

const BackendWorkspace = () => {
    const { viewTrees } = useSelector((state: RootState) => state.viewTree)
    return (
        <div className="project-board">
            {viewTrees.map((view)=>(
                <ElementTree key={view.id} item = {view} />
            ))}
        </div>
    )
}

export default BackendWorkspace;