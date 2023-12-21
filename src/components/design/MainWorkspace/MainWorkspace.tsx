import { type FC, useState, LegacyRef, CSSProperties } from 'react'
import { Button } from 'primereact/button';
import { useMouse, useMove } from 'primereact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  SubScreen,
  Toolbar,
  Element,
  ButtonComponent,
  TextComponent,
  LabelComponent,
  ImageComponent,
  LabelComponentDialog,
  TextComponentDialog,
  ButtonComponentDialog,
  ImageComponentDialog,
  AddScreenDialog,
} from 'components';
import { INewlyInsertedElement, IView, IComponentType } from 'libs/types';
import { addSubViewToViewTree, setViewTree, initCurrentElement } from 'store/slices/viewTreeSlice';
import { MainWorkspaceProps } from './MainWorkspace.types';
import type { RootState } from 'store';

import './MainWorkspace.scss';

const MainWorkspace: FC<MainWorkspaceProps> = () => {
  const dispatch = useDispatch();
  const { ref: newItemRef, x, y, reset } = useMouse();
  const { viewTrees, currentElement, zoom, xMultiplier, yMultiplier } = useSelector((state: RootState) => state.viewTree);

  const [currentToolId, selectTool] = useState(0);
  const [isToolItemSelected, setToolItemSelected] = useState(false);
  const [isOpenAddScreenModal, setIsOpenAddScreenModal] = useState(false);
  const [mouseOut, setMouseOut] = useState(true);
  const toolBarItems = ["Button", "Text", "Label", "Image"];

  const toolSelected = (value: number) => {
    setToolItemSelected(true)
    selectTool(value)
  }

  const getToolComponent = () => {
    switch (currentToolId) {
      case 0: return <ButtonComponent />;
      case 1: return <TextComponent />;
      case 2: return <LabelComponent />;
      case 3: return <ImageComponent />;
      default: return null;
    }
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
    mouseOut && currentElement!=null && dispatch(initCurrentElement(viewTrees));
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
            isToolItemSelected={isToolItemSelected}
            setToolItemSelected={setToolItemSelected}
            setMouseOut={setMouseOut}
            currentToolId={currentToolId}
            view={view} 
          />
        ))}
      </div>
      <div className="property">
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