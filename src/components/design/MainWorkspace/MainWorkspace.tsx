import { type FC, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useMouse } from 'primereact/hooks';

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
} from 'components';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';

const MainWorkspace : FC<MainWorkspaceProps> = ({ root, zoom , pageIndex, setPageIndex, screens, structure }) => {  
  const [currentToolId, selectTool] = useState(0);
  const [isToolItemSelected, setToolItemSelected] = useState(false);
  const [isOpenAddScreenModal, setIsOpenAddScreenModal] = useState(false);

  const toolSelected = (value: number) => {
    setToolItemSelected(true)
    selectTool(value)
  }

  // const getCurrentComponent = () => {
  //   console.log(currentToolId, " item selected");
  //   switch (currentToolId) {
  //     case 0: return <ButtonComponent />
  //     case 1: return <TextComponent />
  //     case 2: return <LabelComponent />
  //     case 3: return <ImageComponent />
  //   }
  // }

  const getCurrentPropertyDialog = () => {
    switch (currentToolId) {
      case 0: return <ButtonComponentDialog />
      case 1: return <TextComponentDialog />
      case 2: return <LabelComponentDialog />
      case 3: return <ImageComponentDialog />
    }
  }

  const AddNewScreenBtnClick = () => {
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
      <div style={{ width: (320 + 16) * zoom, height: (650 + 16) * zoom }} className="main-view">
        <Element item={viewTree} />
      </div>
      {isToolItemSelected && getCurrentPropertyDialog()}
      <AddScreenDialog
        isOpenAddScreenModal={isOpenAddScreenModal}
        setIsOpenAddScreenModal={setIsOpenAddScreenModal}
      />
    </div>
  )
}

export default MainWorkspace