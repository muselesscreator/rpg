import * as React from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';

import Slot from './Slot';
import { ItemTypes } from './data';
/**
 * A snippet of code that can be dragged into the editor, with sections that can have other gems or slots draged into them.
 * example: 
 */
const ExpandedGem = ({
  string,
  removeGem,
  gemValues = {},
}: {
  string: string,
  removeGem: () => void,
  gemValues?: Record<string, unknown>,
}) => {
  const [slotValues, setSlotValues] = React.useState(gemValues as Record<string, unknown>);
  const slots = [] as string[];
  const slotKeys = [] as string[];
  const slotTypes = string.match(/:[0-9]+/g) || [];
  let workingString = string;
  const strings = string.split(/:[0-9]+/g);
  const loadSlot = (slotIndex: number) => (value: unknown) => {
    setSlotValues({ ...slotValues, [slotIndex]: value });
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.GEM,
    item: { string, gemValues: slotValues, type: ItemTypes.GEM },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        removeGem();
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [string, slotTypes, slotValues]);
  React.useEffect(() => {
    console.log({ strings, slotValues, slotTypes });
  }, [slotValues]);
  return (
    <div className={classNames("gem", { dragging: isDragging })} ref={drag}>
      {strings.map((str, index) => (
        <>
          {str && <div className="gem-text">{str}</div>}
          {slotTypes[index] && <Slot loadSlot={loadSlot(index)} />}
        </>
      ))}
    </div>
  );

};
export default ExpandedGem;
