import { type FC } from 'react';
import { LabelComponentProps } from "./LabelComponent.types";
import './LabelComponent.scss';

const LabelComponent: FC<LabelComponentProps> = ({ text, style }) => {
  return (
    <label
      className="label-component"
      style={style}
    >
      {text || 'Label'}
    </label>
  )
}

export default LabelComponent;