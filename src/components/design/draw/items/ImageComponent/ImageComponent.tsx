import { type FC } from 'react';
import { ImageComponentProps } from "./ImageComponent.types";
import defaultImage from "assets/images/default-image.png";
import './ImageComponent.scss';

const ImageComponent: FC<ImageComponentProps> = ({ imageUri }) => {
  return (
    <img
      className='image-component'
      src={imageUri || defaultImage}
      alt="Image"
    />
  )
}

export default ImageComponent;