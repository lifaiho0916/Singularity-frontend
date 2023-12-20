import { type FC } from 'react';
import { TextComponentProps } from "./TextComponent.types";
import { InputTextarea } from 'primereact/inputtextarea';
import './TextComponent.scss';

const TextComponent: FC<TextComponentProps> = ({ text, style }) => {
  return (
    <InputTextarea
      className="text-component"
      style={style}
      value={text}
    // onChange={(e) => setText(e.target.value)} 
    />
  )
}

export default TextComponent;