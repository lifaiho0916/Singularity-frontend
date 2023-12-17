import { type FC } from 'react';
import { ImageComponentDialogProps } from "./ImageComponentDialog.types";
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { CascadeSelect } from 'primereact/cascadeselect';
import './ImageComponentDialog.scss';

const ImageComponentDialog: FC<ImageComponentDialogProps> = () => {
  return (
    <div className="image-component-dialog">
      <div className="image-header">
        <label>IMAGE PROPERTIES</label>
      </div>
      <div className="image-body">
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
      </div>
    </div>
  )
}

export default ImageComponentDialog;