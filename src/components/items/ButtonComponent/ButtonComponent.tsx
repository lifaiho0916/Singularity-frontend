import { type FC } from 'react';
import { ButtonComponentProps } from "./ButtonComponent.types";
import './ButtonComponent.scss';

const ButtonComponent:FC<ButtonComponentProps> = ({ onClick, children }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

export default ButtonComponent;