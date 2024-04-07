import { useDrag } from 'react-dnd';

import { ItemTypes } from './data';
/**
 * A snippet of code that can be dragged into the editor, with sections that can have other gems or slots draged into them.
 * example: 
 *   <Gem string="const :1" slotTypes={['any']} />
 *   <Gem string=":1 = :2" slotTypes={['any', 'any']} />
 *   <Gem string=":1;" slotTypes={['any']} />
 *   <Gem string=":1 < :2" slotTypes={['number', 'number']} />
 */
const Value = ({ value }: { value: unknown }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.VALUE,
    item: { type: ItemTypes.VALUE, value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div className='value' ref={drag}>
      {value}
    </div>
  );

};
export default Value;
