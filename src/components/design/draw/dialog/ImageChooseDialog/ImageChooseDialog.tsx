import { type FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'
import { notify } from 'store/slices/toastSlice'
import { ImageChooseDialogProps } from './ImageChooseDialog.types';
import { FileUpload } from 'primereact/fileupload';
import { TabView, TabPanel } from 'primereact/tabview';
import type { RootState } from 'store';

const ImageChooseDialog: FC<ImageChooseDialogProps> = ({ isOpenModal, setIsOpenModal }) => {
    const dispatch = useDispatch();



    return (
        <Dialog
            header="Choose Image"
            visible={isOpenModal}
            style={{ width: '60%', minWidth: 400 }}
            onHide={() => setIsOpenModal(false)}
            draggable={false}
        >
            <TabView>
                <TabPanel header="Gallery">
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </TabPanel>
                <TabPanel header="Upload Image">
                    <FileUpload
                        name="images[]"
                        multiple
                        accept="image/*"
                        maxFileSize={5000000}
                        customUpload 
                        emptyTemplate={
                            <p>Drag and drop files to here to upload.</p>
                        }
                        uploadHandler={(e) => console.log(e)}
                    />
                </TabPanel>
            </TabView>
        </Dialog>
    )
}

export default ImageChooseDialog;