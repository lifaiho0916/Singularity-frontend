import { type FC } from 'react';
import { TextComponentProps } from "./TextComponent.types";
import { InputTextarea } from 'primereact/inputtextarea';
import './TextComponent.scss';

const TextComponent:FC<TextComponentProps> = ({ text }) => {
  return (
    <InputTextarea 
      className="text-component"
      value={text || 'Hello'} 
      // onChange={(e) => setText(e.target.value)} 
    />
  )
}

export default TextComponent;