import { type FC, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useMouse } from 'primereact/hooks';

import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from "constants/";
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
  Wrapper
} from 'components';

const MainWorkspace : FC<MainWorkspaceProps> = ({ root, zoom }) => {  
  const [currentToolId, selectTool] = useState(0);
  const [isToolItemSelected, setToolItemSelected] = useState(false);
  
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

  return (
    <div className="workspace-body">
      <Toolbar items={["Button", "Text", "Label", "Image"]} onClicked={toolSelected} />
      <div style={{ width: DEFAULT_WIDTH * zoom, height: DEFAULT_HEIGHT * zoom }} className="main-view">
        <Element item={root} />
        {isToolItemSelected && getCurrentComponent()}
      </div>
      <LabelComponentDialog />
      <TextComponentDialog />
      <ButtonComponentDialog />
      <ImageComponentDialog />
  </div>
  )
}

export default MainWorkspace