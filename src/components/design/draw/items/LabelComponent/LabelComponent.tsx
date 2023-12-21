import { type FC } from 'react';
import { LabelComponentProps } from "./LabelComponent.types";
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import './LabelComponent.scss';

const LabelComponent: FC<LabelComponentProps> = ({ text, style }) => {
  const { zoom } = useSelector((state: RootState) => state.viewTree)

  return (
    <label
      className="label-component"
      style={{ ...style, transform: `scale(${zoom})` }}
    >
      {text || 'Label'}
    </label>
  )
}

export default LabelComponent;