import { type FC } from 'react'
import { Button } from 'primereact/button';
import { CascadeSelect } from 'primereact/cascadeselect';
import { DesignHeaderProps } from './DesignHeader.types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import type { RootState } from 'store';
import { setZoom } from 'store/slices/projectSlice';

const DesignHeader: FC<DesignHeaderProps> = ({
  responsive,
  setResponsive,
}) => {
  const dispatch = useDispatch();
  const { zoom } = useSelector((state: RootState) => state.project);

  return (
    <>
      <div className='workspace-header'>
        <div className='responsive-tool'>
          {/* <Button
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
          /> */}
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