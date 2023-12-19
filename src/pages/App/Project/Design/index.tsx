import { useState, useEffect, useMemo } from 'react';
import { DesignHeader } from 'components';
import MainWorkspace from 'components/design/MainWorkspace/MainWorkspace';
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