import { type FC } from 'react';
import { useSelector } from 'react-redux';
import { ButtonComponentProps } from "./ButtonComponent.types";
import Button from '@mui/material/Button';
import type { RootState } from 'store';
import './ButtonComponent.scss';

const ButtonComponent: FC<ButtonComponentProps> = ({ text, style,  color, type, size }) => {
  const { zoom } = useSelector((state: RootState) => state.viewTree)

  return (
    <Button
      className="button-component"
      color={color}
      variant={type}
      size={size}
      style={{ ...style, transform: `scale(${zoom})` }}
    >
      {text}
    </Button>
  )
}

export default ButtonComponent;