import { type FC } from 'react';
import { ButtonComponentProps } from "./ButtonComponent.types";
import './ButtonComponent.scss';

const ButtonComponent: FC<ButtonComponentProps> = ({ text, onClick, style }) => {
  return (
    <div
      className="button-component"
      onClick={onClick}
      style={style}
    >
      {text}
    </div>
  )
}

export default ButtonComponent;