import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { PreviewHeaderProps } from "./PreviewHeader.types";
import { setPreviewIndex } from "store/slices/projectSlice";
import "./PreviewHeader.scss";

const PreviewHeader: FC<PreviewHeaderProps> = ({
    responsive,
    setResponsive,
}) => {
    const dispatch = useDispatch();
    const [showDevice, setShowDevice] = useState(false);

    useEffect(() => {
        dispatch(setPreviewIndex(0))
    }, [])

    return (
        <div className="preview-header">
            <div className="action-buttons"></div>
            <div className="resposive-view">
                {/* <Button
                    icon="pi pi-desktop" text
                    style={{ margin: '0px 5px' }}
                    raised={responsive === 'desktop'}
                    onClick={() => setResponsive('desktop')}
                />
                <Button
                    icon="pi pi-tablet" text
                    style={{ margin: '0px 5px' }}
                    raised={responsive === 'tablet'}
                    onClick={() => setResponsive('tablet')}
                />
                <Button
                    icon="pi pi-mobile" text
                    style={{ margin: '0px 5px' }}
                    raised={responsive === 'mobile'}
                    onClick={() => setResponsive('mobile')}
                /> */}
            </div>
            <div className="show-device">
                <label htmlFor="device">Show Device</label>
                <Checkbox
                    inputId="device"
                    onChange={() => setShowDevice(!showDevice)}
                    checked={showDevice}
                />
            </div>
        </div>
    )
}

export default PreviewHeader