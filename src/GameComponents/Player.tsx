import * as React from 'react';

import { useKeyedState } from '@muselesscreator/use-keyed-state';
import { StrictDict } from '@muselesscreator/strict-dict';

const stateKeys = StrictDict({
  'name': 'name',
  'health': 'health',
  'inventory': 'inventory',
});

type ItemType = 'key' | 'equipment' | 'consumable';
type EquipmentProps = {
  weapon?: string;
  armor?: string;
  accessory?: string;
  offhand?: string;
  helmet?: string;

}
const Equipment = ({
  weapon,
  armor,
  accessory,
  offhand,
  helmet,
}: EquipmentProps) => {
  const [stats, setStats] = React.useState<Record<string, string>>({});
  const [abilities, setAbilities] = React.useState<string[]>([]);
  React.useEffect(() => {
    const loadItem = async (itemName: string) => {
      const item = itemRegistry[itemName];
      if (!item) {
        return;
      }
      if (item.stats) {
        Object.keys(item.stats).forEach((stat) => {
          setStats((currentStats) => ({ ...currentStats, [stat]: (currentStats[stat] || 0) + item.stats[stat] }));
        });
      }
      if (item.ability) {
        setAbilities((currentAbilities) => [...currentAbilities, item.ability]);
      }
    }

  }, [weapon, armor, accessory, offhand, helmet]);
  return (
    <>
      {weapon && <h4>Weapon: {weapon}</h4>}
      {armor && <h4>Armor: {armor}</h4>}
      {accessory && <h4>Accessory: {accessory}</h4>}
      {offhand && <h4>Offhand: {offhand}</h4>}
      {helmet && <h4>Helmet: {helmet}</h4>}
    </>
  );
}

const itemRegistry = StrictDict({
  'pickaxe': {
    type: 'equipment',
    slot: 'weapon',
    ability: 'breakRocks',
    damage: { piercing: 10 },
  },
  'torch': {
    type: 'equipment',
    slot: 'offhand',
    ability: 'light',
  },
  'simpleKey': {
    type: 'key',
  },
  'Leather Armor': {
    type: 'equipment',
    slot: 'armor',
    stats: {
      defense: 5,
    },
  },

});

const usePlayerStats = () => {
  const [health, setHealth] = useKeyedState(stateKeys.health, 100);
  const [defense, setDefense] = React.useState(10);
  return {
    stats: {
      health,
      defense,
    },
    statSetters: {
      health: setHealth,
      defense: setDefense,
    },
  };
};

const Player = () => {
  const [name, setName] = useKeyedState(stateKeys.name, 'Player 1');
  const [inventory, setInventory] = useKeyedState(stateKeys.inventory, ["pickaxe", "Leather Armor"]);
  const [abilities, setAbilities] = React.useState([]);
  const [equipment, setEquipment] = React.useState<Record<string, string>>({
    weapon: 'pickaxe',
    armor: 'Leather Armor',
  });
  const { stats } = usePlayerStats();

  const equipStats = {} as Record<string, number>;
  const equipAbilities = [] as string[];
  const loadEquippedItem = (itemName: string) => {
    const item = itemRegistry[itemName];
    if (!item) {
      return;
    }
    if (item.stats) {
      Object.keys(item.stats).forEach((stat) => {
        equipStats[stat] = (equipStats[stat] || 0) + item.stats[stat];
      });
    }
    if (item.ability) {
      equipAbilities.push(item.ability);
    }
  };
  Object.keys(equipment).forEach((slot) => {
    const itemName = equipment[slot];
    loadEquippedItem(itemName);
  });
  const effectiveStats = {
    ...Object.keys(stats).reduce((acc, stat) => {
      acc[stat] = stats[stat] + (equipStats[stat] || 0);
      return acc;
    }, {}),
  };
  const effectiveAbilities = [...abilities, ...equipAbilities];
  console.log({ equipStats, effectiveStats, effectiveAbilities });

  return (
    <>
      <h1>Name: {name}</h1>
      <Equipment
        weapon="pickaxe"
      />

    </>
  );
};

export default Player;
