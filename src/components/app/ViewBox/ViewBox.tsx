import * as React from "react";
import { type FC } from 'react';
import { Button } from "primereact/button";
import { ViewBoxProps } from "./ViewBox.types";
import './ViewBox.scss';

const ViewBox: FC<ViewBoxProps> = ({ content, style, setContent }) => {
  const [isShowSpliter, setIsShowSpliter] = React.useState(false);
  const [isShowVerticalLine, setIsShowVerticalLine] = React.useState(false);
  const [isShowHorizontalLine, setIsShowHorizontalLine] = React.useState(false);

  return (
    <div
      className="view-box"
      onMouseEnter={() => { setIsShowSpliter(true) }}
      onMouseLeave={() => { setIsShowSpliter(false) }}
      style={{ ...style, border: content.length > 0 ? 0 : undefined }}
    >
      {content.length > 0 ?
        <React.Fragment>
          {content[0].horizontalView ?
            <div className="horizontal-view">
              <ViewBox content={content[0].horizontalView.content} style={{ height: '50%' }} setContent={(co) => {
                let updatedContent = { ...content }
                updatedContent[0].horizontalView.content = co
              }} />
              <ViewBox content={content[1].horizontalView.content} style={{ height: '50%' }} setContent={(co) => {
                let updatedContent = { ...content }
                updatedContent[1].horizontalView.content = co
              }} />
            </div>
            : content[0].verticalView ?
              <div className="vertical-view">
                <ViewBox content={content[0].verticalView.content} style={{ width: '50%' }} setContent={(co) => {
                  let updatedContent = { ...content }
                  updatedContent[0].verticalView.content = co
                }} />
                <ViewBox content={content[1].verticalView.content} style={{ width: '50%' }} setContent={(co) => {
                  let updatedContent = { ...content }
                  updatedContent[1].verticalView.content = co
                }} />
              </div>
              :
              <div className="horizontal-view">
                {content.map((co: any, index: number) => (
                  <div key={index} style={{ height: `${100 / content.length}%`, border: '1px solid' }}></div>
                ))}
              </div>
          }
        </React.Fragment>
        :
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
                onClick={() => {
                  if (setContent)
                    setContent([
                      {
                        verticalView: {
                          name: "",
                          align: {
                            vertical: "center",
                            horizontal: "center"
                          },
                          content: []
                        }
                      },
                      {
                        verticalView: {
                          name: "",
                          align: {
                            vertical: "center",
                            horizontal: "center"
                          },
                          content: []
                        }
                      }
                    ])
                }}
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
                onClick={() => {
                  if (setContent)
                    setContent([
                      {
                        horizontalView: {
                          name: "",
                          align: {
                            vertical: "center",
                            horizontal: "center"
                          },
                          content: []
                        }
                      },
                      {
                        horizontalView: {
                          name: "",
                          align: {
                            vertical: "center",
                            horizontal: "center"
                          },
                          content: []
                        }
                      }
                    ])
                }}
              />
            </React.Fragment>
            : null
          }
        </React.Fragment>
      }
    </div>
  )
}

export default ViewBox;