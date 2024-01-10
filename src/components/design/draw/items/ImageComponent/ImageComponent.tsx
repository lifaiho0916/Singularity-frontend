import { type FC, useState, useEffect } from 'react';
import { ImageComponentProps } from "./ImageComponent.types";
import defaultImage from "assets/images/default-image.png";
import { getDataFromIndexDB } from 'libs/indexedDB';
import type { IMedia } from 'libs/types';
import './ImageComponent.scss';

const ImageComponent: FC<ImageComponentProps> = ({ imageData }) => {
  const [images, setImages] = useState<Array<IMedia>>([]);

  const getDataFromDB = async () => {
    const res = await getDataFromIndexDB();
    setImages(res as Array<IMedia>);
  }

  useEffect(() => {
    getDataFromDB();
  }, [imageData])

  return (
    <img
      className='image-component'
      src={((imageData && images.length > 0 && images.filter((image: IMedia) => image.id === imageData).length > 0) ? `data:image/jpeg;charset=utf-8;base64,${images.filter((image: IMedia) => image.id === imageData)[0].imageData}` : defaultImage)}
      alt="Image"
    />
  )
}

export default ImageComponent;