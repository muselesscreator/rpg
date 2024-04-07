import * as React from 'react';
import classNames from 'classnames';
import { useDrop } from 'react-dnd';

import ExpandedGem from './ExpandedGem';
import ExpandedValue from './ExpandedValue';
import { ItemTypes } from './data';
import SlotImage from './SlotImage';

const Slot = ({
  className,
  loadSlot,
}: {
  className?: string;
  loadSlot: (v: unknown) => void;
}) => {
  const [contents, setContents] = React.useState();
  const [hasDropped, setHasDropped] = React.useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = React.useState(false);
  const [{ isOverCurrent }, drop] = useDrop({
    accept: [ItemTypes.GEM, ItemTypes.VALUE],
    drop: (item: any, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      setHasDropped(true);
      setHasDroppedOnChild(didDrop);
      console.log({ item });
      setContents(item);
      loadSlot(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  if (!contents) {
    console.log("?");
    return (
      <SlotImage
        dropRef={drop}
        className={classNames(
          className,
          'slot',
          { 'is-over': isOverCurrent },
        )}
      />
    );
  }
  const { type } = contents;
  const removeContents = () => {
    setContents(undefined);
    setHasDropped(false);
    setHasDroppedOnChild(false);
  }
  return (
    <div
      ref={drop}
      className={classNames(
        className,
        'slot--filled',
        { 'is-over': isOverCurrent },
      )}
    >
      {(type === ItemTypes.GEM) && (<ExpandedGem {...contents} removeGem={removeContents} />)}
      {(type === ItemTypes.VALUE) && (<ExpandedValue {...contents} remvoeValue={removeContents} />)}
    </div>
  );
}
export default Slot;
