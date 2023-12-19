import { type FC } from 'react';
import { ToolbarProps } from "./Toolbar.types";
import { ToolbarItem } from 'components'
import './Toolbar.scss';

const Toolbar:FC<ToolbarProps> = ({ items, onClicked }) => {
  return (
    <div className="toolbar">
      {items.map((item, index)=>(
        <ToolbarItem item={item} onClicked={onClicked} key={index} index={index}/>
      ))}
    </div>
  )
}

export default Toolbar;