import * as React from "react";
import { type FC } from 'react';
import { Button } from "primereact/button";
import { WrapperProps } from "./Wrapper.types";
import './Wrapper.scss';
import { selectElementInViewTree } from "store/slices/viewTreeSlice";
import { useDispatch } from "react-redux";

const Wrapper: FC<WrapperProps> = ({ id, style, children, hasWrapper }) => {
  const dispatch = useDispatch();
  const [isShowSpliter, setIsShowSpliter] = React.useState(false);
  const [isShowVerticalLine, setIsShowVerticalLine] = React.useState(false);
  const [isShowHorizontalLine, setIsShowHorizontalLine] = React.useState(false);

  const selectThisWrapperInViewTree = () => {
    dispatch(selectElementInViewTree(id));
  }

  return (
    <div
      id={id}
      className="view-box"
      style={{ ...style, border: hasWrapper ? 'none' : undefined }}
      onClick={() => { selectThisWrapperInViewTree() }}
      onMouseEnter={() => { setIsShowSpliter(true) }}
      onMouseLeave={() => { setIsShowSpliter(false) }}
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