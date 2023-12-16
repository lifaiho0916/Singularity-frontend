import { type FC } from 'react';
import { ImageComponentProps } from "./ImageComponent.types";
import { Image } from 'primereact/image';
import './ImageComponent.scss';

const ImageComponent: FC<ImageComponentProps> = ({ imageUri }) => {
  return (
    <Image
      className='image-component'
      src={imageUri}
      alt="Image"
    />
  )
}

export default ImageComponent;