import classNames from 'classnames';

import Gem from '../Gem';
import Value from '../Value';
import Variable from '../Variable';
import { ItemTypes } from '../data';
import * as types from '../types';

import SlotImage from './SlotImage';
import useDropBehavior from '../useDropBehavior';


const Slot = ({
  className,
  handleChange,
  canDrop = false,
  value,
  clearSlot,
}: {
  className?: string;
  handleChange: (v: types.Droppable) => void;
  clearSlot: () => void;
  canDrop?: boolean;
  value?: types.Droppable;
}) => {
  const {
    contents,
    isOverCurrent,
    drop,
    removeContents,
    onValuesChange,
    type
  } = useDropBehavior({
    handleChange,
    canDrop,
    value,
    clearSlot,
  });

  const renderedClassName = classNames(
    className,
    'slot',
    { 'is-over': isOverCurrent },
  );

  const renderGem = () => (
    <Gem
      {...(contents as types.DroppableGem)}
      onValuesChange={onValuesChange}
      removeSelf={removeContents}
    />
  );
  const renderValue = () => (
    <Value
      {...(contents as types.DroppableValue)}
      removeSelf={removeContents}
    />
  );
  const renderVariable = () => (
    <Variable
      {...(contents as types.DroppableVariable)}
      removeSelf={removeContents}
    />
  );

  return contents
    ? (
      <div ref={drop} className={renderedClassName}>
        {(type === ItemTypes.GEM) && renderGem()}
        {(type === ItemTypes.VALUE) && renderValue()}
        {(type === ItemTypes.VARIABLE) && renderVariable()}
      </div>
    ) : (
      <SlotImage dropRef={drop} className={renderedClassName} />
    );
}
export default Slot;
