import { useMemo, type FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Divider } from 'primereact/divider';
import { CascadeSelect } from 'primereact/cascadeselect';
import { InputTextarea } from 'primereact/inputtextarea';
import { ColorPicker } from 'primereact/colorpicker';
import type { RootState } from 'store';
import { deleteSelectedElementInViewTree, updateSelectedElementInViewTree } from 'store/slices/viewTreeSlice';
import './TextComponentDialog.scss';
import { TextComponentDialogProps } from "./TextComponentDialog.types";
import SizeStyle from '../shared/SizeStyle/SizeStyle';
import AlignmentSelector from '../shared/AlignmentSelector/AlignmentSelector';
import TextAlignmentSelector from '../shared/TextAlignmentSelector/TextAlignmentSelector';

const TextComponentDialog: FC<TextComponentDialogProps> = () => {
  const dispatch = useDispatch();
  const { currentElement } = useSelector((state: RootState) => state.viewTree)

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
      size: {
        ...currentElement.size,
        width: newWidth
      }
    }));
  }

  const onHeightChange = (newHeight: number) => {
    if (!currentElement || !currentElement.content) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      size: {
        ...currentElement.size,
        height: newHeight
      }
    }));
  }

  const onFontSizeChange = (newFontSize: number) => {
    if (!currentElement || !currentElement.content) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      style: {
        ...currentElement.style,
        fontSize: newFontSize
      }
    }));
  }

  const onFontFamilyChange = (newFontFamily: string) => {
    if (!currentElement || !currentElement.content) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
        style: {
          ...currentElement.style,
          fontFamily: newFontFamily
        }
    }));
  }

  const onFontWeightChange = (newFontWeight: string) => {
    if (!currentElement || !currentElement.content) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      style: {
        ...currentElement.style,
        fontWeight: fontWeightNumber(newFontWeight)
      }
    }));
  }

  const onFontColorChange = (newFontColor: string) => {
    if (!currentElement || !currentElement.content) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      style: {
        ...currentElement.style,
        color: '#' + newFontColor
      }
    }));
  }

  const fontWeight = useMemo(() => {
    if (currentElement) {
      if (currentElement.style.fontWeight) {
        switch (currentElement.style.fontWeight) {
          case 200: return 'Light';
          case 400: return 'Normal';
          case 600: return 'Semi-Bold';
          case 700: return 'Bold';
        }
      } return 'Normal'
    }
  }, [currentElement])

  const fontWeightNumber = (fontWeight: string) => {
    switch (fontWeight) {
      case 'Light': return 200;
      case 'Normal': return 400;
      case 'Semi-Bold': return 600;
      case 'Bold': return 700;
    }
  }

  return currentElement ? (
    <div className="text-component-dialog">
      <div className="text-header">
        <label>TEXT PROPERTIES</label>
      </div>
      <div className="text-body">
        <div className="section-header">
          <h4>Text</h4>
        </div>
        <div className="section-body">
          <InputTextarea
            style={{ width: '100%' }}
            rows={1}
            value={currentElement.content}
            onChange={(e) => onTextChange(e.target.value)}
          // autoResize={true}
          />
        </div>
        <Divider className="custom-divider" />

        <AlignmentSelector item={currentElement} />
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
                suffix="px"
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
          <h4>Font</h4>
        </div>
        <div className="section-body">
          <CascadeSelect
            value={currentElement.style.fontFamily ? currentElement.style.fontFamily : 'Default'}
            options={['Default', 'Arial', 'Times New Roman', 'Calibri']}
            optionGroupChildren={[]}
            className='input-text'
            onChange={(e) => onFontFamilyChange(e.value)}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 5
            }}
          >
            <CascadeSelect
              value={fontWeight}
              options={['Light', 'Normal', 'Semi-Bold', 'Bold']}
              optionGroupChildren={[]}
              className='input-text'
              onChange={(e) => onFontWeightChange(e.value)}
            />
            <ColorPicker
              format="hex"
              value={currentElement.style.color ? currentElement.style.color.substring(1) : '000000'}
              style={{ marginLeft: 5 }}
              onChange={(e) => onFontColorChange(e.value as string)}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 5,
              alignItems: 'center'
            }}
          >
            <h5 style={{ marginRight: 5 }}>Size:</h5>
            <InputNumber
              style={{
                height: 32
              }}
              min={0}
              value={currentElement.style.fontSize ? Number(currentElement.style.fontSize) : 10}
              onChange={(e) => onFontSizeChange(Number(e.value))}
            />
            <SizeStyle item = {currentElement} />
          </div>     
        </div>

        <Divider className="custom-divider" />

        <TextAlignmentSelector item = {currentElement} />

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

export default TextComponentDialog;