import { type FC } from 'react';
import { ButtonComponentProps } from "./ButtonComponent.types";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { selectElementInViewTreeById } from "store/slices/viewTreeSlice";
import Button from '@mui/material/Button';
import type { RootState } from 'store';
import './ButtonComponent.scss';

const ButtonComponent: FC<ButtonComponentProps> = ({ text, id, style }) => {
  const { zoom } = useSelector((state: RootState) => state.viewTree)
  const dispatch = useDispatch();

  const setCurrentElement = (e: React.MouseEvent<HTMLElement>,id: string) => {
    e.stopPropagation();
    console.log(`${id} selected`);
    dispatch(selectElementInViewTreeById(id));
  }
  return (
    <Button
      className="button-component"
      onClick={(e)=>setCurrentElement(e, id)}
      style={{ ...style, transform: `scale(${zoom})` }}
    >
      {text}
    </Button>
  )
}

export default ButtonComponent;