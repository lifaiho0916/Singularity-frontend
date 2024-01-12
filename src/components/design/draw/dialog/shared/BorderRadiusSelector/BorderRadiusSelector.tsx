import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { BorderRadiusSelectorProps } from './BorderRadiusSelector.types'
import { updateSelectedElementInViewTree } from 'store/slices/viewTreeSlice';
import { Slider } from 'primereact/slider';

import './BorderRadiusSelector.scss'

const BorderRadiusSelector: FC<BorderRadiusSelectorProps> = ({ item }) => {
  const dispatch = useDispatch();

  const updateBorderRadius = (newBorderRadius: any) => {
    if (!item || !item.style) return;
    dispatch(
      updateSelectedElementInViewTree({
        ...item,
        style: {
          ...item.style,
          borderRadius: `${newBorderRadius}px`
        },
      })
    );
  }

  return (
    <>
      <div className="section-header">
        <h4>Border Radius</h4>
      </div>
      <div className='section-body sameline'>
        <Slider style={{width: '80%'}} value={parseInt(item.style?.borderRadius as string) || 0} onChange={(e) => updateBorderRadius(e.value)} step={1} max={20} />
        <input type='text' className='valueInfoText' value={item.style?.borderRadius} />
      </div>
    </>
  );
};

export default BorderRadiusSelector;