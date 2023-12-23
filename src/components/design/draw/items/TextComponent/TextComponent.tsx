import { type FC } from 'react';
import { TextComponentProps } from "./TextComponent.types";
import { InputTextarea } from 'primereact/inputtextarea';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import './TextComponent.scss';

const TextComponent: FC<TextComponentProps> = ({ text, style, preview }) => {
  const { zoom } = useSelector((state: RootState) => state.project);

  return (
    <InputTextarea
      className="text-component"
      style={{ ...style, fontSize: style?.fontSize ? style.fontSize * zoom : undefined }}
      value={preview ? undefined : text}
      defaultValue={preview ? text : undefined}
    />
  )
}

export default TextComponent;