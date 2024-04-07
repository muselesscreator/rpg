export const gems = [
  { string: 'const :1', slotTypes: ['any'] },
  { string: ':1 = :2', slotTypes: ['any', 'any'] },
  { string: ':1;', slotTypes: ['any'] },
  { string: ':1 < :2', slotTypes: ['number', 'number'] },
  { string: ':1 > :2', slotTypes: ['number', 'number'] },
  { string: ':1 <= :2', slotTypes: ['number', 'number'] },
  { string: ':1 >= :2', slotTypes: ['number', 'number'] },
  { string: ':1 === :2', slotTypes: ['any', 'any'] },
  { string: ':1 !== :2', slotTypes: ['any', 'any'] },
  { string: ':1 + :2', slotTypes: ['number', 'number'] },
  { string: ':1 - :2', slotTypes: ['number', 'number'] },
  /*
  { string: ':1 * :2', slotTypes: ['number', 'number'] },
  { string: ':1 / :2', slotTypes: ['number', 'number'] },
  { string: ':1 += :2', slotTypes: ['number', 'number'] },
  { string: ':1 -= :2', slotTypes: ['number', 'number'] },
  */
];

export const values = [
  0,
  1,
  5,
  10,
  100,
  'Name',
  'Health',
];

export const ItemTypes = {
  GEM: 'gem',
  VALUE: 'value',
};
