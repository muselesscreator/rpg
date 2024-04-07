import classNames from 'classnames';

import { ItemTypes } from './data';
import Gem from './Gem';
import Value from './Value';
import Variable from './Variable';
import * as types from './types';

import useDropBehavior from './useDropBehavior';

const EditorRow = () => {
  const {
    contents,
    drop,
    isOverCurrent,
    removeContents,
  } = useDropBehavior({ canDrop: true });

  const type = contents?.type;
  const renderGem = () => (
    <Gem {...(contents as types.DroppableGem)} removeSelf={removeContents} />
  );
  const renderValue = () => (
    <Value {...(contents as types.DroppableValue)} removeSelf={removeContents} />
  );
  const renderVariable = () => (
    <Variable {...(contents as types.DroppableVariable)} removeSelf={removeContents} />
  );

  return (
    <div ref={drop} className={classNames('editor-row', { 'is-over': isOverCurrent })} >
      {(type === ItemTypes.GEM) && renderGem()}
      {(type === ItemTypes.VALUE) && renderValue()}
      {(type === ItemTypes.VARIABLE) && renderVariable()}
    </div>
  );
};
export default EditorRow;
