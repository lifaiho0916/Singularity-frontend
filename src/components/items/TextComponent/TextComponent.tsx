import { type FC } from 'react';
import { TextComponentProps } from "./TextComponent.types";
import { InputTextarea } from 'primereact/inputtextarea';
import './TextComponent.scss';

const TextComponent:FC<TextComponentProps> = ({ text, setText }) => {
  return (
    <InputTextarea 
      className="text-component"
      value={text} 
      onChange={(e) => setText(e.target.value)} 
    />
  )
}

export default TextComponent;