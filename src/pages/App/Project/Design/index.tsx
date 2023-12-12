import { CascadeSelect } from "primereact/cascadeselect";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const DesignWorkspace = () => {
    return (
        <div className="design-workspace ">
            <div className='workspace-header'>
                <div className='responsive-tool'>

                </div>
                <div className='view-tool'>
                    <CascadeSelect
                        value={'100%'}
                        onChange={(e) => {
                            // const updatedMembers = [...members];
                            // updatedMembers[index].position = e.value;
                            // setMembers(updatedMembers);
                        }}
                        options={['50%', '75%', '100%', '125%', '150%']}
                        optionGroupChildren={[]}
                    />
                </div>
            </div>
            <div>
                {/* <TransformWrapper
                    initialScale={1}
                >
                    <TransformComponent
                        wrapperStyle={{ height: '100vh', width: '100vw' }}
                    >
                        <h1>Element</h1>
                    </TransformComponent>
                </TransformWrapper> */}
            </div>
        </div>
    )
}

export default DesignWorkspace;