import { type FC } from 'react';
import { useDispatch } from "react-redux";
import { selectElementInViewTreeById } from "store/slices/viewTreeSlice";
import { LabelComponentProps } from "./LabelComponent.types";
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import './LabelComponent.scss';

const LabelComponent: FC<LabelComponentProps> = ({ text, style, id }) => {
  const { zoom } = useSelector((state: RootState) => state.viewTree)

  const dispatch = useDispatch();

  const setCurrentElement = (e: React.MouseEvent<HTMLElement>,id: string) => {
    e.stopPropagation();
    console.log(`${id} selected`);
    dispatch(selectElementInViewTreeById(id));
  }
  return (
    <label
      className="label-component"
      style={{ ...style, transform: `scale(${zoom})` }}
      onClick={(e)=>setCurrentElement(e, id)}
    >
      {text}
    </label>
  )
}

export default LabelComponent;