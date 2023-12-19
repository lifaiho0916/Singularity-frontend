import { type FC } from 'react';
import { IComponentType } from 'libs/types';
<<<<<<< HEAD:src/components/design/draw/items/Element/Element.tsx
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
    {item.type == IComponentType.Wrapper ?
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
    }
=======
import { ButtonComponent, TextComponent, LabelComponent, ImageComponent, Wrapper } from 'components';
import { ElementProps } from "./Element.types";
import './Element.scss';

const Element: FC<ElementProps> = ({ item }) => {
  return (
    <>
      {item.type === IComponentType.Wrapper ?
        <div id={item.id} style={item.style} >
          {item.child && item.child.map((subItem, index) => (
            <Element item={subItem} key={index} />
          ))}
        </div> :
        item.type === IComponentType.ButtonComponent ? <ButtonComponent /> :
          item.type === IComponentType.TextComponent ? <TextComponent /> :
            item.type === IComponentType.LabelComponent ? <LabelComponent /> :
              <ImageComponent />
      }
>>>>>>> aadac7758580e47c4af9b3b66a390aac4e789b59:src/components/items/Element/Element.tsx
    </>
  )
}

export default Element;