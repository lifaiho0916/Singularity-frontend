import { useState, useEffect, useMemo } from 'react';
import { CascadeSelect } from "primereact/cascadeselect";
import { Button } from 'primereact/button';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ViewBox, Toolbar, ButtonComponent, TextComponent, LabelComponent, ImageComponent } from 'components';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from "constants/";

const DesignWorkspace = () => {
  const { structure } = useSelector((state: RootState) => state.project)
  const [ zoom, setZoom ] = useState(1);
  const [ responsive, setResponsive ] = useState('mobile');
  const [ design, setDesign ] = useState<any>(null);
  const [ pageIndex, setPageIndex ] = useState(0);
  const [ page, setPage ] = useState<any>(null);
  const [ currentToolId, selectTool ] = useState(0);
  const [ isToolItemSelected, setToolItemSelected ] = useState(false);

  const toolSelected = (value: number) => {
    console.log(`Toolbar Item ${value} selected`)
    setToolItemSelected(true)
    selectTool(value)
  }

  useEffect(() => {
    if (structure) {
      setDesign(structure.project.design)
    }
  }, [structure])

  useEffect(() => {
    if (page === null && design) {
      setPage(design.pages[pageIndex])
    }
  }, [design, page])

  const getCurrentComponent = () => {
    switch(currentToolId)
    {
      case 0: return <ButtonComponent />
      case 1: return <TextComponent />
      case 2: return <LabelComponent />
      case 3: return <ImageComponent />
    }
  }

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
              <Toolbar items={["Button","Text","Label","Image"]} onClicked={toolSelected}/>
              <div style={{ width: DEFAULT_WIDTH * zoom, height: DEFAULT_HEIGHT * zoom }} className="main-view">
                {isToolItemSelected && getCurrentComponent() }
              </div>
          </div>
      </div>
  )
}

export default DesignWorkspace;