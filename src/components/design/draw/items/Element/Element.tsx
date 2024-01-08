import { type FC } from 'react';
import { useDispatch } from "react-redux";
import { IComponentType } from 'libs/types';
import { Wrapper, ButtonComponent, TextComponent, LabelComponent, ImageComponent } from 'components';
import { selectElementInViewTreeById, setViewTree } from "store/slices/viewTreeSlice";
import { ElementProps } from "./Element.types";
import './Element.scss';

const Element: FC<ElementProps> = ({ item }) => {
  const dispatch = useDispatch();

  const setCurrentWrapper = (id: string) => {
    console.log(`${id} selected`);
    dispatch(selectElementInViewTreeById(id));
  }

  return (
    <>
      {item.type === IComponentType.Wrapper ?
        <Wrapper
          id={item.id}
          hasWrapper={(item.child && item.child[0]?.type === IComponentType.Wrapper) ? true : false}
          style={{
            ...item.style,
          }}
          onClick={ ()=>setCurrentWrapper(item.id) }
        >
          {item.child && item.child.map((subView, index) => (
            <Element item={subView} key={index} />
          ))}
        </Wrapper> :
          item.type === IComponentType.ButtonComponent ? <ButtonComponent text={item.content} style={item.style} id={item.id}/> :
          item.type === IComponentType.TextComponent ? <TextComponent text={item.content} style={item.style} id={item.id}/> :
          item.type === IComponentType.LabelComponent ? <LabelComponent text={item.content} style={item.style} id={item.id}/> : 
          <ImageComponent imageData={item.content} id={item.id}/>
      }
    </>
  )
}

export default Element;