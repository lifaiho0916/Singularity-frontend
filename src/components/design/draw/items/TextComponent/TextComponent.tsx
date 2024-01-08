import { type FC } from 'react';
import { TextComponentProps } from "./TextComponent.types";
import { InputTextarea } from 'primereact/inputtextarea';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { selectElementInViewTreeById } from "store/slices/viewTreeSlice";
import type { RootState } from 'store';
import './TextComponent.scss';

const TextComponent: FC<TextComponentProps> = ({ text, style, id }) => {
  const { zoom } = useSelector((state: RootState) => state.viewTree)
  const dispatch = useDispatch();

  const setCurrentElement = (e: React.MouseEvent<HTMLElement>,id: string) => {
    e.stopPropagation();
    console.log(`${id} selected`);
    dispatch(selectElementInViewTreeById(id));
  }
  return (
    <InputTextarea
      className="text-component"
      style={{ ...style, transform: `scale(${zoom})` }}
      value={text}
      onClick={(e)=>setCurrentElement(e, id)}
    />
  )
}

export default TextComponent;