import { type FC, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { Element } from 'components';
import { deleteSelectedViewInViewTree, setViewTree } from 'store/slices/viewTreeSlice';
import { SubScreenProps } from './SubScreen.types';
import type { RootState } from 'store';
import './SubScreen.scss';

const SubScreen: FC<SubScreenProps> = (props) => {
  const { view, setMouseOut } = props;
  const dispatch = useDispatch();
  const { zoom } = useSelector((state: RootState) => state.viewTree);
  const [ showDeleteModal, setShowDeleteModal ] = useState(false)
  
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