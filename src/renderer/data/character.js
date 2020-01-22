export class Character {
  name = "Default Character Name";
  abilityScores = [
    {
      stat: "STR",
      score: 0
    },
    {
      stat: "DEX",
      score: 0
    },
    {
      stat: "CON",
      score: 0
    },
    {
      stat: "INT",
      score: 0
    },
    {
      stat: "WIS",
      score: 0
    },
    {
      stat: "CHA",
      score: 0
    }
  ];
  raceId = 0;
  classId = 0;
  health = {
    maxHp: 0,
    currentHp: 0,
    tempHp: 0,
    remainingHitDice: 0
  };
  inventory = {
    weaponIds: [],
    wealth: {
      gold: 0,
      silver: 0,
      copper: 0,
      platinum: 0
    },
    items: [],
    magicItems: []
  };

  magic = {
    spellSlots: {
      available: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      used: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    knownSpellIds: [],
    preparedSpellIds: []
  };
  armorId = -1;
  level = 0;
  skillIds = [];
  notes = [];
  languages = ["Common"];
  abilities = [];
  savingThrows = [false, false, false, false, false, false];
  proficiencyBonus = 0;
}
