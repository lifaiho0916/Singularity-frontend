import { type FC, useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import type { RootState } from 'store';
import { MainPreviewProps } from "./MainPreview.types";
import { PreviewScreen } from "../PreviewScreen";
import { CascadeSelect } from "primereact/cascadeselect";
import { DEVICES } from "constants/";
import { setMultiplayerSize } from "store/slices/projectSlice";
import "./MainPreview.scss";

const MainPreview: FC<MainPreviewProps> = ({ }) => {
    const dispatch = useDispatch();
    const { viewTrees, xMultiplier, yMultiplier, previewIndex } = useSelector((state: RootState) => state.project);
    const [deviceIndex, setDeviceIndex] = useState(0);

    useEffect(() => {
        if (DEVICES.length) {
            const index = DEVICES.findIndex((device: any) => device.width === xMultiplier && device.height === yMultiplier)
            setDeviceIndex(index === -1 ? 0 : index);
            if (index === -1) {
                dispatch(setMultiplayerSize({ width: DEVICES[0].width, height: DEVICES[0].height }))
            }
        }
    }, [DEVICES])

    return (
        <div className="main-preview">
            <div className="device-type">
                <h2>Preview</h2>
                <CascadeSelect
                    value={DEVICES[deviceIndex].name}
                    options={DEVICES.map((device: any) => device.name)}
                    optionGroupChildren={[]}
                    onChange={(e) => {
                        const index = DEVICES.findIndex((device: any) => device.name === e.value)
                        setDeviceIndex(index);
                        dispatch(setMultiplayerSize({ width: DEVICES[index].width, height: DEVICES[index].height }))
                    }}
                    className='input-text'
                />
            </div>
            {viewTrees.length > 0 &&
                <PreviewScreen
                    view={viewTrees[previewIndex]}
                />
            }
        </div>
    )
}

export default MainPreview