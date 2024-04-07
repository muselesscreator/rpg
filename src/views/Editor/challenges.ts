import { ItemTypes } from './data';
export const challenges = {
  Game: {
    unlockChest: {
      lockedGem: { gem: 'const lock = [:1:];', values: [] },
      solution: 'const lock = [key];',
    },
    claimCrystal: {
      lockedGem: {
        gem: 'const contents = [:1:];',
        values: [{ type: ItemTypes.CLAIMABLE, name: 'crystal' }],
      },
      solution: 'const contents = []',
    },
  },
};

export default challenges;
