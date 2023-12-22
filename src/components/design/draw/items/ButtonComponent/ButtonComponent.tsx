import { type FC } from 'react';
import { useDispatch } from 'react-redux';
import { ButtonComponentProps } from "./ButtonComponent.types";
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { setPreviewIndex } from 'store/slices/projectSlice';
import './ButtonComponent.scss';

const ButtonComponent: FC<ButtonComponentProps> = ({ text, style, link, preview }) => {
  const { zoom } = useSelector((state: RootState) => state.project)
  const dispatch = useDispatch();

  return (
    <div
      className="button-component"
      onClick={() => {
        if (preview && link !== undefined) {
          dispatch(setPreviewIndex(link))
        }
      }}
      style={{ ...style, transform: `scale(${zoom})` }}
    >
      {text}
    </div>
  )
}

export default ButtonComponent;