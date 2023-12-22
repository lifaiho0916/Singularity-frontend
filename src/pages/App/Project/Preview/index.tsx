import { useState } from "react";
import { MainPreview, PreviewHeader } from "components/preview";

const Preview = () => {
    const [responsive, setResponsive] = useState('mobile');

    return (
        <div>
            <PreviewHeader
                responsive={responsive}
                setResponsive={setResponsive}
            />
            <MainPreview />
        </div>
    )
}

export default Preview;