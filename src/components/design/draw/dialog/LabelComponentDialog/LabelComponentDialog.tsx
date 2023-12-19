import { useMemo, type FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LabelComponentDialogProps } from "./LabelComponentDialog.types";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Divider } from 'primereact/divider';
import { CascadeSelect } from 'primereact/cascadeselect';
import { ColorPicker } from 'primereact/colorpicker';
import type { RootState } from 'store';
import { updateSelectedElementInViewTree } from 'store/slices/viewTreeSlice';
import './LabelComponentDialog.scss';

const LabelComponentDialog: FC<LabelComponentDialogProps> = () => {
  const dispatch = useDispatch();
  const { currentElement, xMultiplier, yMultiplier } = useSelector((state: RootState) => state.viewTree)

  const onTextChange = (newText: string) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({ ...currentElement, details: { ...currentElement.details, text: newText } }));
  }

  const onWidthChange = (newWidth: number) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({ ...currentElement, x: { ...currentElement.x, max: newWidth } }));
  }

  const onHeightChange = (newHeight: number) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({ ...currentElement, y: { ...currentElement.y, max: newHeight } }));
  }

  const onFontSizeChange = (newFontSize: number) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      details: {
        ...currentElement.details,
        style: {
          ...currentElement.details.style,
          fontSize: newFontSize
        }
      }
    }));
  }

  const onFontFamilyChange = (newFontFamily: number) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      details: {
        ...currentElement.details,
        style: {
          ...currentElement.details.style,
          fontFamily: newFontFamily
        }
      }
    }));
  }

  const onFontWeightChange = (newFontWeight: string) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      details: {
        ...currentElement.details,
        style: {
          ...currentElement.details.style,
          fontWeight: fontWeightNumber(newFontWeight)
        }
      }
    }));
  }

  const onFontColorChange = (newFontColor: string) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      details: {
        ...currentElement.details,
        style: {
          ...currentElement.details.style,
          color: '#' + newFontColor
        }
      }
    }));
  }

  const fontWeight = useMemo(() => {
    if (currentElement) {
      if (currentElement.details.style.fontWeight) {
        switch (currentElement.details.style.fontWeight) {
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
    <div className="label-component-dialog">
      <div className="label-header">
        <label>LABEL PROPERTIES</label>
      </div>
      <div className="label-body">
        <div className="section-header">
          <h4>Text</h4>
        </div>
        <div className="section-body">
          <InputText
            type='text'
            className='input-text'
            value={currentElement.details?.text}
            onChange={(e) => onTextChange(e.target.value)}
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
                prefix="%"
                value={currentElement.x.max}
                onChange={(e) => onWidthChange(Number(e.value))}
                min={0}
                max={100}
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
                prefix="%"
                value={currentElement.y.max}
                onChange={(e) => onHeightChange(Number(e.value))}
                min={0}
                max={100}
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
            value={currentElement.details.style.fontFamily ? currentElement.details.style.fontFamily : 'Default'}
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
              value={currentElement.details.style.color ? currentElement.details.style.color.substring(1) : '000000'}
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
              value={currentElement.details.style?.fontSize}
              onChange={(e) => onFontSizeChange(Number(e.value))}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default LabelComponentDialog;