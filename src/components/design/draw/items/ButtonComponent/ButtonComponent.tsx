import { type FC } from 'react';
import { ButtonComponentProps } from "./ButtonComponent.types";
import Button from '@mui/material/Button';
import './ButtonComponent.scss';

const ButtonComponent: FC<ButtonComponentProps> = ({ text, style,  color, type, size }) => {


  return (
    <Button
      className="button-component"
      color={color}
      variant={type}
      size={size}
      style={style}
    >
      {text}
    </Button>
  )
}

export default ButtonComponent;