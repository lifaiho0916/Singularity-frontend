import React, { type FC, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { SizeStyleProps } from './SizeStyle.type';
import './SizeStyle.scss'
import { useDispatch } from 'react-redux';
import { updateSelectedElementInViewTree } from 'store/slices/viewTreeSlice';

const SizeStyle:FC<SizeStyleProps> = ({item}) => {
    const dispatch= useDispatch();
    const setSize = (newFontSize: any) => {
        if (!item || !item.style) return;
        dispatch(
            updateSelectedElementInViewTree({
                ...item,
                style: {
                    ...item.style,
                    fontSize: `${newFontSize}px`
                },
          })
        );
    };

    const setCharacter = (newLetterSpace: any) => {
        if (!item || !item.style) return;
        dispatch(
            updateSelectedElementInViewTree({
                ...item,
                style: {
                    ...item.style,
                    letterSpacing: `${newLetterSpace}px`,
                },
          })
        );
    };

    const setLine = (newLineHeight: any) => {
        if (!item || !item.style) return;
        dispatch(
            updateSelectedElementInViewTree({
                ...item,
                style: {
                    ...item.style,
                    lineHeight: `${newLineHeight}px`
                },
          })
        );
    };

    const setParagraph = (newTextIndent: any) => {
        if (!item || !item.style) return;
        dispatch(
            updateSelectedElementInViewTree({
                ...item,
                style: {
                    ...item.style,
                    textIndent: `${newTextIndent}px`,
                },
          })
        );
    };

    return (
        <div className="sizestyle-box">
            <div className="small-area">
                <input
                    type="text"
                    className="InputText"
                    id="size"
                    value={parseInt(item.style?.fontSize as string) || 0}
                    onChange={(e) => setSize(e.target.value)}
                />
                <label htmlFor="size">Size</label>
            </div>
            <div className="small-area">
                <input
                    type="text"
                    className="InputText"
                    id="character"
                    value={parseInt(item.style?.letterSpacing as string) || 0}
                    onChange={(e) => setCharacter(e.target.value)}
                />
                <label htmlFor="character">Character</label>
            </div>
            <div className="small-area">
                <input
                    type="text"
                    className="InputText"
                    id="line"
                    value={parseInt(item.style?.lineHeight as string) || 0}
                    onChange={(e) => setLine(e.target.value)}
                />
                <label htmlFor="line">Line</label>
            </div>
            <div className="small-area">
                <input
                    type="text"
                    className="InputText"
                    id="paragraph"
                    value={parseInt(item.style?.textIndent as string) || 0}
                    onChange={(e) => setParagraph(e.target.value)}
                />
                <label htmlFor="paragraph">Paragraph</label>
            </div>
        </div>
    );
};

export default SizeStyle;
