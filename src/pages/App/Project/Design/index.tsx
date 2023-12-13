import * as React from 'react';
import { CascadeSelect } from "primereact/cascadeselect";
import { Button } from 'primereact/button';
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ViewBox from 'src/assets/components/app/ViewBox/ViewBox';
import { useSelector } from 'react-redux';
import type { RootState } from 'src/store';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from 'src/constants';

const DesignWorkspace = () => {
    const { structure } = useSelector((state: RootState) => state.project)
    const [zoom, setZoom] = React.useState(1);
    const [responsive, setResponsive] = React.useState('mobile');
    const [design, setDesign] = React.useState<any>(null);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [page, setPage] = React.useState<any>(null);

    const MainView = (mainView: any) => {
        if (mainView.content && mainView.content.length > 0) {
            if (mainView.content[0].horizontalView) {
                return (
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ width: '100%', height: 'calc(50% - 1px)' }}>{MainView(mainView.content[0].horizontalView)}</div>
                        <div style={{ width: '100%', height: 'calc(50% - 1px)' }}>{MainView(mainView.content[1].horizontalView)}</div>
                    </div>
                )
            } else if (mainView.content[0].verticalView) {
                return (
                    <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'space-between' }}>
                        <div style={{ width: 'calc(50% - 1px)', height: '100%' }}>{MainView(mainView.content[0].verticalView)}</div>
                        <div style={{ width: 'calc(50% - 1px)', height: '100%' }}>{MainView(mainView.content[1].verticalView)}</div>
                    </div>
                )
            } else {
                return (
                    <div style={{ width: '100%', height: '100%' }}>
                        {/* {mainView.content.map((con: any) => {
                            if (con.label) {
                                return <label>{con.label.text}</label>
                            } else if (con.button) {
                                return <button>{con.button.text}</button>
                            }
                        })} */}
                    </div>
                )
            }
        } else return <div style={{ width: '100%', height: '100%' }}><ViewBox /></div>
    }

    React.useEffect(() => {
        if (structure) {
            setDesign(structure.project.design)
        }
    }, [structure])

    React.useEffect(() => {
        if (page === null && design) {
            setPage(design.pages[pageIndex])
        }
    }, [design, page])

    const mainView = React.useMemo(() => {
        if (page) return MainView(page.defaultView);
        else return <></>
    }, [page])

    return (
        <div className="design-workspace ">
            <div className='workspace-header'>
                <div className='responsive-tool'>
                    <Button
                        icon="pi pi-desktop" text
                        raised={responsive === 'desktop'}
                        onClick={() => setResponsive('desktop')}
                    />
                    <Button
                        icon="pi pi-tablet" text
                        raised={responsive === 'tablet'}
                        onClick={() => setResponsive('tablet')}
                    />
                    <Button
                        icon="pi pi-mobile" text
                        raised={responsive === 'mobile'}
                        onClick={() => setResponsive('mobile')}
                    />
                </div>
                <div className='view-tool'>
                    <CascadeSelect
                        value={`${zoom * 100}%`}
                        onChange={(e) => {
                            setZoom(Number(e.value.substring(0, e.value.length - 1)) / 100);
                        }}
                        options={['50%', '75%', '100%', '125%', '150%']}
                        optionGroupChildren={[]}
                    />
                </div>
            </div>
            <div className="workspace-body">
                <div style={{ width: DEFAULT_WIDTH * zoom, height: DEFAULT_HEIGHT * zoom }} className="main-view">
                    <div className="element-tool"></div>
                    {mainView}
                </div>
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