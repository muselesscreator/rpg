import { useDrag } from 'react-dnd';
import * as types from './types';

export const useDragBehavior = ({
  removeSelf,
  item,
  isTemplate,
  type,
}: {
  type: string;
  removeSelf?: () => void;
  isTemplate: boolean;
  item: types.Droppable,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item,
    end: (_, monitor) => {
      if (monitor.didDrop() && !isTemplate && removeSelf) {
        removeSelf();
      }
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));
  return {
    isDragging,
    drag,
  };
};

export default useDragBehavior;
