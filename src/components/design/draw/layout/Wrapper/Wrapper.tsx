import * as React from "react";
import { type FC } from 'react';
import { Button } from "primereact/button";
import { WrapperProps } from "./Wrapper.types";
import './Wrapper.scss';

const Wrapper:FC<WrapperProps> = () => {
  const [isShowSpliter, setIsShowSpliter] = React.useState(false);
  const [isShowVerticalLine, setIsShowVerticalLine] = React.useState(false);
  const [isShowHorizontalLine, setIsShowHorizontalLine] = React.useState(false);

  return (
    <div
      className="view-box"
      onMouseEnter={ ()=>{ setIsShowSpliter(true) } }
      onMouseLeave={ ()=>{ setIsShowSpliter(false) } }
    >
      {isShowSpliter ?
        <React.Fragment>
          { isShowVerticalLine ? <div className="vertical-line" /> : null }
          <Button
            className="vertical-spliter"
            icon="pi pi-pencil"
            severity="secondary"
            text rounded
            size="small"
            onMouseEnter={ ()=>{ setIsShowVerticalLine(true) } }
            onMouseLeave={ ()=>{ setIsShowVerticalLine(false) } }
            onClick={ ()=>{} }
          />
          
          { isShowHorizontalLine ? <div className="horizontal-line" /> : null }
          <Button
            className="horizontal-spliter"
            icon="pi pi-pencil"
            severity="secondary"
            text rounded
            size="small"
            onMouseEnter={ ()=>{ setIsShowHorizontalLine(true) } }
            onMouseLeave={ ()=>{ setIsShowHorizontalLine(false) } }
            onClick={() => { }}
          />
        </React.Fragment>
        : null
      }
    </div>
  )
}

export default Wrapper;