import { type FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IComponentType, IDragDropInfo } from 'libs/types';
import { Wrapper, ButtonComponent, TextComponent, LabelComponent, ImageComponent } from 'components';
import { selectElementInViewTreeById, addSubViewToViewTree, dragDropElement } from "store/slices/viewTreeSlice";
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { dragStarted, dragEnded } from 'store/slices/dragSlice';
import { unselectToolBarComponent } from 'store/slices/toolbarSlice';
import type { RootState } from 'store';
import { ElementProps } from "./Element.types";
import './Element.scss';

const Element: FC<ElementProps> = ({ item }) => {
  const dispatch = useDispatch();
  const { dragFlagOn, dragStartElementID } = useSelector((state: RootState) => state.drag);
  const { newToolSelected, ToolComponentID } = useSelector((state: RootState) => state.toolbar);

  const getCurrentComponentType = () => {
    return ToolComponentID === 0 ? IComponentType.ButtonComponent :
      ToolComponentID === 1 ? IComponentType.TextComponent :
      ToolComponentID === 2 ? IComponentType.LabelComponent :
      ToolComponentID === 3 ? IComponentType.ImageComponent :
      IComponentType.Wrapper;
  }

  const onAddComponent = () => {
    const newItem = getCurrentComponentType();
    let payload = {
      parent: item.id,
      newElement: newItem,
      componentID: ToolComponentID
    }
    if(item.type != IComponentType.Wrapper) payload = {
      ...payload,
      parent: item.parent
    }
    dispatch(addSubViewToViewTree(payload));
    dispatch(unselectToolBarComponent());
  }

  const setCurrentElement = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(selectElementInViewTreeById(item.id));
  }

  const mouseDownEvent = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (newToolSelected) onAddComponent();
    else dispatch(dragStarted(item.id))
  }


  const checkDragFinished = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (newToolSelected) onAddComponent();
    else if (dragFlagOn) {
      dispatch(dragEnded(item.id));
      onDragEnd()
    }    
  }

  const onDragEnd = () => {
    if (dragStartElementID && item.id) {
      let payload: IDragDropInfo = {
        startElementID: dragStartElementID,
        endElementID: item.id
      }
      dragStartElementID !== item.id && dispatch(dragDropElement(payload));
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        onClick={(e) => setCurrentElement(e)}
        onMouseDown={(e) => mouseDownEvent(e)}
        onMouseUp={(e) => checkDragFinished(e)}
      >
        {item.type === IComponentType.Wrapper ?
          <Wrapper
            id={item.id}
            hasWrapper={(item.child && item.child[0]?.type === IComponentType.Wrapper) ? true : false}
            style={item.style}
          >
            {item.child && item.child.map((subView, index) => (
              <Element item={subView} key={index} />
            ))}
          </Wrapper> :
          item.type === IComponentType.ButtonComponent ?
            <ButtonComponent item={item}/> :
            item.type === IComponentType.TextComponent ? <TextComponent item={item} /> :
            item.type === IComponentType.LabelComponent ? <LabelComponent item={item} /> :
            <ImageComponent imageData={item.detail?.image} />
        }
      </div>
    </DragDropContext>
  )
}

export default Element;