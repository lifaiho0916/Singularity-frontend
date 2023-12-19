import { type FC } from 'react';
import { ViewBox } from 'components';
import { WrapperProps } from "./Wrapper.types";
import './Wrapper.scss';

const Wrapper:FC<WrapperProps> = ({style, children}) => {

  const onHorizontalSplit = () => {    
  }

  const onVerticalSplit = () => {    
  }

  const onDeleteButtonPressed = () => {    
  }

  return (
    <ViewBox style={style}>
      {children}
    </ViewBox>
  )
}

export default Wrapper;