import { type FC, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { Element } from 'components';
import { addSubViewToViewTree, deleteSelectedViewInViewTree, setViewTree } from 'store/slices/viewTreeSlice';
import { SubScreenProps } from './SubScreen.types';
import { IComponentType, INewlyInsertedElement } from 'libs/types';
import type { RootState } from 'store';
import { unselectToolBarComponent } from 'store/slices/toolbarSlice';
import './SubScreen.scss';

const SubScreen: FC<SubScreenProps> = (props) => {
  const { view, setMouseOut } = props;
  const dispatch = useDispatch();
  const { zoom } = useSelector((state: RootState) => state.viewTree);
  const [ showDeleteModal, setShowDeleteModal ] = useState(false)
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
    if(!newToolSelected) return;
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
      parent : view,
      newElement : newElement
    }
    dispatch(addSubViewToViewTree(payload));
    dispatch(unselectToolBarComponent());
  }
  
  const onDelete = () => {
    // Handle the delete operation
    dispatch(deleteSelectedViewInViewTree(view));
    setShowDeleteModal(false);
  }

  const confirmDelete = () => {
    setShowDeleteModal(true);
  }

  const onHideDeleteModal = () => {
    setShowDeleteModal(false);
  }

  return (
    <div className="view-section" style={{ width: (view.size.width+16) * zoom, height: (view.size.height + 16) * zoom }}>
      <div className="view-header">
        <h4 className="view-name">{view.name}</h4>
        <Button
          onClick={confirmDelete}
          icon="pi pi-trash"
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

      <Dialog
        header="Confirm Deletion"
        visible={showDeleteModal}
        style={{ width: '400px' }}
        onHide={onHideDeleteModal}
        footer={
          <div>
            <Button label="Cancel" icon="pi pi-times" onClick={onHideDeleteModal} className="p-button-text" />
            <Button label="Delete" icon="pi pi-trash" onClick={onDelete} autoFocus />
          </div>
        }
      >
        <div>
          <p>Are you sure you want to delete this subscreen?</p>
        </div>
      </Dialog>
    </div>
  )
}

export default SubScreen