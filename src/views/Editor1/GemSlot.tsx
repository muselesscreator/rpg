import SlotImage from './SlotImage';
/**
 * A snippet of code that can be dragged into the editor, with sections that can have other gems or slots draged into them.
 * example: 
 *   <Gem string="const :1" slotTypes={['any']} />
 *   <Gem string=":1 = :2" slotTypes={['any', 'any']} />
 *   <Gem string=":1;" slotTypes={['any']} />
 *   <Gem string=":1 < :2" slotTypes={['number', 'number']} />
 */
const GemSlot = () => {
  return (
    <div className="gem-slot">
      <div className="gem-slot-start-diamond" />
      <SlotImage className='slot' />
      <div className="gem-slot-end-diamond" />
    </div>
  );

};
export default GemSlot;
