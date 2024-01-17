import { type FC } from 'react';
import { ElementTreeProps } from "./ElementTree.types";
import './ElementTree.scss';

const ElementTree: FC<ElementTreeProps> = ({ item }) => {
  return (
    <div>
      <div>
        <strong>ID:</strong> {item.id}, <strong>Name:</strong> {item.name}
      </div>
      <ul>
        {item.child.map((child) => (
          <li key={child.id}>
            <ElementTree item={child} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ElementTree;