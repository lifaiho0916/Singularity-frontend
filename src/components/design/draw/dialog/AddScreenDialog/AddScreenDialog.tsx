import { type FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'
import { notify } from 'store/slices/toastSlice'

import { AddScreenDialogProps } from './AddScreenDialog.types'
import type { IStructure } from 'libs/types';
import { setStructure } from 'store/slices/projectSlice';
import type { RootState } from 'store';

const AddScreenDialog: FC<AddScreenDialogProps> = ({ isOpenAddScreenModal, setIsOpenAddScreenModal }) => {
  const { structure } = useSelector((staet: RootState) => staet.project)
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
    const newPage = {
      name: newScreenName,
      defaultView: {
        name: 'main view',
        align: {
          vertical: 'center',
          horizontal: 'center'
        },
        content: []
      }
    }
    const updateStructure = {
      ...structure,
      project: {
        ...structure?.project,
        design: {
          ...structure?.project.design,
          pages: [
            ...structure?.project.design.pages,
            newPage
          ]
        }
      }
    }
    dispatch(setStructure(updateStructure as IStructure));
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