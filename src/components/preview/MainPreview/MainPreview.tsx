import { FC } from "react";
import { MainPreviewProps } from "./MainPreview.types";
import phoneImage from 'assets/images/phone.png';
import "./MainPreview.scss";

const MainPreview: FC<MainPreviewProps> = ({ }) => {
    return (
        // <div style={{backgroundImage: phoneImage, width: 368, height: 750}}>
        <div className="preview-screen">
            <img src={phoneImage} alt="Phone" width={368} height={750} />
        </div>
    )
}

export default MainPreview