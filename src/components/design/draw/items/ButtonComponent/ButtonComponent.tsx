import { type FC } from 'react';
import { useDispatch } from 'react-redux';
import { ButtonComponentProps } from "./ButtonComponent.types";
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { Button } from '@mui/material';
import type { IView } from 'libs/types';
import { setPreviewIndex } from 'store/slices/projectSlice';
import './ButtonComponent.scss';

const ButtonComponent: FC<ButtonComponentProps> = ({ text, color, link, preview, type, size }) => {
  const { viewTrees, zoom } = useSelector((state: RootState) => state.project)
  const dispatch = useDispatch();

  return (
    <Button
      color={color}
      variant={type}
      size={size}
      style={{
        transform: `scale(${zoom})`
      }}
      onClick={() => {
        if (preview && link !== undefined) {
          const index = viewTrees.findIndex((viewTree: IView) => viewTree.id === link)
          if (index !== -1) dispatch(setPreviewIndex(index))
        }
      }}
    >
      {text}
    </Button>
  )
}

export default ButtonComponent;