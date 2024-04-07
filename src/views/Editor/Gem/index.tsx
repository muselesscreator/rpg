import classNames from 'classnames';

import * as types from '../types';
import Slot from '../Slot';
import useGemData from './useGemData';

const Gem = ({
  gem,
  values = {},
  removeSelf,
  isTemplate = false,
  category,
  onValuesChange,
}: {
  gem: string,
  values?: types.GemSlotValues,
  onValuesChange?: (obj: types.Droppable) => void,
  removeSelf?: () => void,
  isTemplate?: boolean,
  category: string,
}) => {
  const {
    isDragging,
    drag,
    strings,
    slotTypes,
    slotValues,
    handleSlotValueChange,
    clearSlot,
  } = useGemData({
    gem,
    values,
    onValuesChange,
    removeSelf,
    category,
    isTemplate,
  });
  return (
    <div className="gem-container">
      <div className={classNames("gem", `gem-category-${category}`, { dragging: isDragging })} ref={drag}>
        <div className="gem-contents">
          {strings.map((str, index) => (
            <>
              {(str.length === 1) && <div className="gem-text">{str}</div>}
              {(str.length > 1) && (
                str.map((s, i) => (
                  <>
                    {(s !== '') && (<div className="gem-text">{s}</div>)}
                    {i !== str.length - 1 && <br />}
                  </>
                ))
              )}
              {slotTypes[index] && (
                <Slot
                  handleChange={handleSlotValueChange(index)}
                  canDrop={!isTemplate}
                  clearSlot={clearSlot(index)}
                  value={slotValues[slotTypes[index]]}
                />
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );

};
export default Gem;
