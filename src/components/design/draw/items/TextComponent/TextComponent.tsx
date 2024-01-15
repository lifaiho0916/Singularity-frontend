import { type FC } from 'react';
import { TextComponentProps } from "./TextComponent.types";
import { InputTextarea } from 'primereact/inputtextarea';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import './TextComponent.scss';

const TextComponent: FC<TextComponentProps> = ({ item }) => {
  const { zoom } = useSelector((state: RootState) => state.viewTree)

  return (
    <InputTextarea
      id={item?.id}
      className="text-component"
      style={item?.style}
      value={item?.content}
    />
  )
}

export default TextComponent;