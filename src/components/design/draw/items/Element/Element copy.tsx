import { type FC } from 'react';
import { IComponentType } from 'libs/types';
import { Wrapper, ButtonComponent, TextComponent, LabelComponent, ImageComponent } from 'components';

import { ElementProps } from "./Element.types";
import './Element.scss';

const Element:FC<ElementProps> = ({item}) => {
  
  const onHorizontalSplit = () => {
    
  }

  const onVerticalSplit = () => {    
  }

  const onDeleteButtonPressed = () => {    
  }

  return (
    <>
    {/* {item.type == IComponentType.Wrapper ?
      <Wrapper 
        id={item.id} 
        style={item.style} 
        onHorizontalSplit={onHorizontalSplit}
        onVerticalSplit={onVerticalSplit}
      >
        {item.child && item.child.map((subItem, index)=>(
          <Element item={subItem} key={index} />
        ))}
      </Wrapper> : 
      item.type == IComponentType.ButtonComponent ? <ButtonComponent /> :
      item.type == IComponentType.TextComponent ? <TextComponent /> :
      item.type == IComponentType.LabelComponent ? <LabelComponent /> :
      <ImageComponent />
    } */}
    </>
  )
}

export default Element;