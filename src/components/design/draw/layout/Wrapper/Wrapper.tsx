import * as React from "react";
import { type FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { WrapperProps } from "./Wrapper.types";
import { RootState } from "store";
import { IWrapperType } from "libs/types";
import { selectElementInViewTreeById, applySplitToWrapper, deleteWrapper } from "store/slices/viewTreeSlice";
import './Wrapper.scss';

const Wrapper: FC<WrapperProps> = ({ id, style, children, hasWrapper }) => {
  const dispatch = useDispatch();
  const { currentElement } = useSelector((state: RootState) => state.viewTree);
  const [isShowSpliter, setIsShowSpliter] = React.useState(false);
  const [isShowVerticalLine, setIsShowVerticalLine] = React.useState(false);
  const [isShowHorizontalLine, setIsShowHorizontalLine] = React.useState(false);

  const onSplitButtonClickWith = (wrapperType: IWrapperType) => {
    dispatch(applySplitToWrapper({ wrapperId: id, kind: wrapperType }));
    setIsShowHorizontalLine(false);
    setIsShowVerticalLine(false);
  }

  const onDeleteButtonClick = () => {
    dispatch(deleteWrapper(id));
  }

  const setCurrentWrapper = (e : React.MouseEvent<HTMLElement>, id: string) => {
    e.stopPropagation();
    console.log(`${id} selected`);
    dispatch(selectElementInViewTreeById(id));
  }

  return (
    <div
      id={id}
      className="view-box"
      style={{ ...style, border: currentElement && currentElement.id === id ? '2px dashed' : hasWrapper ? 'none' : undefined }}
      onMouseEnter={() => { setIsShowSpliter(true) }}
      onMouseLeave={() => { setIsShowSpliter(false) }}
      onClick={(e)=>setCurrentWrapper(e,id)}
    >
      {!hasWrapper &&
        <React.Fragment>
          {isShowSpliter ?
            <React.Fragment>
              {isShowVerticalLine ? <div className="vertical-line" /> : null}
              <Button
                style={{ zIndex: 10 }}
                className="vertical-spliter"
                icon="pi pi-pencil"
                severity="secondary"
                text rounded
                size="small"
                onMouseEnter={() => { setIsShowVerticalLine(true) }}
                onMouseLeave={() => { setIsShowVerticalLine(false) }}
                onClick={() => { onSplitButtonClickWith(IWrapperType.Vertical) }}
              />

              {isShowHorizontalLine ? <div className="horizontal-line" /> : null}
              <Button
                className="horizontal-spliter"
                style={{ zIndex: 10 }}
                icon="pi pi-pencil"
                severity="secondary"
                text rounded
                size="small"
                onMouseEnter={() => { setIsShowHorizontalLine(true) }}
                onMouseLeave={() => { setIsShowHorizontalLine(false) }}
                onClick={() => { onSplitButtonClickWith(IWrapperType.Horizontal) }}
              />
              <Button
                style={{
                  zIndex: 10,
                  marginRight: '5px',
                  marginTop: '5px'
                }}
                className="delete-wrapper-button"
                icon="pi pi-times"
                rounded
                outlined
                severity="danger"
                aria-label="Cancel"
                onClick={() => { onDeleteButtonClick() }}
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