import { type FC } from 'react'
import { Button } from 'primereact/button';
import { CascadeSelect } from 'primereact/cascadeselect';
import { DesignHeaderProps } from './DesignHeader.types';
import { useSelector, useDispatch } from 'react-redux';
import { setZoom, setResponsive } from 'store/slices/viewTreeSlice';
import type { RootState } from 'store';

const DesignHeader: FC<DesignHeaderProps> = () => {
  const dispatch = useDispatch();
  const { zoom, responsive } = useSelector((state: RootState) => state.viewTree);

  return (
    <>
      <div className='workspace-header'>
        <div className='responsive-tool'>
          <Button
            icon="pi pi-desktop" text
            style={{ margin: '0px 5px' }}
            raised={responsive === 'desktop'}
            onClick={() => dispatch(setResponsive('desktop'))}
          />
          <Button
            icon="pi pi-tablet" text
            style={{ margin: '0px 5px' }}
            raised={responsive === 'tablet'}
            onClick={() => dispatch(setResponsive('tablet'))}
          />
          <Button
            icon="pi pi-mobile" text
            style={{ margin: '0px 5px' }}
            raised={responsive === 'mobile'}
            onClick={() => dispatch(setResponsive('mobile'))}
          />
        </div>
        <div className='view-tool'>
          <CascadeSelect
            value={`${zoom * 100}%`}
            onChange={(e) => {
              dispatch(setZoom(Number(e.value.substring(0, e.value.length - 1)) / 100));
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