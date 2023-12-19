import { useState, useEffect, useMemo } from 'react';
import { CascadeSelect } from "primereact/cascadeselect";
import { Button } from 'primereact/button';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MainWorkSpace, DesignHeader } from 'components';
import { useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Divider } from 'primereact/divider';
import type { RootState } from 'store';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from "constants/";
import { IElement, IComponentType, IStructure } from 'libs/types';
import { v4 as uuidv4 } from 'uuid'
import MainWorkspace from '../../../../components/design/MainWorkspace/MainWorkspace';

const DesignWorkspace = () => {
  const { structure } = useSelector((state: RootState) => state.project)
  const [zoom, setZoom] = useState(1);
  const [responsive, setResponsive] = useState('mobile');
  const [design, setDesign] = useState<any>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [page, setPage] = useState<any>(null);
  const [currentToolId, selectTool] = useState(0);
  const [isToolItemSelected, setToolItemSelected] = useState(false);

  const rootElement: IElement = {
    id: uuidv4(),
    parent: '',
    name: 'root',
    style: { backgroundColor: 'lightgray', color: 'white' },
    child: [],
    type: IComponentType.Wrapper,
    action: () => {
      console.log('Button clicked!');
    },
  };
  const allElements: Array<IElement> = [rootElement]

  useEffect(() => {
    if (page === null && design) {
      setPage(design.pages[pageIndex])
    }
  }, [design, page])

  const screens = useMemo(() => {
    if (design) {
      return design.pages.map((pg: any, index: number) => (
        {
          index: index,
          name: pg.name
        }
      ))
    } else {
      return []
    }
  }, [design])

  return (
    <div className="design-workspace ">
      <DesignHeader 
        responsive={responsive} 
        setResponsive={setResponsive}
        zoom={zoom}
        setZoom={setZoom}
      />
      <MainWorkspace 
        root={rootElement}
        zoom={zoom}
        screens={screens}
        structure={structure} 
        pageIndex={pageIndex} 
        setPageIndex={setPageIndex}
      />
    </div>
  )
}

export default DesignWorkspace;