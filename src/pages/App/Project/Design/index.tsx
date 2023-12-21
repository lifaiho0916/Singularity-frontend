import { useState } from 'react';
import { DesignHeader } from 'components';
import MainWorkspace from 'components/design/MainWorkspace/MainWorkspace';

const DesignWorkspace = () => {
  const [responsive, setResponsive] = useState('mobile');

  return (
    <div className="design-workspace ">
      <DesignHeader
        responsive={responsive}
        setResponsive={setResponsive}
      />
      <MainWorkspace />
    </div>
  )
}

export default DesignWorkspace;