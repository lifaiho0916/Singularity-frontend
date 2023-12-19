import { type FC } from 'react';
import { IComponentType } from 'libs/types';
import { ViewBox, Toolbar, ButtonComponent, TextComponent, LabelComponent, ImageComponent } from 'components';

import { ElementProps } from "./Element.types";
import './Element.scss';

const Element:FC<ElementProps> = ({item}) => {  
  return (
    <>
    {item.type == IComponentType.Wrapper ?
      <div id={item.id} style={item.style} >
        {item.child && item.child.map((subItem, index)=>(
          <Element item={subItem} key={index} />
        ))}
      </div> : 
      item.type == IComponentType.ButtonComponent ? <ButtonComponent /> :
      item.type == IComponentType.TextComponent ? <TextComponent /> :
      item.type == IComponentType.LabelComponent ? <LabelComponent /> :
      <ImageComponent />
    }
    </>
  )
}

export default Element;