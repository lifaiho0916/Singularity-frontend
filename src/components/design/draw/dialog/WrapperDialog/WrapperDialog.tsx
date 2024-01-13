import { type FC } from 'react';
import { Button } from 'primereact/button';
import { useSelector, useDispatch } from 'react-redux';
import { WrapperDialogProps } from "./WrapperDialog.types";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Divider } from 'primereact/divider';
import { CascadeSelect } from 'primereact/cascadeselect';
import { COLORS, BUTTON_TYPES, BUTTON_SIZES } from 'constants/';
import type { RootState } from 'store';
import { IElement } from 'libs/types';
import { deleteSelectedElementInViewTree, updateSelectedElementInViewTree } from 'store/slices/viewTreeSlice';
import SizeStyle from '../shared/SizeStyle/SizeStyle';
import AlignmentSelector from '../shared/AlignmentSelector/AlignmentSelector';
import TextAlignmentSelector from '../shared/TextAlignmentSelector/TextAlignmentSelector';
import BorderRadiusSelector from '../shared/BorderRadiusSelector/BorderRadiusSelector';
import './WrapperDialog.scss';

const WrapperDialog: FC<WrapperDialogProps> = () => {
  const dispatch = useDispatch();
  const { currentElement } = useSelector((state: RootState) => state.viewTree)

  const onDelete = () => {
    if (!currentElement || !currentElement.content) return
    dispatch(deleteSelectedElementInViewTree(currentElement));
  }

  const onTextChange = (newText: string) => {
    if (!currentElement) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      name: newText
    }));
  }
  const onWidthChange = (newWidth: number) => {
    if (!currentElement) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      style: {
        ...currentElement.style,
        width: newWidth
      }
    }));
  }

  const onHeightChange = (newHeight: number) => {
    if (!currentElement) return
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

  return currentElement ? (
    <div className="wrapper-dialog">
      <div className="wrapper-header">
        <label>WRAPPER PROPERTIES</label>
      </div>
      <div className="wrapper-body">
        <div className="section-header">
          <h4>Name</h4>
        </div>
        <div className="section-body">
          <InputText
            type='text'
            className='input-text'
            value={currentElement.name}
            onChange={(e) => onTextChange(e.target.value)}
          />
        </div>

        <AlignmentSelector item={currentElement}/>
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

        <SizeStyle item = {currentElement} />
        <Divider className="custom-divider" />

        <TextAlignmentSelector item = {currentElement} />
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

export default WrapperDialog;