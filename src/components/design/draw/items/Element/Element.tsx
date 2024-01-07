import { type FC } from 'react';
import { useDispatch } from "react-redux";
import { IComponentType } from 'libs/types';
import { Wrapper, ButtonComponent, TextComponent, LabelComponent, ImageComponent } from 'components';
import { selectElementInViewTreeById } from "store/slices/viewTreeSlice";
import { ElementProps } from "./Element.types";
import './Element.scss';

const Element: FC<ElementProps> = ({ item }) => {
  const dispatch = useDispatch();

  const selectThisWrapperInViewTree = (id: string) => {
    console.log(`wrapper ${id} selected`);
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
            // width: item.size.width,
            // height: item.size.height,
            display: item.type === IComponentType.Wrapper ? 'flex' : undefined
          }}
        >
          {item.child && item.child.map((subView, index) => (
            <Element item={subView} key={index} />
          ))}
        </Wrapper> :
        <Wrapper
          id={item.id}
          hasWrapper={true}
          onClick={() => { selectThisWrapperInViewTree(item.id) }}
          style={item.style}
        >
          {
            item.type === IComponentType.ButtonComponent ? <ButtonComponent text={item.content} style={item.style} /> :
              item.type === IComponentType.TextComponent ? <TextComponent text={item.content} style={item.style} /> :
                item.type === IComponentType.LabelComponent ? <LabelComponent text={item.content} style={item.style} />
                  : <ImageComponent imageData={item.content} />
          }
        </Wrapper>
      }
    </>
  )
}

export default Element;