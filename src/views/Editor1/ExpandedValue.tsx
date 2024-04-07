import * as React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './data';

const ExpandedValue = ({
  value,
  removeValue,
}: {
  value: React.ReactNode,
  removeValue: () => void,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.VALUE,
    item: { type: ItemTypes.VALUE, value },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        removeValue();
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div className="value" ref={drag}>
      {value}
    </div>
  );

};
export default ExpandedValue;
