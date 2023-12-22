import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { PreviewHeaderProps } from "./PreviewHeader.types";
import { setPreviewIndex } from "store/slices/projectSlice";
import "./PreviewHeader.scss";

const PreviewHeader: FC<PreviewHeaderProps> = ({
    responsive,
    setResponsive,
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const [showDevice, setShowDevice] = useState(false);

    useEffect(() => {
        dispatch(setPreviewIndex(0))
    }, [])

    return (
        <div className="preview-header">
            <div className="show-device">
                <label htmlFor="device">Show Device</label>
                <Checkbox
                    inputId="device"
                    onChange={() => setShowDevice(!showDevice)}
                    checked={showDevice}
                />
            </div>
            <div className="resposive-view">
                <Button
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
                />
            </div>
            <div className="action-buttons">
                <Button
                    size="small"
                    raised
                    onClick={() => navigate(`/app/project/${projectId}`)}
                >
                    <span>BACK TO EDITOR</span>
                </Button>
                <Button
                    style={{ marginLeft: 5 }}
                    size="small"
                    raised
                >
                    <span>DEPLOY</span>
                </Button>
            </div>
        </div>
    )
}

export default PreviewHeader