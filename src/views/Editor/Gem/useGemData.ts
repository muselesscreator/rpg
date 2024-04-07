import * as React from 'react';
import { useDrag } from 'react-dnd';

import * as types from '../types';
import { ItemTypes } from '../data';
import useDragBehavior from '../useDragBehavior';

const useGemData = ({
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
  const [slotValues, setSlotValues] = React.useState<types.GemSlotValues>(values);

  const slotTypes = gem.match(/:[0-9]+/g) || [];
  const strings = gem.split(/:[0-9]+/g).map(v => v.split('\n'));

  const gemValue = {
    values: slotValues,
    gem,
    type: ItemTypes.GEM,
    category,
  } as types.DroppableGem;

  const { isDragging, drag } = useDragBehavior({
    removeSelf,
    isTemplate,
    item: gemValue,
    type: ItemTypes.GEM,
  });


  const loadSlot = (slotIndex: number, value: types.Droppable) => {
    setSlotValues((v) => ({ ...v, [slotTypes[slotIndex]]: value }));
    onValuesChange && onValuesChange({
      ...gemValue,
      values: { ...gemValue.values, [slotTypes[slotIndex]]: value },
    });
  };

  const handleSlotValueChange = (slotIndex: number) => (value: types.Droppable) => {
    loadSlot(slotIndex, value);
  }

  const clearSlot = (slotIndex: number) => () => {
    setSlotValues((v) => {
      const newValues = { ...v };
      delete newValues[slotTypes[slotIndex]];
      return newValues;
    });
  }

  return {
    isDragging,
    drag,
    strings,
    slotTypes,
    slotValues,
    handleSlotValueChange,
    loadSlot,
    clearSlot,
  };
};
export default useGemData;
