import * as React from 'react';
import { useDrop } from 'react-dnd';

import { ItemTypes } from '../data';

import * as types from '../types';

const useSlotData = ({
  handleChange,
  canDrop,
  value,
  clearSlot,
}: {
  handleChange: (v: types.Droppable) => void;
  clearSlot: () => void;
  canDrop?: boolean;
  value?: types.Droppable,
}) => {
  const [contents, setContents] = React.useState<types.Droppable>(value);

  const loadValue = (newValue: types.Droppable) => {
    handleChange(newValue);
    setContents(newValue);
  };

  const removeContents = () => {
    setContents(undefined);
    if (value) {
      clearSlot();
    }
  }

  const [{ isOverCurrent }, drop] = useDrop({
    accept: [ItemTypes.GEM, ItemTypes.VALUE, ItemTypes.VARIABLE],
    drop: (item: types.Droppable, monitor) => {
      if (!canDrop || monitor.didDrop()) { return; }
      loadValue(item);
    },
    collect: (monitor) => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    contents ? {
      contents,
      isOverCurrent,
      drop,
      removeContents,
      onValuesChange: loadValue,
      type: contents.type,
    } : { isOverCurrent, drop }
  );
}
export default useSlotData;
