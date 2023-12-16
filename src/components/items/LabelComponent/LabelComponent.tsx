import { type FC } from 'react';
import { LabelComponentProps } from "./LabelComponent.types";
import './LabelComponent.scss';

const LabelComponent: FC<LabelComponentProps> = ({ text }) => {
  return (
    <label
      className="label-component"
    >
      {text}
    </label>
  )
}

export default LabelComponent;