import { FC, useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { PreviewHeaderProps } from "./PreviewHeader.types";
import "./PreviewHeader.scss";

const PreviewHeader: FC<PreviewHeaderProps> = ({
    responsive,
    setResponsive,
}) => {
    const [showDevice, setShowDevice] = useState(false);

    return (
        <div className="preview-header">
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
            <div className="action-buttons"></div>
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