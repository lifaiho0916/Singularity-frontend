import { type FC, useState, useEffect, useRef, useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dialog } from 'primereact/dialog'
import { notify } from 'store/slices/toastSlice'
import { ImageChooseDialogProps } from './ImageChooseDialog.types';
import { TabView, TabPanel } from 'primereact/tabview';
import { Image } from 'primereact/image';
import { Galleria } from 'primereact/galleria';
import { Button } from 'primereact/button';
import { FileUpload, FileUploadHandlerEvent, FileUploadSelectEvent } from 'primereact/fileupload';
import { getProjectImage, uploadProjectImage } from 'libs/axios/api/project';
import { saveDataInIndexDB, getDataFromIndexDB } from 'libs/indexedDB';
import type { IMedia } from 'libs/types';
import "./imageChooseDialog.scss";

const ImageChooseDialog: FC<ImageChooseDialogProps> = ({ isOpenModal, setIsOpenModal, setComponentImage }) => {
    const dispatch = useDispatch();
    const btnRef = useRef<any>(null);
    const galleria = useRef<any>(null);
    const { projectId } = useParams();
    const [thumbnail, setThumbnail] = useState<any>(undefined);
    const [images, setImages] = useState<Array<IMedia>>([]);
    const [index, setIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const onUploadHandler = async (event: FileUploadHandlerEvent) => {
        if (thumbnail) {
            const res = await uploadProjectImage(Number(projectId), thumbnail.split("base64,")[1])
            if (res) {
                const res1 = await GetProjectImages(Number(projectId));
                saveDataInIndexDB(res1);
                dispatch(notify({ title: '', type: 'success', content: 'Image uploaded successfully' }))
                setThumbnail(undefined)
                btnRef.current.clear();
            }
        }
    }

    const onSelect = async (event: FileUploadSelectEvent) => {
        const file: any = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            setThumbnail(base64data)
        };
    }

    const GetProjectImages = async (projectId: number) => {
        const res = await getProjectImage(projectId)
        if (res) {
            saveDataInIndexDB(res)
        }
    }

    const itemTemplate = (item: IMedia) => {
        return <img src={`data:image/jpeg;charset=utf-8;base64,${item.imageData}`} alt="Image" style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate = (item: IMedia) => {
        return <img src={`data:image/jpeg;charset=utf-8;base64,${item.imageData}`} alt="Image" style={{ display: 'block' }} />;
    }

    const getDataFromDB = async () => {
        const res = await getDataFromIndexDB();
        setImages(res as Array<IMedia>);
    }

    useEffect(() => {
        if (isOpenModal) {
            setThumbnail('')
        }
    }, [isOpenModal])

    useEffect(() => {
        if (index === 0) {
            GetProjectImages(Number(projectId))
            getDataFromDB();
        }
    }, [index])

    return (
        <Dialog
            header="Choose Image"
            visible={isOpenModal}
            style={{ maxWidth: 600, width: '100%', margin: '0 10px' }}
            onHide={() => setIsOpenModal(false)}
            draggable={false}
        >
            <TabView
                activeIndex={index}
                onTabChange={(e) => setIndex(e.index)}
            >
                <TabPanel header="Gallery">
                    <Galleria ref={galleria} value={images} numVisible={7} style={{ maxWidth: '850px' }}
                        activeIndex={activeIndex} onItemChange={(e) => setActiveIndex(e.index)}
                        circular fullScreen showItemNavigators showThumbnails={false} item={itemTemplate} thumbnail={thumbnailTemplate} />
                    <div className="image-container">
                        {images && images.map((image: IMedia) => (
                            <div key={image.id} className="image-view">
                                <img
                                    src={`data:image/jpeg;charset=utf-8;base64,${image.imageData}`}
                                    width={'150px'}
                                    height={'120px'}
                                    onClick={
                                        () => { setActiveIndex(index); galleria.current.show() }
                                    }
                                    style={{ objectFit: 'contain', cursor: 'pointer' }}
                                />
                                <Button
                                    size='small'
                                    raised style={{ marginTop: 5 }}
                                    onClick={() => {
                                        setComponentImage(image)
                                        setIsOpenModal(false);
                                    }}
                                >Select</Button>
                            </div>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel header="Upload Image">
                    <FileUpload
                        ref={btnRef}
                        mode="basic"
                        accept="image/*"
                        customUpload
                        multiple
                        onSelect={onSelect}
                        uploadHandler={onUploadHandler}
                    />
                    {thumbnail &&
                        <div style={{
                            marginTop: 20,
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Image
                                width='300'
                                preview
                                src={thumbnail}
                            />
                        </div>
                    }
                </TabPanel>
            </TabView>
        </Dialog>
    )
}

export default ImageChooseDialog;