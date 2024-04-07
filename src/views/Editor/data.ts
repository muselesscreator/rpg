import { StrictDict } from '@muselesscreator/strict-dict';

export const gemTypes = StrictDict({
  value: 'Value',
  comparison: 'Comparison',
  control: 'Control',
  arrays: 'Arrays',
  objects: 'Objects',
});

export const valueTypes = StrictDict({
  number: 'Number',
  string: 'String',
  boolean: 'Boolean',
  empty: 'Empty',
});

export const gems = {
  [gemTypes.value]: {
    let: 'let :1',
    const: 'const :1',
    assign: ':1 = :2',
    end: ':1;',
    add: ':1 + :2',
    subtract: ':1 - :2',
    multiply: ':1 * :2',
    divide: ':1 / :2',
    increment: ':1++',
    decrement: ':1--',
    addAssign: ':1 += :2',
    subtractAssign: ':1 -= :2',
  },
  [gemTypes.comparison]: {
    lessThan: ':1 < :2',
    greaterThan: ':1 > :2',
    lessThanOrEqual: ':1 <= :2',
    greaterThanOrEqual: ':1 >= :2',
    equal: ':1 === :2',
    notEqual: ':1 !== :2',
  },
  [gemTypes.control]: {
    if: 'if (:1) {\n  :2\n}',
    ifElse: 'if (:1) {\n  :2\n} else {\n  :3\n}',
    ifElseIf: 'if (:1) {\n  :2\n} else if (:3) {\n  :4\n}',
    ifElseIfElse: 'if (:1) {\n  :2\n} else if (:3) {\n  :4\n} else {\n  :5\n}',
  }
};

export const values = {
  [valueTypes.number]: [
    { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '100', value: 100 },
  ],
  [valueTypes.string]: [
    { label: '"Hello"', value: 'Hello' },
    { label: '"World"', value: 'World' },
    { label: '"MyName"', value: 'MyName' },
  ],
  [valueTypes.boolean]: [
    { label: 'true', value: true },
    { label: 'false', value: false },
  ],
  [valueTypes.empty]: [
    { label: 'null', value: null },
    { label: 'undefined', value: undefined },
  ],
};

export const variables = [
  { name: 'name' },
  { name: 'health' },
  { name: 'score' },
  { name: 'level' },
]

export const ItemTypes = {
  GEM: 'gem',
  VALUE: 'value',
  VARIABLE: 'variable',
  CLAIMABLE: 'claimable',
};
