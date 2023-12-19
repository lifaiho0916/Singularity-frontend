import React, { type FC } from 'react';
import { IComponentType, IWrapperType } from 'libs/types';
import { Wrapper, ButtonComponent, TextComponent, LabelComponent, ImageComponent } from 'components';

import { ElementProps } from "./Element.types";
import './Element.scss';

const Element: FC<ElementProps> = ({ item }) => {
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
          hasWrapper={(item.subviews && item.subviews[0].type === IComponentType.Wrapper) ? true : false}
          style={{
            ...item.details?.style,
            width: `${item.x.max - item.x.min}%`,
            height: `${item.y.max - item.y.min}%`,
            display: item.details.kind === IWrapperType.Vertical ? 'flex' : undefined
          }}
          onHorizontalSplit={onHorizontalSplit}
          onVerticalSplit={onVerticalSplit}
        >
          {item.subviews && item.subviews.map((subView, index) => (
            <Element item={subView} key={index} />
          ))}
        </Wrapper> :
        <Wrapper
          hasWrapper={true}
          style={{
            width: `${item.x.max - item.x.min}%`,
            height: `${item.y.max - item.y.min}%`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto'
          }}
        >
          {
            item.type == IComponentType.ButtonComponent ? <ButtonComponent /> :
              item.type == IComponentType.TextComponent ? <TextComponent /> :
                item.type == IComponentType.LabelComponent ? <LabelComponent text={item.details?.text} style={item.details?.style} />
                  : <ImageComponent />
          }
        </Wrapper>
      }
    </>
  )
}

export default Element;