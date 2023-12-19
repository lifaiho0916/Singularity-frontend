import { type FC, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useMouse } from 'primereact/hooks';

import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from "constants/";
import { setStructure } from 'store/slices/projectSlice';
import { MainWorkspaceProps } from './MainWorkspace.types';
import { 
  Toolbar, 
  ButtonComponent, 
  TextComponent, 
  LabelComponent,
  ImageComponent,
  Element,
  LabelComponentDialog, 
  TextComponentDialog,
  ButtonComponentDialog,
  ImageComponentDialog,
  AddScreenDialog,
  Wrapper,
  DesignHeader
} from 'components';
import { IStructure } from 'libs/types';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';

const MainWorkspace : FC<MainWorkspaceProps> = ({ root, zoom , page, setPage, pageIndex, setPageIndex, screens, structure }) => {  
  const [currentToolId, selectTool] = useState(0);
  const [isToolItemSelected, setToolItemSelected] = useState(false);
  const [isOpenAddScreenModal, setIsOpenAddScreenModal] = useState(false);
  const [newScreenName, setNewscreenName] = useState('');

  const toolSelected = (value: number) => {
    setToolItemSelected(true)
    selectTool(value)
  }

  const getCurrentComponent = () => {
    console.log(currentToolId, " item selected");
    switch (currentToolId) {
      case 0: return <ButtonComponent />
      case 1: return <TextComponent />
      case 2: return <LabelComponent />
      case 3: return <ImageComponent />
    }
  }

  const getCurrentPropertyDialog = () => {
    switch (currentToolId) {
      case 0: return <ButtonComponentDialog />
      case 1: return <TextComponentDialog />
      case 2: return <LabelComponentDialog />
      case 3: return <ImageComponentDialog />
    }
  }

  const AddNewScreenBtnClick = () => {
    setNewscreenName('')
    setIsOpenAddScreenModal(true);
  }


  return (
    <div className="workspace-body">
      <div className="screen-view">
        <h3>Screens</h3>
        <Divider className="custom-divider" />
        {screens.map((screen: any, index: number) => (
          <div className="screen" key={index}>
            <RadioButton inputId={`screen${index}`} value={screen.index} onChange={(e) => setPageIndex(Number(e.value))} checked={pageIndex === index} />
            <label htmlFor={`screen${index}`}>{screen.name}</label>
          </div>
        ))}
        <Divider className="custom-divider" />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button size='small' raised onClick={AddNewScreenBtnClick}>New Screen</Button>
        </div>
      </div>
      <Toolbar items={["Button", "Text", "Label", "Image"]} onClicked={toolSelected} />
      <div style={{ width: DEFAULT_WIDTH * zoom, height: DEFAULT_HEIGHT * zoom }} className="main-view">
        <Element item={root} />
        {isToolItemSelected && getCurrentComponent()}
      </div>
      {isToolItemSelected && getCurrentPropertyDialog()}
      <AddScreenDialog 
        isOpenAddScreenModal={isOpenAddScreenModal}
        setIsOpenAddScreenModal={setIsOpenAddScreenModal} 
        structure={structure} 
      />
    </div>
  )
}

export default MainWorkspace