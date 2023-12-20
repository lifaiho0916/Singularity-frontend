import { type FC, useState, LegacyRef, CSSProperties, useEffect } from 'react'
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
import { addSubViewToViewTree, setViewTree, setViewTrees } from 'store/slices/viewTreeSlice';
import { IComponentType } from '../../../libs/types/index';
import { Image } from 'primereact/image';

const MainWorkspace: FC<MainWorkspaceProps> = ({ zoom }) => {
  const [viewIndex, setViewIndex] = useState(0)
  const { ref, x, y, reset } = useMouse();
  const { viewTrees, viewTree, currentElement } = useSelector((state: RootState) => state.viewTree);

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
    const item = getCurrentComponentType();
    if (isToolItemSelected) {
      {
        const newElement: INewlyInsertedElement = {
          x: x,
          y: y,
          type: item,
          width: 100,
          height: 30,
          details: {
            text: item === IComponentType.ButtonComponent ? 'Button' :
              item === IComponentType.LabelComponent ? 'Label' :
                item === IComponentType.TextComponent ? 'Text' :
                  'Image',
            style: {
              fontSize: 20
            }
          }
        }
        console.log("Dispatching Payload: ", newElement);
        dispatch(addSubViewToViewTree(newElement));
        setToolItemSelected(false);
      }
    }
  }

  useEffect(() => {
    if (viewTrees.length) {
      dispatch(setViewTree(viewTrees[viewIndex]))
    }
  }, [viewTrees, viewIndex])

  return (
    <div className="workspace-body">
      <div className="screen-view">
        <h3>Screens</h3>
        <Divider className="custom-divider" />
        {viewTrees.map((screen: any, index: number) => (
          <div className="screen" key={index}>
            <RadioButton inputId={`screen${index}`} value={index} onChange={(e) => {
              const updatedViewTrees = [...viewTrees]
              updatedViewTrees[viewIndex] = viewTree as IView
              dispatch(setViewTrees(updatedViewTrees))
              setViewIndex(Number(e.value))
            }} checked={viewIndex === index} />
            <label htmlFor={`screen${index}`}>Screen {index + 1}</label>
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
        {viewTree ? <Element item={viewTree} /> : null}
        {isToolItemSelected && getCurrentComponent()}
      </div>
      {getPropertyDialogForCurrentElement()}
      <AddScreenDialog
        isOpenAddScreenModal={isOpenAddScreenModal}
        setIsOpenAddScreenModal={setIsOpenAddScreenModal}
      />
    </div>
  )
}

export default MainWorkspace