import { type FC } from 'react'
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { Element } from 'components';
import { addSubViewToViewTree, setViewTree } from 'store/slices/viewTreeSlice';
import { SubScreenProps } from './SubScreen.types';
import { IComponentType, INewlyInsertedElement } from 'libs/types';
import type { RootState } from 'store';

import './SubScreen.scss';
import { unselectToolBarComponent } from 'store/slices/toolbarSlice';

const SubScreen: FC<SubScreenProps> = (props) => {
  const { view, setMouseOut } = props;
  const dispatch = useDispatch();
  const { zoom } = useSelector((state: RootState) => state.viewTree);

  const { newToolSelected, ToolComponentID } = useSelector((state: RootState) => state.toolbar);

  const getCurrentComponentType = () => {
    return ToolComponentID === 0 ? IComponentType.ButtonComponent :
      ToolComponentID === 1 ? IComponentType.TextComponent :
      ToolComponentID === 2 ? IComponentType.LabelComponent :
      ToolComponentID === 3 ? IComponentType.ImageComponent :
      IComponentType.Wrapper;
      
  }

  const onAddComponent = () => {
    if(!newToolSelected) return;
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
        color: "#AAA",
      }
    }
    let payload = { 
      parent : view,
      newElement : newElement
    }
    dispatch(addSubViewToViewTree(payload));
    dispatch(unselectToolBarComponent());
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
        onMouseLeave={() => { setMouseOut(true) }}
        onMouseEnter={() => { dispatch(setViewTree(view)); setMouseOut(false) }}
        onClick={ onAddComponent }
      >
        <Element item={view} />
      </div>
    </div>
  )
}

export default SubScreen