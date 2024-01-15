import { type FC } from 'react';
import { ButtonComponentProps } from "./ButtonComponent.types";
import Button from '@mui/material/Button';
import './ButtonComponent.scss';

const ButtonComponent: FC<ButtonComponentProps> = ({ item }) => {
  return (
    <Button
      className="button-component"
      id={item?.id}
      style={item?.style}
      color={item ? item.detail.color : "primary"}
      variant={item ? item.detail.type : "contained"}
      size={item ? item.detail.size : "medium"}    
    >
      {item ? item.content : "Button"}
    </Button>
  )
}

export default ButtonComponent;