import { type FC, LegacyRef, useRef } from 'react'
import { Button } from 'primereact/button';
import { useMouse } from 'primereact/hooks';
import { Menu } from 'primereact/menu';
import { MenuItemCommandEvent } from 'primereact/menuitem';
import { useDispatch, useSelector } from 'react-redux';
import { Element } from 'components';
import { INewlyInsertedElement, IView, IComponentType } from 'libs/types';
import { addSubViewToViewTree, deleteViewFromViewTrees, moveViewBackwardInViewTrees, moveViewForwardInViewTrees, moveViewToFirstInViewTrees, moveViewToLastInViewTrees, setViewTree } from 'store/slices/projectSlice';
import { SubScreenProps } from './SubScreen.types';
import type { RootState } from 'store';
import './SubScreen.scss';

const SubScreen: FC<SubScreenProps> = (props) => {
  const { isToolItemSelected, currentToolId, view, setToolItemSelected, setMouseOut } = props;
  const dispatch = useDispatch();
  const { ref: newItemRef, x, y, reset } = useMouse();
  const menu = useRef<Menu | null>(null);
  const { zoom, xMultiplier, yMultiplier } = useSelector((state: RootState) => state.project);

  const MoveForward = () => {
    dispatch(moveViewForwardInViewTrees(view.id))
  }

  const MoveBackward = () => {
    dispatch(moveViewBackwardInViewTrees(view.id))
  }

  const MoveToFirst = () => {
    dispatch(moveViewToFirstInViewTrees(view.id))
  }

  const MoveToLast = () => {
    dispatch(moveViewToLastInViewTrees(view.id))
  }

  const RemoveView = () => {
    dispatch(deleteViewFromViewTrees(view.id));
  }

  const getCurrentComponentType = () => {
    return currentToolId === 0 ? IComponentType.ButtonComponent :
      currentToolId === 1 ? IComponentType.TextComponent :
        currentToolId === 2 ? IComponentType.LabelComponent :
          IComponentType.ImageComponent;
  }

  const getDetails = (type: string) => {
    switch (type) {
      case IComponentType.ButtonComponent:
        return {
          color: 'primary',
          text: 'Button',
          type: 'contained',
          size: 'medium'
        }
      case IComponentType.LabelComponent:
        return {
          text: 'Label',
          style: {

          }
        }
      case IComponentType.TextComponent:
        return {
          text: 'Text',
          style: {

          }
        }
      default:
        return {
          style: {

          }
        }
    }
  }

  const onAddComponent = (view: IView) => {
    dispatch(setViewTree(view))
    const item = getCurrentComponentType();
    const details = getDetails(item);

    if (isToolItemSelected) {
      {
        const newElement: INewlyInsertedElement = {
          x: x,
          y: y,
          type: item,
          width: 100,
          height: 30,
          details: details
          // {
          // text: item === IComponentType.ButtonComponent ? 'Button' :
          //   item === IComponentType.LabelComponent ? 'Label' :
          //     item === IComponentType.TextComponent ? 'Text' :
          //       'Image',
          // style: {
          //   fontSize: 20
          // },
          // color: 'primary'
          // }
        }
        dispatch(addSubViewToViewTree(newElement));
        setToolItemSelected(false);
      }
    }
  }

  const items = [
    {
      label: 'Move Forward',
      command: (event: MenuItemCommandEvent) => {
        event.originalEvent.stopPropagation();
        MoveForward()
      }
    },
    {
      label: 'Move Backward',
      command: (event: MenuItemCommandEvent) => {
        event.originalEvent.stopPropagation();
        MoveBackward()
      }
    },
    {
      label: 'Move to First',
      command: (event: MenuItemCommandEvent) => {
        event.originalEvent.stopPropagation();
        MoveToFirst()
      }
    },
    {
      label: 'Move to Last',
      command: (event: MenuItemCommandEvent) => {
        event.originalEvent.stopPropagation();
        MoveToLast()
      }
    },
    {
      label: 'Delete',
      command: (event: MenuItemCommandEvent) => {
        event.originalEvent.stopPropagation();
        RemoveView();
      }
    },
  ]

  return (
    <div className="view-section" style={{ width: (xMultiplier + 16) * zoom, height: (yMultiplier + 16) * zoom }}>
      <div className="view-header">
        <h4 className="view-name">{view?.name}</h4>
        <Button
          onClick={(event) => {
            event.stopPropagation();
            menu.current && menu.current.toggle(event)
          }}
          icon="pi pi-ellipsis-h"
          rounded text
          size="small"
          severity="secondary"
          aria-label="Cancel"
        />
        <Menu model={items} popup ref={menu} popupAlignment="right" />
      </div>
      <div
        className="main-view"
        ref={newItemRef as LegacyRef<HTMLDivElement>}
        onMouseLeave={() => { reset(); setMouseOut(true) }}
        onMouseEnter={() => { setMouseOut(false) }}
        onMouseDown={() => onAddComponent(view)}
      >
        <Element item={view} preview={false} />
      </div>
    </div>
  )
}

export default SubScreen