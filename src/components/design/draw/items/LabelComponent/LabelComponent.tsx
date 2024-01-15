import { type FC } from 'react';
import { LabelComponentProps } from "./LabelComponent.types";
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import './LabelComponent.scss';

const LabelComponent: FC<LabelComponentProps> = ({ item }) => {
  const { zoom } = useSelector((state: RootState) => state.viewTree)
  return (
    <label
      id={item?.id}
      className="label-component"
      style={item?.style}
    >
      {item ? item?.content : "Label"}
    </label>
  )
}

export default LabelComponent;