import { type FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IComponentType, IDragDropInfo, INewlyInsertedElement } from 'libs/types';
import { Wrapper, ButtonComponent, TextComponent, LabelComponent, ImageComponent } from 'components';
import { selectElementInViewTreeById, addSubViewToViewTree, setViewTree, dragDropElement } from "store/slices/viewTreeSlice";
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

  const getDetails = (type: string) => {
    switch (type) {
      case IComponentType.ButtonComponent:
        return {
          color: 'primary',
          type: 'contained',
          size: 'medium'
        }
      case IComponentType.LabelComponent:
        return {}
      case IComponentType.TextComponent:
        return {}
      case IComponentType.ImageComponent:
        return {}
    }
  }

  const onAddComponent = () => {
    const newItem = getCurrentComponentType();
    const detail = getDetails(newItem);

    const newElement: INewlyInsertedElement = {
      type: newItem,
      content: newItem === IComponentType.ButtonComponent ? 'Button' :
        newItem === IComponentType.LabelComponent ? 'Label' :
          newItem === IComponentType.TextComponent ? 'Text' :
            newItem === IComponentType.ImageComponent ? 'Image' :
              '',
      detail: detail,
      style: {
        fontSize: 20,
      }
    }
    if (newItem === IComponentType.Wrapper) {
      newElement.style = {
        ...newElement.style,
        display: "flex",
        flexDirection: ToolComponentID === 4 ? "row" : "column",
        border: 1,
        minHeight: 30,
        color: "#AAA",
      }
    }
    let payload = {
      parent: item,
      newElement: newElement
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
      if (dragStartElementID && item.id) {
        let payload: IDragDropInfo = {
          startElementID: dragStartElementID,
          endElementID: item.id
        }
        dragStartElementID !== item.id && dispatch(dragDropElement(payload));
      }
    }    
  }

  return (
    <div
      onClick={(e) => setCurrentElement(e)}
      onMouseDown={(e) => mouseDownEvent(e)}
      onMouseUp={(e) => checkDragFinished(e)}
    >
      {item.type === IComponentType.Wrapper ?
        <Wrapper
          id={item.id}
          hasWrapper={(item.child && item.child[0]?.type === IComponentType.Wrapper) ? true : false}
          style={{
            ...item.style,
          }}
        >
          {item.child && item.child.map((subView, index) => (
            <Element item={subView} key={index} />
          ))}
        </Wrapper> :
        item.type === IComponentType.ButtonComponent ?
          <ButtonComponent
            text={item.content}
            style={item.style}
            color={item.detail.color}
            type={item.detail.type}
            size={item.detail.size}
          /> :
          item.type === IComponentType.TextComponent ? <TextComponent text={item.content} style={item.style} /> :
            item.type === IComponentType.LabelComponent ? <LabelComponent text={item.content} style={item.style} /> :
              <ImageComponent imageData={item.detail?.image} />
      }
    </div>
  )
}

export default Element;