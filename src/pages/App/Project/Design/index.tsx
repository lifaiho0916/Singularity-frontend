import { useState, useEffect, useMemo } from 'react';
import { DesignHeader } from 'components';
import MainWorkspace from 'components/design/MainWorkspace/MainWorkspace';
// import { useSelector } from 'react-redux';
// import type { RootState } from 'store';

const DesignWorkspace = () => {
  // const { structure } = useSelector((state: RootState) => state.project)
  const [zoom, setZoom] = useState(1);
  const [responsive, setResponsive] = useState('mobile');
  const [design, setDesign] = useState<any>(null);

  return (
    <div className="design-workspace ">
      <DesignHeader
        responsive={responsive}
        setResponsive={setResponsive}
        zoom={zoom}
        setZoom={setZoom}
      />
      <MainWorkspace zoom={zoom} />
    </div>
  )
}

export default DesignWorkspace;