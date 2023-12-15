import { type FC } from 'react';
import { Button } from 'primereact/button';
import { ButtonComponentProps } from "./ButtonComponent.types";
import './ButtonComponent.scss';

const ButtonComponent:FC<ButtonComponentProps> = ({ onClick }) => {  
  return (
    <Button 
      className="button-component"
      onClick={onClick}
    >
      Hello
    </Button>
  )
}

export default ButtonComponent;