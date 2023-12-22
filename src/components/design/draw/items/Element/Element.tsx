import { type FC } from 'react';
import { useDispatch } from "react-redux";
import { IComponentType, IWrapperType } from 'libs/types';
import { Wrapper, ButtonComponent, TextComponent, LabelComponent, ImageComponent } from 'components';
import { selectElementInViewTreeById } from "store/slices/projectSlice";
import { ElementProps } from "./Element.types";
import './Element.scss';

const Element: FC<ElementProps> = ({ item, preview }) => {
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
          preview={preview}
          hasWrapper={(item.subviews && item.subviews[0].type === IComponentType.Wrapper) ? true : false}
          style={{
            ...item.details?.style,
            width: `${item.x.max - item.x.min}%`,
            height: `${item.y.max - item.y.min}%`,
            display: item.details.kind === IWrapperType.Vertical ? 'flex' : undefined
          }}
        >
          {item.subviews && item.subviews.map((subView, index) => (
            <Element item={subView} key={index} preview={preview} />
          ))}
        </Wrapper> :
        <Wrapper
          id={item.id}
          preview={preview}
          hasWrapper={true}
          onClick={() => { if (!preview) selectThisWrapperInViewTree(item.id) }}
          style={{
            width: `${item.x.max - item.x.min}%`,
            height: `${item.y.max - item.y.min}%`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
            overflow: 'hidden'
          }}
        >
          {
            item.type === IComponentType.ButtonComponent ?
              <ButtonComponent
                text={item.details?.text}
                style={item.details?.style}
                preview={preview}
                link={item.details?.link}
              /> :
              item.type === IComponentType.TextComponent ?
                <TextComponent
                  text={item.details?.text}
                  style={item.details?.style}
                  preview={preview}
                /> :
                item.type === IComponentType.LabelComponent ?
                  <LabelComponent
                    text={item.details?.text}
                    style={item.details?.style}
                    preview={preview}
                    link={item.details?.link}
                  />
                  :
                  <ImageComponent
                    imageData={item.details?.imageData}
                    preview={preview}
                    link={item.details?.link}
                  />
          }
        </Wrapper>
      }
    </>
  )
}

export default Element;