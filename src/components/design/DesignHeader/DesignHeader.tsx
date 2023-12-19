import { type FC } from 'react'
import { Button } from 'primereact/button';
import { CascadeSelect } from 'primereact/cascadeselect';
import { DesignHeaderProps } from './DesignHeaderProps';

const DesignHeader : FC<DesignHeaderProps> = ({
  responsive,
  setResponsive,
  zoom,
  setZoom
}) => {
  return (
    <>
      <div className='workspace-header'>
        <div className='responsive-tool'>
          <Button
            icon="pi pi-desktop" text
            raised={responsive === 'desktop'}
            onClick={() => setResponsive('desktop')}
          />
          <Button
            icon="pi pi-tablet" text
            raised={responsive === 'tablet'}
            onClick={() => setResponsive('tablet')}
          />
          <Button
            icon="pi pi-mobile" text
            raised={responsive === 'mobile'}
            onClick={() => setResponsive('mobile')}
          />
        </div>
        <div className='view-tool'>
          <CascadeSelect
            value={`${zoom * 100}%`}
            onChange={(e) => {
              setZoom(Number(e.value.substring(0, e.value.length - 1)) / 100);
            }}
            options={['50%', '75%', '100%', '125%', '150%']}
            optionGroupChildren={[]}
          />
        </div>
      </div>
    </>
  )
}

export default DesignHeader