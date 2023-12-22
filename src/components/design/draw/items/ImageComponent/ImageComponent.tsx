import { type FC } from 'react';
import { useDispatch } from 'react-redux';
import { ImageComponentProps } from "./ImageComponent.types";
import defaultImage from "assets/images/default-image.png";
import { setPreviewIndex } from 'store/slices/viewTreeSlice';
import './ImageComponent.scss';

const ImageComponent: FC<ImageComponentProps> = ({ imageData, preview, link }) => {
  const dispatch = useDispatch();

  return (
    <img
      className='image-component'
      src={imageData || defaultImage}
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