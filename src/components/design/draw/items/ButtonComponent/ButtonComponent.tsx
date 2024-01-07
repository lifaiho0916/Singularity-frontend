import { type FC } from 'react';
import { ButtonComponentProps } from "./ButtonComponent.types";
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import type { RootState } from 'store';
import './ButtonComponent.scss';

const ButtonComponent: FC<ButtonComponentProps> = ({ text, onClick, style }) => {
  const { zoom } = useSelector((state: RootState) => state.viewTree)

  return (
    <Button
      className="button-component"
      onClick={onClick}
      style={{ ...style, transform: `scale(${zoom})` }}
    >
      {text}
    </Button>
  )
}

export default ButtonComponent;