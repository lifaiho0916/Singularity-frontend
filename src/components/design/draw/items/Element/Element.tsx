import { type FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IComponentType, IDragDropInfo, INewlyInsertedElement } from 'libs/types';
import { Wrapper, ButtonComponent, TextComponent, LabelComponent, ImageComponent } from 'components';
import { selectElementInViewTreeById, addSubViewToViewTree, setViewTree, dragDropElement } from "store/slices/viewTreeSlice";
import { dragStarted, dragElementChanged, dragEnded } from 'store/slices/dragSlice';
import { unselectToolBarComponent } from 'store/slices/toolbarSlice';
import type { RootState } from 'store';
import { ElementProps } from "./Element.types";
import './Element.scss';

const Element: FC<ElementProps> = ({ item }) => {
  const dispatch = useDispatch();
  const { dragFlagOn, dragStartElementID, dragEndElementID } = useSelector((state: RootState) => state.drag);
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
    const newElement: INewlyInsertedElement = {
      type: newItem,
      content: newItem === IComponentType.ButtonComponent ? 'Button' :
        newItem === IComponentType.LabelComponent ? 'Label' :
        newItem === IComponentType.TextComponent ? 'Text' : 
        newItem === IComponentType.ImageComponent ? 'Image' :
        '',
      style: { 
        fontSize: 20,
      }
    }
    if(newItem === IComponentType.Wrapper) {
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
      parent : item,
      newElement : newElement
    }
    dispatch(addSubViewToViewTree(payload));
    dispatch(unselectToolBarComponent());
  }

  const mouseDownEvent = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if(newToolSelected) onAddComponent();
    else dispatch(dragStarted(item.id))
  }
  
  const checkDragging = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dragFlagOn && dispatch(dragElementChanged(item.id));
  }

  const checkDragFinished = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if(dragFlagOn) {
      dispatch(dragEnded(item.id));
      if(dragStartElementID && dragEndElementID)
      {
        let payload : IDragDropInfo = {
          startElementID : dragStartElementID,
          endElementID : dragEndElementID
        }
        dragStartElementID !==dragEndElementID && dispatch(dragDropElement(payload));
      }
    }
  }

  return (
    <div
      onMouseEnter={ (e)=>checkDragging(e) }
      onMouseDown={ (e)=>mouseDownEvent(e) }
      onMouseUp={ (e)=>checkDragFinished(e) }
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
        item.type === IComponentType.ButtonComponent ? <ButtonComponent text={item.content} style={item.style}/> :
        item.type === IComponentType.TextComponent ? <TextComponent text={item.content} style={item.style}/> :
        item.type === IComponentType.LabelComponent ? <LabelComponent text={item.content} style={item.style}/> : 
        <ImageComponent imageData={item.content}/>
      }
    </div>
  )
}

export default Element;