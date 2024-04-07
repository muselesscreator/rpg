export type TileQuery = {
  terrainType: string;
  [key: string]: string | boolean;
};
export type Prerequisites = {
  needs?: string[];
  has?: string[];
};
export type TileEventItem = { item: string };
export type Challenge = {
  name: string;
  values?: TileEventItem[];
  successGuideText?: string;
  rewards?: TileEventItem[];
  successEvt?: string;
};
export interface TileEvent {
  tileQuery: TileQuery;
  prerequisites: Prerequisites;
  give?: TileEventItem[];
  guideText: string;
  challenge?: Challenge;
}

const tileEvents = {
  Game: {
    claimKey: {
      tileQuery: { terrainType: 'npc', name: 'wizard' },
      prerequisites: { needs: ['key'] },
      give: [{ item: 'key' }],
      guideText: 'Find the chest that needs this key to obtain the crystal!',
    },
    openChestNoKey: {
      tileQuery: { terrainType: 'chest', isOpen: false },
      prerequisites: { needs: ['key'] },
      guideText: 'You need a key to open this chest!',
      challenge: { name: 'lockedChest' },
    },
    openChest: {
      guideText: 'You are going to need to put the key in the lock...',
      prerequisites: { has: ['key'] },
      tileQuery: { terrainType: 'chest', isOpen: false },
      challenge: {
        name: 'lockedChest',
        values: [{ item: 'key' }],
        successGuideText: 'You have unlocked the chest!  Take a look inside',
        rewards: [{ item: 'key' }],
        successEvt: 'openChest',
      },
    },
    takeCrystal: {
      guideText: 'Claim the crystal from the chest.',
      prerequisites: { needs: ['crystal'] },
      tileQuery: { terrainType: 'chest', isOpen: true },
      challenge: {
        name: 'takeCrystal',
        successGuideText: 'You have claimed the crystal!  Maybe the wizard can tell you how to use it to leave this place',
        rewards: [{ item: 'crystal' }],
      },
    },
  },
} as Record<string, Record<string, TileEvent>>;

export default tileEvents;
