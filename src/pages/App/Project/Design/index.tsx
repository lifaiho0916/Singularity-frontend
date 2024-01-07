import { DesignHeader } from 'components';
import MainWorkspace from 'components/design/MainWorkspace/MainWorkspace';

const DesignWorkspace = () => {
  return (
    <div className="design-workspace ">
      <DesignHeader/>
      <MainWorkspace />
    </div>
  )
}

export default DesignWorkspace;