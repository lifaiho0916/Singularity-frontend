import { type FC } from 'react';
import { WrapperProps } from "./Wrapper.types";
import './Wrapper.scss';

const Wrapper: FC<WrapperProps> = ({ style, children }) => {
  return (
    <div className="wrapper" style={style}>
      {children}
    </div>
  )
}

export default Wrapper;