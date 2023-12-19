import { type FC } from 'react';
import { Button } from 'primereact/button';
import { ButtonComponentProps } from "./ButtonComponent.types";
import './ButtonComponent.scss';

const ButtonComponent:FC<ButtonComponentProps> = ({ text, onClick }) => {  
  return (
    <Button 
      className="button-component"
      onClick={onClick}
    >
      {text || 'Hello'}
    </Button>
  )
}

export default ButtonComponent;