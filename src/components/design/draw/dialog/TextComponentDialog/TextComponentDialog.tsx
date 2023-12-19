import { type FC } from 'react';
import { TextComponentDialogProps } from "./TextComponentDialog.types";
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { CascadeSelect } from 'primereact/cascadeselect';
import { InputTextarea } from 'primereact/inputtextarea';
import { ColorPicker } from 'primereact/colorpicker';
import './TextComponentDialog.scss';

const TextComponentDialog: FC<TextComponentDialogProps> = () => {
  return (
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
            autoResize={true}
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

export default TextComponentDialog;