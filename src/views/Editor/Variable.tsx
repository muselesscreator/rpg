import classNames from 'classnames';

import { ItemTypes } from './data';
import useDragBehavior from './useDragBehavior';

const Variable = ({
  name,
  removeSelf,
  isTemplate = false,
}: {
  name: string,
  removeSelf?: () => void,
  isTemplate?: boolean,
}) => {
  const { isDragging, drag } = useDragBehavior({
    type: ItemTypes.VARIABLE,
    item: { type: ItemTypes.VARIABLE, name },
    removeSelf,
    isTemplate,
  });
  return (
    <div className={classNames("variable-container", { 'is-dragging': isDragging })}>
      <div className='variable' ref={drag}>
        {name}
      </div>
    </div>
  );

};
export default Variable;
