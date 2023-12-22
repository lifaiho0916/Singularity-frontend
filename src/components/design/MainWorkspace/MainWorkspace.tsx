import { type FC, useState } from 'react'
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import {
  SubScreen,
  Toolbar,
  LabelComponentDialog,
  TextComponentDialog,
  ButtonComponentDialog,
  ImageComponentDialog,
  AddScreenDialog,
} from 'components';
import { IView, IComponentType } from 'libs/types';
import { initCurrentElement } from 'store/slices/projectSlice';
import { MainWorkspaceProps } from './MainWorkspace.types';
import type { RootState } from 'store';
import './MainWorkspace.scss';

const MainWorkspace: FC<MainWorkspaceProps> = () => {
  const dispatch = useDispatch();
  const { viewTrees, currentElement } = useSelector((state: RootState) => state.project);

  const [currentToolId, selectTool] = useState(0);
  const [isToolItemSelected, setToolItemSelected] = useState(false);
  const [isOpenAddScreenModal, setIsOpenAddScreenModal] = useState(false);
  const [mouseOut, setMouseOut] = useState(true);
  const toolBarItems = ["Button", "Text", "Label", "Image"];

  const toolSelected = (value: number) => {
    setToolItemSelected(true)
    selectTool(value)
  }

  const getPropertyDialogForCurrentElement = () => {
    if (!currentElement) return;
    switch (currentElement.type) {
      case IComponentType.ButtonComponent: return <ButtonComponentDialog />
      case IComponentType.TextComponent: return <TextComponentDialog />
      case IComponentType.LabelComponent: return <LabelComponentDialog />
      case IComponentType.ImageComponent: return <ImageComponentDialog />
    }
  }

  const AddNewScreenBtnClick = () => {
    setIsOpenAddScreenModal(true);
  }

  const selectionCheck = () => {
    mouseOut && currentElement != null && dispatch(initCurrentElement(viewTrees));
  }

  return (
    <div className="workspace-body" onClick={selectionCheck}>
      <div className="screen-view">
        <Button icon="pi pi-plus" raised text onClick={AddNewScreenBtnClick} />
        <Toolbar items={toolBarItems} onClicked={toolSelected} />
      </div>
      <div className="main-workspace">
        {viewTrees.map((view: IView, index) => (
          <SubScreen 
            key={index}
            isToolItemSelected={isToolItemSelected}
            setToolItemSelected={setToolItemSelected}
            setMouseOut={setMouseOut}
            currentToolId={currentToolId}
            view={view}
          />
        ))}
      </div>
      <div 
        className="property"
        onMouseEnter={()=>setMouseOut(false)}
        onMouseLeave={()=>setMouseOut(true)}
      >
        {getPropertyDialogForCurrentElement()}
      </div>
      <AddScreenDialog
        isOpenAddScreenModal={isOpenAddScreenModal}
        setIsOpenAddScreenModal={setIsOpenAddScreenModal}
      />
    </div>
  )
}

export default MainWorkspace