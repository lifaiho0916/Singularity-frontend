import { type FC, useState, LegacyRef } from 'react'
import { useMouse } from 'primereact/hooks';
import { useDispatch } from 'react-redux';
import { MainWorkspaceProps } from './MainWorkspace.types';
import {
  Toolbar,
  Element,
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

interface ViewPartProps {
  view: IView,
  currentToolId: number,
  isToolItemSelected: boolean,
  setToolItemSelected: (arg: boolean) => void
}

const ViewPart: FC<ViewPartProps> = ({ view, currentToolId, isToolItemSelected, setToolItemSelected }) => {
  const { ref: newItemRef, x, y, reset } = useMouse();
  const dispatch = useDispatch()

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
    <div
      className="main-view"
      ref={newItemRef as LegacyRef<HTMLDivElement>}
      onMouseLeave={reset}
      onMouseDown={() => onAddComponent(view)}
    >
      <Element item={view} />
    </div>
  )
}

const MainWorkspace: FC<MainWorkspaceProps> = () => {
  const { viewTrees, currentElement, zoom, xMultiplier, yMultiplier } = useSelector((state: RootState) => state.viewTree);

  const [currentToolId, selectTool] = useState(0);
  const [isToolItemSelected, setToolItemSelected] = useState(false);
  const [isOpenAddScreenModal, setIsOpenAddScreenModal] = useState(false);
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

  return (
    <div className="workspace-body">
      <div className="screen-view">
        <Button icon="pi pi-plus" raised text onClick={AddNewScreenBtnClick} />
        <Toolbar items={toolBarItems} onClicked={toolSelected} />
      </div>
      <div className="main-workspace">
        {viewTrees.map((view: IView, index) => (
          <div
            key={index}
            className="view-section"
            style={{ width: (xMultiplier + 16) * zoom, height: (yMultiplier + 16) * zoom }}
          >
            <div className="view-header">
              <h4 className="view-name">{view?.name}</h4>
              <Button
                onClick={() => { }}
                icon="pi pi-ellipsis-h"
                rounded text
                size="small"
                severity="secondary"
                aria-label="Cancel"
              />
            </div>
            <ViewPart
              view={view}
              currentToolId={currentToolId}
              isToolItemSelected={isToolItemSelected}
              setToolItemSelected={setToolItemSelected}
            />
          </div>
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