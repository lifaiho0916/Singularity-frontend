import { type FC } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "store";
import { PreviewScreenProps } from "./PreviewScreen.types";
import { Element } from "components/design";
import "./PreviewScreen.scss";

const PreviewScreen: FC<PreviewScreenProps> = ({ view }) => {
    const { xMultiplier, yMultiplier } = useSelector((state: RootState) => state.viewTree);

    return (
        <div className="preview-screen" style={{ width: xMultiplier * 0.8, height: yMultiplier * 0.8 }}>
            <div className="main-screen">
                <Element item={view} preview={true} />
            </div>
        </div>
    )
}

export default PreviewScreen;