import { useState, useEffect, type FC } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ImageComponentDialogProps } from "./ImageComponentDialog.types";
import { InputNumber } from 'primereact/inputnumber';
import { Divider } from 'primereact/divider';
import { CascadeSelect } from 'primereact/cascadeselect';
import type { RootState } from 'store';
import type { IMedia, IView } from 'libs/types';
import { deleteSelectedElementInViewTree, updateSelectedElementInViewTree } from 'store/slices/projectSlice';
import { Button } from 'primereact/button';
import { ImageChooseDialog } from '../ImageChooseDialog';
import { getDataFromIndexDB } from 'libs/indexedDB';
import defaultImage from "assets/images/default-image.png";
import { Image } from 'primereact/image';
import './ImageComponentDialog.scss';

const ImageComponentDialog: FC<ImageComponentDialogProps> = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState<Array<IMedia>>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { currentElement, viewTrees } = useSelector((state: RootState) => state.project)

  const onDelete = () => {
    if (!currentElement || !currentElement.details) return
    dispatch(deleteSelectedElementInViewTree(currentElement));
  }

  const onWidthChange = (newWidth: number) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      x: {
        ...currentElement.x,
        max: newWidth
      }
    }));
  }

  const onHeightChange = (newHeight: number) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      y: {
        ...currentElement.y,
        max: newHeight
      }
    }));
  }

  const onLinkChange = (newLink: string) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      details: {
        ...currentElement.details,
        link: viewTrees.filter((view: IView) => view?.name === newLink)[0].id
      }
    }));
  }

  const onImageChange = (image: IMedia) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      details: {
        ...currentElement.details,
        image: image.id
      }
    }));
  }

  const getDataFromDB = async () => {
    const res = await getDataFromIndexDB();
    setImages(res as Array<IMedia>);
  }

  useEffect(() => {
    getDataFromDB();
  }, [isOpenModal])

  return currentElement ? (
    <div className="image-component-dialog">
      <div className="image-header">
        <label>IMAGE PROPERTIES</label>
      </div>
      <div className="image-body">
        <div className="section-header">
          <h4>Image</h4>
        </div>
        <div className="section-body">
          <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <div className="image-container">
              <Image
                src={(
                  (currentElement.details.image && images.length > 0 && images.filter((image: IMedia) => image.id === currentElement.details.image).length > 0) ? `data:image/jpeg;charset=utf-8;base64,${images.filter((image: IMedia) => image.id === currentElement.details.image)[0].imageData}`
                    : defaultImage)}
                preview
              />
            </div>
            <div>
              <Button
                size="small"
                icon="pi pi-image"
                text
                raised
                severity="secondary"
                onClick={() => setIsOpenModal(true)}
              />
            </div>
          </div>
        </div>
        <Divider className="custom-divider" />

        <div className="section-header">
          <h4>Link</h4>
        </div>
        <div className="section-body">
          <CascadeSelect
            value={viewTrees.filter((viewTree: IView) => viewTree.id === currentElement.details.link).length > 0 ? viewTrees.filter((viewTree: IView) => viewTree.id === currentElement.details.link)[0].name : ''}
            options={viewTrees.map((view: IView) => view?.name)}
            optionGroupChildren={[]}
            onChange={(e) => onLinkChange(e.value)}
            className='input-text'
          />
        </div>
        <Divider className="custom-divider" />

        <div className="section-header">
          <h4>Size</h4>
        </div>
        <div className="section-body">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '49%',
                alignItems: 'center'
              }}
            >
              <h5 style={{ marginRight: 5 }}>W:</h5>
              <InputNumber
                style={{
                  height: 32
                }}
                prefix="%"
                value={currentElement.x.max}
                onChange={(e) => onWidthChange(Number(e.value))}
                min={0}
                max={100}
              />
            </div>
            <div
              style={{
                display: 'flex',
                width: '49%',
                alignItems: 'center'
              }}
            >
              <h5 style={{ marginRight: 5 }}>H:</h5>
              <InputNumber
                style={{
                  height: 32
                }}
                prefix="%"
                value={currentElement.y.max}
                onChange={(e) => onHeightChange(Number(e.value))}
                min={0}
                max={100}
              />
            </div>
          </div>
        </div>
      </div>
      {isOpenModal &&
        <ImageChooseDialog
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          setComponentImage={onImageChange}
        />}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
          marginBottom: 15
        }}
      >
        <Button label="Delete" severity="danger" onClick={onDelete}></Button>
      </div>
    </div>
  ) : null
}

export default ImageComponentDialog;