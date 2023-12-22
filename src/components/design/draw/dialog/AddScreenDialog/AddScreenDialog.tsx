import { type FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'
import { notify } from 'store/slices/toastSlice'
import { AddScreenDialogProps } from './AddScreenDialog.types'
import { v4 as uuidv4 } from 'uuid'
import { IComponentType, IWrapperType } from 'libs/types';
import type { RootState } from 'store';
import { setViewTrees } from 'store/slices/projectSlice';

const AddScreenDialog: FC<AddScreenDialogProps> = ({ isOpenAddScreenModal, setIsOpenAddScreenModal }) => {
  const { viewTrees } = useSelector((state: RootState) => state.project)
  const dispatch = useDispatch();
  const [newScreenName, setNewscreenName] = useState('');

  const AddNewScreen = () => {
    if (newScreenName === '') {
      dispatch(notify({
        title: '',
        content: 'New Screen Name is required',
        type: 'error'
      }))
      return
    }
    const updatedViewTrees = [
      ...viewTrees,
      {
        id: uuidv4(),
        name: newScreenName,
        type: IComponentType.Wrapper,
        x: { min: 0, max: 100 },
        y: { min: 0, max: 100 },
        details: {
          kind: IWrapperType.Horizontal
        }
      }
    ]
    dispatch(setViewTrees(updatedViewTrees))
    setIsOpenAddScreenModal(false);
  }

  useEffect(() => {
    if (isOpenAddScreenModal) {
      setNewscreenName('')
    }
  }, [isOpenAddScreenModal])

  return (
    <Dialog
      header="New Screen"
      visible={isOpenAddScreenModal}
      style={{ width: 300 }}
      onHide={() => setIsOpenAddScreenModal(false)}
      draggable={false}
    >
      <InputText
        type='text'
        value={newScreenName}
        placeholder='New Screen Name'
        onChange={(e) => {
          setNewscreenName(e.target.value)
        }}
      />
      <Divider />
      <Button
        severity="info"
        raised
        size='small'
        style={{ width: '100%', }}
        onClick={AddNewScreen}
      >
        <span style={{ textAlign: 'center', width: '100%' }}>Add</span>
      </Button>

    </Dialog>
  )
}

export default AddScreenDialog;