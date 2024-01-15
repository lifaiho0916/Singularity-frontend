import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { AlignmentSelectorProps } from './AlignmentSelector.types'
import { updateSelectedElementInViewTree } from 'store/slices/viewTreeSlice';
import AlignLeftIcon from 'assets/images/alignment-left.png';
import AlignCenterIcon from 'assets/images/alignment-center.png';
import AlignRightIcon from 'assets/images/alignment-right.png';
import AlignStartIcon from 'assets/images/alignment-start.png';
import AlignMiddleIcon from 'assets/images/alignment-middle.png';
import AlignEndIcon from 'assets/images/alignment-end.png';
import './AlignmentSelector.scss'
import { IComponentType } from 'libs/types';

const AlignmentSelector: FC<AlignmentSelectorProps> = ({ item }) => {
  const [selectedItemAlign, setSelectedItemAlign] = useState<string>('start');
  const [selectedJustifyContent, setSelectedJustifyContent] = useState<string>('start');
  const dispatch = useDispatch();

  const onSelectItemAlign = (newAlignItems: string) => {
    if (!item || !item.style) return;

    if(item.type === IComponentType.Wrapper && item.style.flexDirection === "column")
      dispatch(
        updateSelectedElementInViewTree({
          ...item,
          style: {
            ...item.style,
            justifyContent: newAlignItems,
          },
        })
      );
    else 
      dispatch(
        updateSelectedElementInViewTree({
          ...item,
          style: {
            ...item.style,
            alignItems: newAlignItems,
          },
        })
      );
  };

  const onSelectJustifyContent = (newJustifyContent: string) => {
    if (!item || !item.style) return;

    if(item.type === IComponentType.Wrapper && item.style.flexDirection === "column")
      dispatch(
        updateSelectedElementInViewTree({
          ...item,
          style: {
            ...item.style,
            alignItems: newJustifyContent,
          },
        })
      );
    else 
      dispatch(
        updateSelectedElementInViewTree({
          ...item,
          style: {
            ...item.style,
            justifyContent: newJustifyContent,
          },
        })
      );
  };

  const handleItemAlignClick = (alignment: string) => {
    setSelectedItemAlign(alignment);
    onSelectItemAlign(alignment);
  };

  const handleJustifyContentClick = (alignment: string) => {
    setSelectedJustifyContent(alignment);
    onSelectJustifyContent(alignment);
  };

  return (
    <div className='alignment-bar'>
      {/* <h4>Item Align</h4> */}
      <Button
        severity='secondary'
        className={`icon-button ${selectedJustifyContent === 'start' ? 'selected' : ''}`}
        onClick={() => handleJustifyContentClick('start')}
        style={{ backgroundImage: `url(${AlignLeftIcon})` }}
      />
      <Button
        severity='secondary'
        className={`icon-button ${selectedJustifyContent === 'center' ? 'selected' : ''}`}
        onClick={() => handleJustifyContentClick('center')}
        style={{ backgroundImage: `url(${AlignCenterIcon})` }}
      />
      <Button
        severity='secondary'
        className={`icon-button ${selectedJustifyContent === 'end' ? 'selected' : ''}`}
        onClick={() => handleJustifyContentClick('end')}
        style={{ backgroundImage: `url(${AlignRightIcon})` }}
      />

      {/* <h4>Justify Content</h4> */}
      <Button
        severity='secondary'
        className={`icon-button ${selectedItemAlign === 'start' ? 'selected' : ''}`}
        onClick={() => handleItemAlignClick('start')}
        style={{ backgroundImage: `url(${AlignStartIcon})` }}
      />
      <Button
        severity='secondary'
        className={`icon-button ${selectedItemAlign === 'center' ? 'selected' : ''}`}
        onClick={() => handleItemAlignClick('center')}
        style={{ backgroundImage: `url(${AlignMiddleIcon})` }}
      />
      <Button
        severity='secondary'
        className={`icon-button ${selectedItemAlign === 'end' ? 'selected' : ''}`}
        onClick={() => handleItemAlignClick('end')}
        style={{ backgroundImage: `url(${AlignEndIcon})` }}
      />
    </div>
  );
};

export default AlignmentSelector;