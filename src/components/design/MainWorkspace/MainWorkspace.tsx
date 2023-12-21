import { type FC, useState, LegacyRef, CSSProperties } from 'react'
import { useMouse, useMove } from 'primereact/hooks';
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
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { INewlyInsertedElement, IView } from 'libs/types';
import { addSubViewToViewTree, setViewTree } from 'store/slices/viewTreeSlice';
import { IComponentType } from '../../../libs/types/index';
import './MainWorkspace.scss';

const MainWorkspace: FC<MainWorkspaceProps> = () => {
  const dispatch = useDispatch();
  const { ref: newItemRef, x, y, reset } = useMouse();
  const { ref: moveItemRef, x: moveX, y: moveY, active } = useMove('horizontal', { x: 0.2, y: 0.6 });
  const { viewTrees, currentElement, zoom, xMultiplier, yMultiplier } = useSelector((state: RootState) => state.viewTree);

  const [currentToolId, selectTool] = useState(0);
  const [isToolItemSelected, setToolItemSelected] = useState(false);
  const [isOpenAddScreenModal, setIsOpenAddScreenModal] = useState(false);
  const toolBarItems = ["Button", "Text", "Label", "Image"];

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

  const getMoveComponentStyle = (): CSSProperties => {
    const positionStyle: CSSProperties = {
      position: 'absolute',
      left: `${moveX * 100}px`,
      top: `${moveY * 100}px`,
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
    return currentToolId === 0 ? IComponentType.ButtonComponent :
      currentToolId === 1 ? IComponentType.TextComponent :
        currentToolId === 2 ? IComponentType.LabelComponent :
          IComponentType.ImageComponent;
  }

  const onAddComponent = (view: IView) => {
    dispatch(setViewTree(view))
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

  return (
    <div className="workspace-body">
      <div className="screen-view">
        <Button icon="pi pi-plus" raised text onClick={AddNewScreenBtnClick} />
        <Toolbar items={toolBarItems} onClicked={toolSelected} />
      </div>
      <div className="main-workspace">
        {viewTrees.map((view: IView, index) => (
          <div key={index}>
            <h2 style={{ textAlign: 'center', marginBottom: 5 }}>{view?.name}</h2>
            <div
              className="main-view"
              style={{ width: (xMultiplier + 16) * zoom, height: (yMultiplier + 16) * zoom }}
              ref={newItemRef as LegacyRef<HTMLDivElement>}
              onMouseLeave={reset}
              onMouseDown={() => onAddComponent(view)}
            >
              <Element item={view} />
              {/* {(isToolItemSelected && viewTree && viewTree.id === view.id) ? getCurrentComponent() : null} */}
            </div>
          </div>
        ))}
      </div>
      <div className="property">
        {getPropertyDialogForCurrentElement()}
      </div>
      {/* <div
        className="main-view"
        ref={moveItemRef as LegacyRef<HTMLDivElement>}
        style={{ width: (100 + 16) * zoom, height: (100 + 16) * zoom, border: 2,}}
      >
        <div 
          style={getMoveComponentStyle()}>
          <i className="pi pi-arrows-alt"></i>
        </div>
      </div> */}
      <AddScreenDialog
        isOpenAddScreenModal={isOpenAddScreenModal}
        setIsOpenAddScreenModal={setIsOpenAddScreenModal}
      />
    </div>
  )
}

export default MainWorkspace