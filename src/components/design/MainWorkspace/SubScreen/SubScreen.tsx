import { type FC, LegacyRef } from 'react'
import { Button } from 'primereact/button';
import { useMouse } from 'primereact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  Element,
} from 'components';
import { INewlyInsertedElement, IView, IComponentType } from 'libs/types';
import { addSubViewToViewTree, setViewTree } from 'store/slices/viewTreeSlice';
import { SubScreenProps } from './SubScreen.types';
import type { RootState } from 'store';

import './SubScreen.scss';

const SubScreen: FC<SubScreenProps> = (props) => {
  const { isToolItemSelected, currentToolId, view, setToolItemSelected, setMouseOut } = props;
  const dispatch = useDispatch();
  const { ref: newItemRef, x, y, reset } = useMouse();
  const { zoom, xMultiplier, yMultiplier } = useSelector((state: RootState) => state.viewTree);

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
        dispatch(addSubViewToViewTree(newElement));
        setToolItemSelected(false);
      }
    }
  }

  return (
    <div className="view-section" style={{ width: (xMultiplier + 16) * zoom, height: (yMultiplier + 16) * zoom }}>
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
      <div
        className="main-view"
        ref={newItemRef as LegacyRef<HTMLDivElement>}
        onMouseLeave={ ()=>{ reset(); setMouseOut(true) } }
        onMouseEnter={ ()=>{ setMouseOut(false) } }
        onMouseDown={ ()=>onAddComponent(view) }
      >
        <Element item={view} />
      </div>
    </div>
  )
}

export default SubScreen