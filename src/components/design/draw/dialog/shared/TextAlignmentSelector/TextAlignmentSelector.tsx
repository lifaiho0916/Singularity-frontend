import { FC, useState } from 'react';
import { Button } from 'primereact/button';
import { TextAlignmentSelectorProps } from './TextAlignmentSelector.types'
import './TextAlignmentSelector.scss'
import { useDispatch } from 'react-redux';
import { updateSelectedElementInViewTree } from 'store/slices/viewTreeSlice';

const TextAlignmentSelector: FC<TextAlignmentSelectorProps> = ({ item }) => {
  const [selectedItemAlign, setSelectedItemAlign] = useState<string>('start');
  const [selectedJustifyContent, setSelectedJustifyContent] = useState<string>('start');
  const dispatch = useDispatch();
  
  const updateTextAlign = (newTextAlign: any) => {
    if (!item || !item.style) return;
    dispatch(
      updateSelectedElementInViewTree({
        ...item,
        style: {
          ...item.style,
          textAlign: newTextAlign
        },
      })
    );
  };

  const handleTextAlignmentClick = (alignment: string) => {
    setSelectedItemAlign(alignment);
    updateTextAlign(alignment);
  };

  return (
    <>
      <div className="section-header">
        <h4>Text Alignment</h4>
      </div>

      <div className='textalign-bar'>
        <Button
          severity='secondary'
          icon="pi pi-align-left"
          className={`icon-button ${selectedItemAlign === 'start' ? 'selected' : ''}`}
          onClick={() => handleTextAlignmentClick('start')}
        />
        <Button
          icon="pi pi-align-center"
          severity='secondary'
          className={`icon-button ${selectedItemAlign === 'center' ? 'selected' : ''}`}
          onClick={() => handleTextAlignmentClick('center')}
        />
        <Button
          severity='secondary'
          icon="pi pi-align-right"
          className={`icon-button ${selectedItemAlign === 'end' ? 'selected' : ''}`}
          onClick={() => handleTextAlignmentClick('end')}
        />
        <Button
          severity='secondary'
          icon="pi pi-align-justify"
          className={`icon-button ${selectedItemAlign === 'justify' ? 'selected' : ''}`}
          onClick={() => handleTextAlignmentClick('justify')}
        />
      </div>
    </>
  );
};

export default TextAlignmentSelector;