import { type FC, useState, LegacyRef, CSSProperties } from 'react'
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { useMouse } from 'primereact/hooks';
import {
  SubScreen,
  Toolbar,
  LabelComponentDialog,
  TextComponentDialog,
  ButtonComponentDialog,
  ImageComponentDialog,
  AddScreenDialog,
  ButtonComponent,
  TextComponent,
  LabelComponent,
  ImageComponent,
  Wrapper,
} from 'components';
import { IElement, IComponentType } from 'libs/types';
import { initCurrentElement } from 'store/slices/viewTreeSlice';
import { setToolbarComponentSelected } from "store/slices/toolbarSlice";
import { MainWorkspaceProps } from './MainWorkspace.types';
import type { RootState } from 'store';
import './MainWorkspace.scss';

const MainWorkspace: FC<MainWorkspaceProps> = () => {
  const dispatch = useDispatch();
  const { ref: newItemRef, x, y, reset } = useMouse();
  const { viewTrees, currentElement } = useSelector((state: RootState) => state.viewTree);
  const { newToolSelected, ToolComponentID } = useSelector((state: RootState) => state.toolbar);

  const [isOpenAddScreenModal, setIsOpenAddScreenModal] = useState(false);
  const [mouseOut, setMouseOut] = useState(true);
  const toolBarItems = ["Button", "Text", "Label", "Image", "H-Wrapper", "V-Wrapper"];

  const toolSelected = (value: number) => {
    dispatch(setToolbarComponentSelected(value));
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

  const getCurrentComponent = () => {
    return (
      <div
        style={getDynamicComponentStyle()}
      >
        {getToolComponent()}
      </div>
    );
  }

  const getToolComponent = () => {
    switch (ToolComponentID) {
      case 0: return <ButtonComponent text="button"/>;
      case 1: return <TextComponent />;
      case 2: return <LabelComponent text="label" />;
      case 3: return <ImageComponent />;
      default: return <div/>;
    }
  }

  const getDynamicComponentStyle = (): CSSProperties => {
    const positionStyle: CSSProperties = {
      position: 'absolute',
      left: `${x}px`,
      top: `${y+50}px`,
      minHeight: 30,
      minWidth: 100,
      border: 1,
      opacity: 0.3
    }
    return positionStyle;
  };

  return (
    <div 
      ref={newItemRef as LegacyRef<HTMLDivElement>}
      className="workspace-body" 
      onClick={selectionCheck}
    >
      {newToolSelected && getCurrentComponent()}
      <div className="screen-view">
        <Button icon="pi pi-plus" raised text onClick={AddNewScreenBtnClick} />
        <Toolbar items={toolBarItems} onClicked={toolSelected} />
      </div>
      <div className="main-workspace">
        {viewTrees.map((view: IElement, index) => (
          <SubScreen 
            key={index}
            setMouseOut={setMouseOut}
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