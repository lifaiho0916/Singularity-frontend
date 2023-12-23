import { type FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageComponentProps } from "./ImageComponent.types";
import defaultImage from "assets/images/default-image.png";
import { getDataFromIndexDB } from 'libs/indexedDB';
import { setPreviewIndex } from 'store/slices/projectSlice';
import type { IMedia, IView } from 'libs/types';
import type { RootState } from 'store';
import './ImageComponent.scss';

const ImageComponent: FC<ImageComponentProps> = ({ imageData, preview, link }) => {
  const { viewTrees } = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();
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
      onClick={() => {
        if (preview && link !== undefined) {
          const index = viewTrees.findIndex((viewTree: IView) => viewTree.id === link)
          if (index !== -1) dispatch(setPreviewIndex(index))
        }
      }}
    />
  )
}

export default ImageComponent;