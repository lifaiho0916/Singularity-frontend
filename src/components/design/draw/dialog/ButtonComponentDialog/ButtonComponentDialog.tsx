import { type FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonComponentDialogProps } from "./ButtonComponentDialog.types";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Divider } from 'primereact/divider';
import { CascadeSelect } from 'primereact/cascadeselect';
import { Button } from 'primereact/button';
import { COLORS, BUTTON_TYPES, BUTTON_SIZES } from 'constants/';
import type { RootState } from 'store';
import { IView } from 'libs/types';
import { deleteSelectedElementInViewTree, updateSelectedElementInViewTree } from 'store/slices/projectSlice';
import './ButtonComponentDialog.scss';

const ButtonComponentDialog: FC<ButtonComponentDialogProps> = () => {
  const dispatch = useDispatch();
  const { currentElement, viewTrees } = useSelector((state: RootState) => state.project)

  const onDelete = () => {
    if (!currentElement || !currentElement.details) return
    dispatch(deleteSelectedElementInViewTree(currentElement));
  }

  const onTextChange = (newText: string) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      details: {
        ...currentElement.details,
        text: newText
      }
    }));
  }

  const onWidthChange = (newWidth: number) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      x: {
        ...currentElement.x,
        max: newWidth
      }
    }));
  }

  const onHeightChange = (newHeight: number) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      y: {
        ...currentElement.y,
        max: newHeight
      }
    }));
  }

  const onColorChange = (newColor: string) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      details: {
        ...currentElement.details,
        color: newColor
      }
    }));
  }

  const onButtonTypeChange = (newType: string) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      details: {
        ...currentElement.details,
        type: newType
      }
    }));
  }

  const onButtonSizeChange = (newSize: string) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      details: {
        ...currentElement.details,
        size: newSize
      }
    }));
  }

  const onLinkChange = (newLink: string) => {
    if (!currentElement || !currentElement.details) return
    dispatch(updateSelectedElementInViewTree({
      ...currentElement,
      details: {
        ...currentElement.details,
        link: viewTrees.filter((view: IView) => view?.name === newLink)[0].id
      }
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
            value={currentElement.details?.text}
            onChange={(e) => onTextChange(e.target.value)}
          />
        </div>
        <Divider className="custom-divider" />

        <div className="section-header">
          <h4>Link</h4>
        </div>
        <div className="section-body">
          <CascadeSelect
            value={viewTrees.filter((viewTree: IView) => viewTree.id === currentElement.details.link).length > 0 ? viewTrees.filter((viewTree: IView) => viewTree.id === currentElement.details.link)[0].name : ''}
            options={viewTrees.map((view: IView) => view?.name)}
            optionGroupChildren={[]}
            onChange={(e) => onLinkChange(e.value)}
            className='input-text'
          />
        </div>
        <Divider className="custom-divider" />

        <div className="section-header">
          <h4>Container Size</h4>
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
          <h4>Type</h4>
        </div>
        <div className='section-body'>
          <CascadeSelect
            value={currentElement.details?.type}
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
        <div className='section-body'>
          <CascadeSelect
            value={currentElement.details?.color}
            options={COLORS}
            optionGroupChildren={[]}
            className='input-text'
            onChange={(e) => onColorChange(e.value)}
          />
        </div>
        <Divider className="custom-divider" />

        <div className="section-header">
          <h4>Button Size</h4>
        </div>
        <div className='section-body'>
          <CascadeSelect
            value={currentElement.details?.size}
            options={BUTTON_SIZES}
            optionGroupChildren={[]}
            className='input-text'
            onChange={(e) => onButtonSizeChange(e.value)}
          />
        </div>
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
            <Button label="Delete" severity="danger" onClick={onDelete} />
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default ButtonComponentDialog;