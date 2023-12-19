import React, { type FC } from 'react';
import { useDispatch } from "react-redux";
import { IComponentType, IWrapperType } from 'libs/types';
import { Wrapper, ButtonComponent, TextComponent, LabelComponent, ImageComponent } from 'components';

import { selectElementInViewTree } from "store/slices/viewTreeSlice";

import { ElementProps } from "./Element.types";
import './Element.scss';

const Element: FC<ElementProps> = ({ item }) => {
  const dispatch = useDispatch();
  
  const onHorizontalSplit = () => {
  }

  const onVerticalSplit = () => {
  }

  const onDeleteButtonPressed = () => {
  }

  const selectThisWrapperInViewTree = (id: string) => {
    console.log(`wrapper ${id} selected`);
    dispatch(selectElementInViewTree(id));
  }

  return (
    <>
      {item.type == IComponentType.Wrapper ?
        <Wrapper
          id={item.id}
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
          id={item.id}
          hasWrapper={true}
          onClick={() => { selectThisWrapperInViewTree(item.id) }}
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