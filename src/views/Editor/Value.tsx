import classNames from 'classnames';

import { ItemTypes } from './data';
import useDragBehavior from './useDragBehavior';

const Value = ({
  value,
  label,
  removeSelf,
  isTemplate = false,
}: {
  value: unknown,
  label: string,
  removeSelf?: () => void,
  isTemplate?: boolean,
}) => {
  const { isDragging, drag } = useDragBehavior({
    type: ItemTypes.VALUE,
    item: { type: ItemTypes.VALUE, value, label },
    removeSelf,
    isTemplate,
  });
  return (
    <div className={classNames("value-container", { 'is-dragging': isDragging })}>
      <div className='value' ref={drag}>
        {label}
      </div>
    </div>
  );

};
export default Value;
