import * as React from "react";
import { type FC } from 'react';
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { WrapperProps } from "./Wrapper.types";
import { RootState } from "store";
import './Wrapper.scss';

const Wrapper: FC<WrapperProps> = ({ id, style, children, hasWrapper, onClick }) => {
  const { currentElement } = useSelector((state: RootState) => state.viewTree);
  const [isShowSpliter, setIsShowSpliter] = React.useState(false);
  const [isShowVerticalLine, setIsShowVerticalLine] = React.useState(false);
  const [isShowHorizontalLine, setIsShowHorizontalLine] = React.useState(false);

  return (
    <div
      id={id}
      className="view-box"
      style={{ ...style, border: currentElement && currentElement.id === id ? '2px dashed' : hasWrapper ? 'none' : undefined }}
      onMouseEnter={() => { setIsShowSpliter(true) }}
      onMouseLeave={() => { setIsShowSpliter(false) }}
      onClick={onClick}
    >
      {!hasWrapper &&
        <React.Fragment>
          {isShowSpliter ?
            <React.Fragment>
              {isShowVerticalLine ? <div className="vertical-line" /> : null}
              <Button
                className="vertical-spliter"
                icon="pi pi-pencil"
                severity="secondary"
                text rounded
                size="small"
                onMouseEnter={() => { setIsShowVerticalLine(true) }}
                onMouseLeave={() => { setIsShowVerticalLine(false) }}
                onClick={() => { }}
              />

              {isShowHorizontalLine ? <div className="horizontal-line" /> : null}
              <Button
                className="horizontal-spliter"
                icon="pi pi-pencil"
                severity="secondary"
                text rounded
                size="small"
                onMouseEnter={() => { setIsShowHorizontalLine(true) }}
                onMouseLeave={() => { setIsShowHorizontalLine(false) }}
                onClick={() => { }}
              />
            </React.Fragment>
            : null
          }
        </React.Fragment>
      }
      {children}
    </div>
  )
}

export default Wrapper;