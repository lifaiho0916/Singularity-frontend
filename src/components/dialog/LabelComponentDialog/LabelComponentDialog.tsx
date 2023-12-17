import { type FC } from 'react';
import { LabelComponentDialogProps } from "./LabelComponentDialog.types";
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { CascadeSelect } from 'primereact/cascadeselect';
import { ColorPicker } from 'primereact/colorpicker';
import './LabelComponentDialog.scss';

const LabelComponentDialog: FC<LabelComponentDialogProps> = () => {
  return (
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
          />
        </div>
        <Divider className="custom-divider" />

        <div className="section-header">
          <h4>Link</h4>
        </div>
        <div className="section-body">
          <CascadeSelect
            value="First Screen"
            options={['First Screen', 'Second Screen', 'Third Screen', 'Fourth Screen']}
            optionGroupChildren={[]}
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
              <InputText
                type='text'
                className='input-text'
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
              <InputText
                type='text'
                className='input-text'
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
            value="Arial"
            options={['Arial', 'Times New Roman', 'Calibri']}
            optionGroupChildren={[]}
            className='input-text'
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 5
            }}
          >
            <CascadeSelect
              value="Medium"
              options={['Medium', 'Semi-Bold', 'Bold']}
              optionGroupChildren={[]}
              className='input-text'
            />
            <ColorPicker />
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
            <InputText
              type='text'
              className='input-text'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LabelComponentDialog;