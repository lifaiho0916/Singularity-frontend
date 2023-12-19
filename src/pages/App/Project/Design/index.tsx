import { useState, useEffect, useMemo } from 'react';
import { CascadeSelect } from "primereact/cascadeselect";
import { Button } from 'primereact/button';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MainWorkSpace } from 'components';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { IElement, IComponentType } from 'libs/types';
import { v4 as uuidv4 } from 'uuid'

const DesignWorkspace = () => {
  const { structure } = useSelector((state: RootState) => state.project)
  const [zoom, setZoom] = useState(1);
  const [responsive, setResponsive] = useState('mobile');
  const [design, setDesign] = useState<any>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [page, setPage] = useState<any>(null);
  const rootElement: IElement = {
    id: uuidv4(),
    parent: '',
    name: 'root',
    style: { backgroundColor: 'lightgray', color: 'white' },
    child: [],
    type: IComponentType.Wrapper,
    action: () => {
      console.log('Button clicked!');
    }, // Added closing parenthesis and semicolon
  };
  const allElements: Array<IElement> = [rootElement]

  

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
      <MainWorkSpace 
        root={rootElement}
        zoom={zoom}
      />
    </div>
  )
}

export default DesignWorkspace;