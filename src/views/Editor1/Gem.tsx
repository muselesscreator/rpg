import { useDrag } from 'react-dnd';
import classNames from 'classnames';

import { ItemTypes } from './data';
import SlotImage from './SlotImage';
/**
 * A snippet of code that can be dragged into the editor, with sections that can have other gems or slots draged into them.
 * example: 
 *   <Gem string="const :1" slotTypes={['any']} />
 *   <Gem string=":1 = :2" slotTypes={['any', 'any']} />
 *   <Gem string=":1;" slotTypes={['any']} />
 *   <Gem string=":1 < :2" slotTypes={['number', 'number']} />
 */
const Gem = ({
  string,
}: {
  string: string,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.GEM,
    item: { type: ItemTypes.GEM, string },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const slots = [] as string[];
  const slotKeys = [] as string[];
  const strings = [] as string[];
  const slotTypes = string.match(/:[0-9]+/g) || [];
  console.log({ string, slotTypes });
  let workingString = string;
  slotTypes.forEach((slotType, index) => {
    slots.push(slotType);
    slotKeys.push(`:${index + 1}`);
    strings.push(workingString.split(slotKeys[index])[0]);
    workingString = workingString.split(slotKeys[index])[1];
  });
  return (
    <div className="gem-container">
      <div className={classNames("gem", { dragging: isDragging })} ref={drag}>
        <div className="gem-contents">
          {strings.map((str, index) => (
            <>
              {(str !== '') && (<div className="gem-text">{str}</div>)}
              <SlotImage className='slot' />
            </>
          ))}
          {workingString && <div className="gem-text">{workingString}</div>}
        </div>
      </div>
    </div>
  );

};
export default Gem;
