export type ValueObj = { value: unknown };
export type GemObj = { gem: string, values: (ValueObj | GemObj)[] };
export type EditorRow = null | GemObj | ValueObj;
export type CodeObj = { name: string, code: EditorRow[] };

export type DroppableGem = {
  gem: string,
  values: GemSlotValues,
  type: string,
  category: string,
};

export type DroppableValue = {
  value: unknown,
  label: string,
  type: string,
};

export type DroppableVariable = {
  type: string,
  name: string,
};

export type ClaimableItem = {
  type: string,
  name: string,
};

export type Droppable = DroppableGem | DroppableValue | DroppableVariable | undefined;

export type GemSlotValues = Record<string, Droppable>;
