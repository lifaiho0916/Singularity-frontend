import { type FC, useState } from 'react';
import { Button } from 'primereact/button';
import { ToolbarItemProps } from "./ToolbarItem.types";
import './ToolbarItem.scss';

const ToolbarItem:FC<ToolbarItemProps> = ({index, item, onClicked}) => {

  return (
    <Button 
      className='toolbar-item'
      label={item} 
      severity='secondary'
      size="small"
      onMouseDown={()=>{ 
        onClicked(index); 
      }}
      // icon={`pi ${selected?'pi-check':''}`}
    />
  )
}

export default ToolbarItem;