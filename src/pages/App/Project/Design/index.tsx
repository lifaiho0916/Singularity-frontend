import { useState, useEffect, useMemo } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MainWorkSpace, DesignHeader } from 'components';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { IElement, IComponentType } from 'libs/types';
import { v4 as uuidv4 } from 'uuid'

const DesignWorkspace = () => {
  const [zoom, setZoom] = useState(1);
  const [responsive, setResponsive] = useState('mobile');
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
  
  // const { structure } = useSelector((state: RootState) => state.project)
  // const [design, setDesign] = useState<any>(null);
  // const [pageIndex, setPageIndex] = useState(0);
  // const [page, setPage] = useState<any>(null);

  // useEffect(() => {
  //   if (structure) {
  //     setDesign(structure.project.design)
  //   }
  // }, [structure])

  // useEffect(() => {
  //   if (page === null && design) {
  //     setPage(design.pages[pageIndex])
  //   }
  // }, [design, page])

  return (
    <div className="design-workspace ">
      <DesignHeader 
        responsive={responsive}
        setResponsive={setResponsive}
        zoom={zoom}
        setZoom={setZoom}
      />
      <MainWorkSpace root={rootElement} zoom={zoom} />
    </div>
  )
}

export default DesignWorkspace;