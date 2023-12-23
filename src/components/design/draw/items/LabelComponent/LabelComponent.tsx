import { type FC } from 'react';
import { useDispatch } from 'react-redux';
import { LabelComponentProps } from "./LabelComponent.types";
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import type { IView } from 'libs/types';
import { setPreviewIndex } from 'store/slices/projectSlice';
import './LabelComponent.scss';

const LabelComponent: FC<LabelComponentProps> = ({ text, style, preview, link }) => {
  const dispatch = useDispatch();
  const { viewTrees, zoom } = useSelector((state: RootState) => state.project)

  return (
    <label
      className="label-component"
      style={{ ...style, fontSize: style?.fontSize ? style.fontSize * zoom : undefined }}
      onClick={() => {
        if (preview && link !== undefined) {
          const index = viewTrees.findIndex((viewTree: IView) => viewTree.id === link)
          if (index !== -1) dispatch(setPreviewIndex(index))
        }
      }}
    >
      {text}
    </label>
  )
}

export default LabelComponent;