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
} from 'components';
import { IElement, IComponentType } from 'libs/types';
import { initCurrentElement } from 'store/slices/viewTreeSlice';
import { setToolbarComponentSelected, unselectToolBarComponent } from "store/slices/toolbarSlice";
import { MainWorkspaceProps } from './MainWorkspace.types';
import type { RootState } from 'store';
import './MainWorkspace.scss';

const MainWorkspace: FC<MainWorkspaceProps> = () => {
  const dispatch = useDispatch();
  const { ref: newItemRef, x, y, reset } = useMouse();
  const { viewTrees, currentElement } = useSelector((state: RootState) => state.viewTree);
  const { toolbarDragFlagOn, newToolSelected, ToolComponentID } = useSelector((state: RootState) => state.toolbar);

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
        className='draggable'
        style={getDynamicComponentStyle()}
      >
        {getToolComponent()}
      </div>
    );
  }

  const getToolComponent = () => {
    switch (ToolComponentID) {
      case 0: return <ButtonComponent text="button" type={'contained'} color={'primary'} size={'medium'} />;
      case 1: return <TextComponent />;
      case 2: return <LabelComponent text="label" />;
      case 3: return <ImageComponent />;
      default: return <LabelComponent text=""/>;
    }
  }

  const getDynamicComponentStyle = (): CSSProperties => {
    let positionStyle: CSSProperties = {
      position: 'absolute',
      left: `${x}px`,
      top: `${y + 100}px`,
      minHeight: 30,
      minWidth: 100,
      border: 1,
      zIndex: 1,
      opacity: 0.7,
    }
    if(ToolComponentID === 4 || ToolComponentID === 5) positionStyle =  {
      ...positionStyle,
      backgroundColor: "gray"
    }
    return positionStyle;
  };

  return (
    <div
      ref={newItemRef as LegacyRef<HTMLDivElement>}
      className={`workspace-body ${newToolSelected || toolbarDragFlagOn?'draggable':''}`}
      onClick={selectionCheck}
      onMouseUp={()=>{dispatch(unselectToolBarComponent())}}
    >
      <div className="screen-view">
        <Button icon="pi pi-plus" raised text onClick={AddNewScreenBtnClick} />
        <Toolbar items={toolBarItems} onClicked={toolSelected} />
      </div>
      {newToolSelected && getCurrentComponent()}
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
        onMouseEnter={() => setMouseOut(false)}
        onMouseLeave={() => setMouseOut(true)}
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