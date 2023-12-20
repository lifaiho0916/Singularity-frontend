import { type FC, useState, LegacyRef, CSSProperties } from 'react'
import { useMouse } from 'primereact/hooks';
import { useDispatch } from 'react-redux';
import { MainWorkspaceProps } from './MainWorkspace.types';
import {
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
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { INewlyInsertedElement, IView } from 'libs/types'; 
import { addSubViewToViewTree } from 'store/slices/viewTreeSlice';
import { IComponentType } from '../../../libs/types/index';
import { Image } from 'primereact/image';

const MainWorkspace : FC<MainWorkspaceProps> = ({ zoom , pageIndex, setPageIndex, screens }) => {  
  const { ref, x, y, reset } = useMouse();
  const { viewTree, currentElement } = useSelector((state: RootState) => state.viewTree);

  const [currentToolId, selectTool] = useState(0);
  const [isToolItemSelected, setToolItemSelected] = useState(false);
  const [isOpenAddScreenModal, setIsOpenAddScreenModal] = useState(false);
  const dispatch = useDispatch();

  const toolSelected = (value: number) => {
    setToolItemSelected(true)
    selectTool(value)
  }

  const getCurrentComponent = () => {
    return (
      <div
        style={getDynamicComponentStyle()}
        onMouseLeave={reset}
      >
        {getToolComponent()}
      </div>
    );
  }

  const getDynamicComponentStyle = (): CSSProperties => {
    const positionStyle: CSSProperties = {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      opacity: 0.3
    };

    return positionStyle;
  };

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

  const getCurrentComponentType = () => {
    return currentToolId == 0 ? IComponentType.ButtonComponent : 
      currentToolId == 1 ? IComponentType.TextComponent :
      currentToolId == 2 ? IComponentType.LabelComponent :
      IComponentType.ImageComponent;
  }

  const onAddComponent = () => {
    if(isToolItemSelected) {
      {
        const newElement : INewlyInsertedElement = {
          x: x,
          y: y,
          type: getCurrentComponentType(),
          width: 100,
          height: 30,
          details: {
            text: 'This is Button'
          }
        }
        console.log("Dispatching Payload: ", newElement);
        dispatch(addSubViewToViewTree(newElement));
        setToolItemSelected(false);
      }
    }
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
      <div 
        style={{ width: (480 + 16) * zoom, height: (850 + 16) * zoom }} 
        className="main-view"
        ref={ref as LegacyRef<HTMLDivElement>}
        onMouseLeave={reset}
        onMouseDown={onAddComponent}
      >
        <Element item={viewTree} />
        {isToolItemSelected && getCurrentComponent()}
      </div>
      { getPropertyDialogForCurrentElement()}
      <AddScreenDialog
        isOpenAddScreenModal={isOpenAddScreenModal}
        setIsOpenAddScreenModal={setIsOpenAddScreenModal}
      />
    </div>
  )
}

export default MainWorkspace