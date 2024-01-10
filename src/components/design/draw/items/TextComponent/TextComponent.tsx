import { type FC } from 'react';
import { TextComponentProps } from "./TextComponent.types";
import { InputTextarea } from 'primereact/inputtextarea';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import './TextComponent.scss';

const TextComponent: FC<TextComponentProps> = ({ text, style }) => {
  const { zoom } = useSelector((state: RootState) => state.viewTree)

  return (
    <InputTextarea
      className="text-component"
      style={style}
      value={text}
    />
  )
}

export default TextComponent;