import { type FC } from 'react';
import { ButtonComponentDialogProps } from "./ButtonComponentDialog.types";
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { CascadeSelect } from 'primereact/cascadeselect';
import { ColorPicker } from 'primereact/colorpicker';
import './ButtonComponentDialog.scss';

const ButtonComponentDialog: FC<ButtonComponentDialogProps> = () => {
  return (
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

        <div
          className="section-header"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 10
          }}
        >
          <h4 style={{ marginRight: 10 }}>Color:</h4>
          <ColorPicker />
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
            }
            }>
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

export default ButtonComponentDialog;