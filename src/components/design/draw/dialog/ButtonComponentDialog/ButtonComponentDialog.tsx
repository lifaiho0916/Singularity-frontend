import { type FC } from 'react';
import { Button } from 'primereact/button';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonComponentDialogProps } from "./ButtonComponentDialog.types";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Divider } from 'primereact/divider';
import { CascadeSelect } from 'primereact/cascadeselect';
import { COLORS, BUTTON_TYPES, BUTTON_SIZES } from 'constants/';
import type { RootState } from 'store';
import { IElement } from 'libs/types';
import { deleteSelectedElementInViewTree, updateSelectedElementInViewTree } from 'store/slices/viewTreeSlice';
import './ButtonComponentDialog.scss';
import SizeStyle from '../shared/SizeStyle/SizeStyle';
import AlignmentSelector from '../shared/AlignmentSelector/AlignmentSelector';
import TextAlignmentSelector from '../shared/TextAlignmentSelector/TextAlignmentSelector';
import BorderRadiusSelector from '../shared/BorderRadiusSelector/BorderRadiusSelector';
import { current } from '@reduxjs/toolkit';

const ButtonComponentDialog: FC<ButtonComponentDialogProps> = () => {
  const dispatch = useDispatch();
  const { currentElement, viewTrees } = useSelector((state: RootState) => state.viewTree)

  const onDelete = () => {
    if (!currentElement || !currentElement.content) return
    dispatch(deleteSelectedElementInViewTree(currentElement));
  }

  const onTextChange = (newText: string) => {
    if (!currentElement || !currentElement.content) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      content: newText
    }));
  }
  const onWidthChange = (newWidth: number) => {
    if (!currentElement || !currentElement.content) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      style: {
        ...currentElement.style,
        width: newWidth
      }
    }));
  }

  const onHeightChange = (newHeight: number) => {
    if (!currentElement || !currentElement.content) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      style: {
        ...currentElement.style,
        height: newHeight
      }
    }));
  }

  const onColorChange = (newColor: string) => {
    if (!currentElement || !currentElement.detail) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      detail: {
        ...currentElement.detail,
        color: newColor
      }
    }));
  }

  const onButtonSizeChange = (newSize: string) => {
    if (!currentElement || !currentElement.detail) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      detail: {
        ...currentElement.detail,
        size: newSize
      }
    }));
  }

  const onButtonTypeChange = (newType: string) => {
    if (!currentElement || !currentElement.detail) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      detail: {
        ...currentElement.detail,
        type: newType
      }
    }));
  }

  const onLinkChange = (newLink: string) => {
    if (!currentElement || !currentElement.content) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      link: newLink
    }));
  }
  return currentElement ? (
    <div className="button-component-dialog">
      <div className="button-header">
        <label>BUTTON PROPERTIES</label>
      </div>
      <div className="button-body">
        <div className="section-header">
          <h4>Text</h4>
        </div>
        <div className="section-body">
          <InputText
            type='text'
            className='input-text'
            value={currentElement.content}
            onChange={(e) => onTextChange(e.target.value)}
          />
        </div>
        <Divider className="custom-divider" />

        <AlignmentSelector item={currentElement}/>
        <Divider className="custom-divider" />

        <div className="section-header">
          <h4>Link</h4>
        </div>
        <div className="section-body">
          <CascadeSelect
            value={currentElement.link}
            options={viewTrees.map((view: IElement) => view?.id)}
            optionGroupChildren={[]}
            onChange={(e) => onLinkChange(e.value)}
            className='input-text'
          />
        </div>
        <Divider className="custom-divider" />

        <div className="section-header">
          <h4>Size</h4>
        </div>
        <div className="section-body">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '49%',
                alignItems: 'center'
              }}
            >
              <h5 style={{ marginRight: 5 }}>W:</h5>
              <InputNumber
                style={{
                  height: 32
                }}
                suffix='px'
                value={currentElement.size.width}
                onChange={(e) => onWidthChange(Number(e.value))}
                min={0}
              />
            </div>
            <div
              style={{
                display: 'flex',
                width: '49%',
                alignItems: 'center'
              }}
            >
              <h5 style={{ marginRight: 5 }}>H:</h5>
              <InputNumber
                style={{
                  height: 32
                }}
                suffix="px"
                value={currentElement.size.height}
                onChange={(e) => onHeightChange(Number(e.value))}
                min={0}
              />
            </div>
          </div>
        </div>

        <Divider className="custom-divider" />        
        <div className="section-header">
          <h4>Type</h4>
        </div>
        <div className='section-body'>
          <CascadeSelect
            value={currentElement.detail?.type}
            options={BUTTON_TYPES}
            optionGroupChildren={[]}
            className='input-text'
            onChange={(e) => onButtonTypeChange(e.value)}
          />
        </div>
        <Divider className="custom-divider" />

        <div className="section-header">
          <h4>Color</h4>
        </div>
        <div className="section-body">
          <CascadeSelect
            value={currentElement.detail?.color}
            options={COLORS}
            optionGroupChildren={[]}
            className='input-text'
            onChange={(e) => onColorChange(e.value)}
          />
        </div>

        <div className="section-header">
          <h4>Button Size</h4>
        </div>
        <div className='section-body'>
          <CascadeSelect
            value={currentElement.detail?.size}
            options={BUTTON_SIZES}
            optionGroupChildren={[]}
            className='input-text'
            onChange={(e) => onButtonSizeChange(e.value)}
          />
        </div>
        <SizeStyle item = {currentElement} />

        <Divider className="custom-divider" />
        <TextAlignmentSelector item = {currentElement} />

        <Divider className="custom-divider" />
        <BorderRadiusSelector item = {currentElement} />

        <Divider className="custom-divider" />
        <div className="section-footer">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5
            }}
          >
            <Button label="Delete" severity="danger" onClick={onDelete}></Button>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default ButtonComponentDialog;