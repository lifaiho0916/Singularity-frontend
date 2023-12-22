import { type FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ImageComponentProps } from "./ImageComponent.types";
import defaultImage from "assets/images/default-image.png";
import { getDataFromIndexDB } from 'libs/indexedDB';
import { setPreviewIndex } from 'store/slices/projectSlice';
import type { IMedia } from 'libs/types';
import './ImageComponent.scss';

const ImageComponent: FC<ImageComponentProps> = ({ imageData, preview, link }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState<Array<IMedia>>([]);

  const getDataFromDB = async () => {
    const res = await getDataFromIndexDB();
    setImages(res as Array<IMedia>);
  }

  useEffect(() => {
    getDataFromDB();
  }, [])

  return (
    <img
      className='image-component'
      src={(imageData ? `data:image/jpeg;charset=utf-8;base64,${images.filter((image: IMedia) => image.id === imageData)[0].imageData}` : defaultImage)}
      alt="Image"
      onClick={() => {
        if (preview && link !== undefined) {
          dispatch(setPreviewIndex(link))
        }
      }}
    />
  )
}

export default ImageComponent;