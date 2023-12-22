import { type FC } from 'react';
import { useDispatch } from 'react-redux';
import { LabelComponentProps } from "./LabelComponent.types";
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { setPreviewIndex } from 'store/slices/projectSlice';
import './LabelComponent.scss';

const LabelComponent: FC<LabelComponentProps> = ({ text, style, preview, link }) => {
  const dispatch = useDispatch();
  const { zoom } = useSelector((state: RootState) => state.project)

  return (
    <label
      className="label-component"
      style={{ ...style, transform: `scale(${zoom})` }}
      onClick={() => {
        if (preview && link !== undefined) {
          dispatch(setPreviewIndex(link))
        }
      }}
    >
      {text}
    </label>
  )
}

export default LabelComponent;