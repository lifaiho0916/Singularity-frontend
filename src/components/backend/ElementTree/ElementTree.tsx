import { type FC, useState, useEffect } from 'react';
import { DndProvider } from "react-dnd";
import {
  Tree,
  MultiBackend,
  getBackendOptions
} from "@minoru/react-dnd-treeview";
import { ITreeStructure, IElement, IComponentType } from 'libs/types';
import { ElementTreeProps } from "./ElementTree.types";
import './ElementTree.scss';

const getSubData = (item: IElement) : ITreeStructure[] => {
  if (item.child.length > 0) {
    let subItems: ITreeStructure[] = []
    for (const subItem of item.child) {
      subItems.push(...getSubData(subItem))
    }
    return [{
      id : item.id,
      parent : item.parent.startsWith('root') ? '0' : item.parent,
      droppable : item.type === IComponentType.Wrapper ? true : false,
      text : item.name
    }, ...subItems];
  } else {
    return [{
      id : item.id,
      parent : item.parent.startsWith('root') ? '0' : item.parent,
      droppable : item.type === IComponentType.Wrapper ? true : false,
      text : item.name
    }];
  }
}

const getTreeData = (viewTrees : IElement[]) : ITreeStructure[] => {
  let treeData : ITreeStructure[] = [];
  viewTrees.forEach((view) => {
    treeData.push(...getSubData(view))
  })
  return treeData;
}

const ElementTree: FC<ElementTreeProps> = ({ item }) => {
  const [treeData, setTreeData] = useState<ITreeStructure[]>([])
  const handleDrop = (newTree: any) => setTreeData(newTree)  
  
  useEffect(() => {
    console.log("--------------------", item)
    let val = getTreeData(item)
    console.log(val)
    setTreeData(val)
  }, [item])
  return (
    <div>
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Tree
          tree={treeData}
          rootId={'0'}
          render={(node, { depth, isOpen, onToggle }) => (
            <div style={{ marginInlineStart: depth * 10 }}>
              {node.droppable && (
                <span onClick={onToggle}>{isOpen ? "-" : "+"}</span>
              )}
              {node.text}
            </div>
          )}
          dragPreviewRender={(monitorProps) => (
            <div>{monitorProps.item.text}</div>
          )}
          onDrop={handleDrop}
        />
      </DndProvider>
    </div>
  )
  // return (
  //   <div>
  //     <div>
  //       <strong>Name:</strong> {item.name}
  //     </div>
  //     <ul>
  //       {item.child.map((child) => (
  //         <li key={child.id}>
  //           <ElementTree item={child} />
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // )
}

export default ElementTree;