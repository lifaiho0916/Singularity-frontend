import { type FC, LegacyRef } from 'react'
import { Button } from 'primereact/button';
import { useMouse } from 'primereact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Element } from 'components';
import { INewlyInsertedElement, IElement, IComponentType, IPosition } from 'libs/types';
import { addSubViewToViewTree, setViewTree } from 'store/slices/viewTreeSlice';
import { dragStarted, drawDraggedElement, dragEnded } from 'store/slices/dragSlice';
import { SubScreenProps } from './SubScreen.types';
import type { RootState } from 'store';

import './SubScreen.scss';
import { Image } from 'primereact/image';

const SubScreen: FC<SubScreenProps> = (props) => {
  const { isToolItemSelected, currentToolId, view, setToolItemSelected, setMouseOut } = props;
  const dispatch = useDispatch();
  const { ref: newItemRef, x, y, reset } = useMouse();
  const { zoom, currentElement } = useSelector((state: RootState) => state.viewTree);
  const { dragFlagOn, startPos_x, startPos_y, dragPos_x, dragPos_y } = useSelector((state: RootState) => state.drag);

  const getCurrentComponentType = () => {
    return currentToolId === 0 ? IComponentType.ButtonComponent :
      currentToolId === 1 ? IComponentType.TextComponent :
      currentToolId === 2 ? IComponentType.LabelComponent :
      currentToolId === 3 ? IComponentType.ImageComponent :
      IComponentType.Wrapper;
      
  }

  const onAddComponent = () => {
    const item = getCurrentComponentType();
    const newElement: INewlyInsertedElement = {
      x: x,
      y: y,
      type: item,
      content: item === IComponentType.ButtonComponent ? 'Button' :
        item === IComponentType.LabelComponent ? 'Label' :
        item === IComponentType.TextComponent ? 'Text' : 
        item === IComponentType.ImageComponent ? 'Image' :
        '',
      style: { 
        fontSize: 20,
      }
    }
    if(item === IComponentType.Wrapper) {
      newElement.style = {
        ...newElement.style,
        display: "flex",
        flexDirection: currentToolId === 4 ? "row" : "column",
        height: 30,
        border: 1,
        width: 100,
        color: "#ff0000",
      }
    }
    dispatch(addSubViewToViewTree(newElement));
    setToolItemSelected(false);
  }

  const mouseDownEvent = () => {
    dispatch(setViewTree(view))
    if(isToolItemSelected) onAddComponent();
    else {
      let position: IPosition = {
        x: x,
        y: y
      }
      dispatch(dragStarted(position));
      console.log("current Selected Element is : ", currentElement?.name);
    }
  }

  const mouseMoveEvent = () => {
    if(dragFlagOn) {
      let position : IPosition = {
        x: x,
        y: y
      }
      console.log("dragPosition : ", position);
      dispatch(drawDraggedElement(position));
    }
  }

  const mouseUpEvent = () => {
    console.log("drag Finished : ");
    if(dragFlagOn) dispatch(dragEnded());
  }

  return (
    <div className="view-section" style={{ width: (view.size.width+16) * zoom, height: (view.size.height + 16) * zoom }}>
      <div className="view-header">
        <h4 className="view-name">{view.name}</h4>
        <Button
          onClick={() => { }}
          icon="pi pi-ellipsis-h"
          rounded text
          size="small"
          severity="secondary"
          aria-label="Cancel"
        />
      </div>
      <div
        className="main-view"
        ref={newItemRef as LegacyRef<HTMLDivElement>}
        onMouseLeave={() => { reset(); setMouseOut(true) }}
        onMouseEnter={() => { setMouseOut(false) }}
        onMouseDown={ mouseDownEvent }
        onMouseMove={ mouseMoveEvent }
        onMouseUp={ mouseUpEvent }
      >
        <Element item={view} />
      </div>
    </div>
  )
}

export default SubScreen