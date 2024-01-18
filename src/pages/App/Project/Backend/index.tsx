import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from 'store';
import { ElementTree } from "components/backend";

const BackendWorkspace = () => {
    const { viewTrees } = useSelector((state: RootState) => state.viewTree)
    return (
        <div className="project-board">
            <ElementTree item = {viewTrees} />
        </div>
    )
}

export default BackendWorkspace;