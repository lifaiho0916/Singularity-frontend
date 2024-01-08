import { type FC } from 'react';
import { useDispatch } from "react-redux";
import { selectElementInViewTreeById } from "store/slices/viewTreeSlice";
import { ImageComponentProps } from "./ImageComponent.types";
import defaultImage from "assets/images/default-image.png";
import './ImageComponent.scss';

const ImageComponent: FC<ImageComponentProps> = ({ imageData, id }) => {
  const dispatch = useDispatch();

  const setCurrentElement = (e: React.MouseEvent<HTMLElement>,id: string) => {
    e.stopPropagation();
    console.log(`${id} selected`);
    dispatch(selectElementInViewTreeById(id));
  }

  return (
    <img
      className='image-component'
      src={imageData || defaultImage}
      alt="Image"
      onClick={(e)=>setCurrentElement(e,id)}
    />
  )
}

export default ImageComponent;