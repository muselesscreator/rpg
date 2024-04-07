import * as React from 'react';
import classNames from 'classnames';
import { useDrop } from 'react-dnd';

import { ItemTypes } from './data';
import ExpandedGem from './ExpandedGem';

const EditorRow = () => {
  const [contents, setContents] = React.useState();
  const [hasDropped, setHasDropped] = React.useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = React.useState(false);
  const [{ isOverCurrent }, drop] = useDrop({
    accept: [ItemTypes.GEM, ItemTypes.VALUE],
    drop: (item: any, monitor) => {
      console.log({ item, monitor });
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      setHasDropped(true);
      setHasDroppedOnChild(didDrop);
      setContents(item);
      // handle drop
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });
  const removeGem = () => setContents(null);

  return (
    <div ref={drop} className={classNames('editor-row', { 'is-over': isOverCurrent })} >
      {contents 
        ? <ExpandedGem {...contents} removeGem={removeGem} /> 
        : null
      }
    </div>
  );
}
export default EditorRow;
