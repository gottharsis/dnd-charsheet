import merge from "deepmerge";
import isNil from "lodash/isNil";
import zip from "lodash/zip";
import {
  readCharacter,
  characterList,
  saveCharacter
} from "../../data/persistCharacter";
import { Character } from "../../data/character";

const state = {
  character: new Character(),
  characterFile: "",
  characterWasSet: false,
  characterList: []
};

const mutations = {
  SET_CHARACTER(state, { character, characterFile }) {
    const overwriteMerge = (destinationArray, sourceArray, options) =>
      sourceArray;

    const char = merge(state.character, character, {
      arrayMerge: overwriteMerge
    });
    state.character = char;
    state.characterFile = characterFile;
    state.characterWasSet = true;
  },
  LEARN_SPELL(state, { spellId }) {
    if (isNil(spellId)) {
      return;
    }
    if (state.character.magic.knownSpellIds.includes(spellId)) {
      return;
    }
    state.character.magic.knownSpellIds.push(spellId);
  },
  CAST_SPELL(state, { level }) {
    const slot = state.character.magic.spellSlots.find(s => s.level === level);

    if (isNil(slot)) {
      return;
    }
    slot.used++;
  },
  SET_SPELL_SLOT(state, { level, max = -1, used = -1 }) {
    const slot = state.character.magic.spellSlots.find(s => s.level === level);
    if (max >= 0) {
      slot.max = max;
    }

    if (used >= 0) {
      slot.used = used;
    }
  },
  RESTORE_SPELL_SLOT(state, { level, amount = -1 }) {
    const slot = state.character.magic.spellSlots.find(s => s.level === level);
    if (amount < 0) {
      slot.used = 0;
    } else {
      slot.used = Math.max(0, slot.used - amount);
    }
  },
  RESTORE_ALL_SPELL_SLOTS(state) {
    for (let slot of state.character.magic.spellSlots) {
      slot.used = 0;
    }
  },
  SET_SPELL_SLOTS(state, { updatedSlots = [] }) {
    updatedSlots.forEach(newSlot => {
      const { level, max, used } = newSlot;
      const slot = state.character.magic.spellSlots.find(
        s => s.level === level
      );
      if (!isNil(max) && max >= 0) {
        slot.max = max;
      }
      if (!isNil(used) && used >= 0) {
        slot.used = used;
      }
    });
  },

  SET_CURRENT_HP(state, { currentHp }) {
    state.character.health.currentHp = currentHp;
  },
  SET_MAX_HP(state, { maxHp }) {
    state.character.health.maxHp = maxHp;
  },
  SET_TEMP_HP(state, { tempHp }) {
    state.character.health.tempHp = tempHp;
  },
  SET_ARMOR(state, { armor }) {
    state.character.armor = armor;
  },
  SET_AC(state, { ac }) {
    state.character.ac = ac;
  },

  SET_SKILLS(state, { skills }) {
    state.character.skills = skills;
  }
};

const actions = {
  async chooseCharacter({ commit }, { characterFile }) {
    console.log("ChooseCharacter actin");
    const character = await readCharacter(characterFile);
    commit("SET_CHARACTER", { character, characterFile });
    return character;
  },
  async saveCharacter({ state }) {
    saveCharacter(state.character, state.characterFile);
  },

  learnSpell({ commit }, { spellId }) {
    console.log("Learning spell with id " + spellId);
    commit("LEARN_SPELL", { spellId });
  },
  castSpell({ commit, state, dispatch }, { level }) {
    console.log("Cast spell of level " + level);
    const slot = state.character.magic.spellSlots.find(s => s.level === level);

    if (isNil(slot)) {
      console.log("Could not find slot of level " + level);
      dispatch(
        "Errors/setError",
        {
          errorText: `Could not find slot of level ${level}`
        },
        {
          root: true
        }
      );
      return;
    }
    if (slot.max === 0 || slot.used >= slot.max) {
      console.log("Submitting error");
      dispatch(
        "Errors/setError",
        {
          errorText: `cannot cast spell of level ${level}`
        },
        { root: true }
      );
    } else {
      commit("CAST_SPELL", { level });
    }
  },
  restoreSlot({ commit }, { level, amount = -1 }) {
    commit("RESTORE_SPELL_SLOT", { level, amount });
  },
  setSpellSlots({ commit }, { updatedSlots }) {
    commit("SET_SPELL_SLOTS", { updatedSlots });
  },
  restoreAllSpellSlots({ commit }) {
    commit("RESTORE_ALL_SPELL_SLOTS");
  },

  setCurrentHp({ commit }, { currentHp }) {
    commit("SET_CURRENT_HP", { currentHp });
  },
  setMaxHp({ commit }, { maxHp }) {
    commit("SET_MAX_HP", { maxHp });
  },
  setTempHp({ commit }, { tempHp }) {
    commit("SET_TEMP_HP", { tempHp });
  },
  takeDamage({ state, dispatch }, { damage }) {
    const health = state.character.health;
    let _damage = parseInt(damage);

    let { tempHp: temp, currentHp: current } = health;
    temp = parseInt(temp);
    current = parseInt(current);

    if (_damage <= 0) {
      dispatch(
        "Errors/setError",
        {
          errorText: "Invalid Damage Value: " + damage
        },
        {
          root: true
        }
      );
      return;
    }

    if (temp > 0) {
      if (_damage >= health.tempHp) {
        dispatch("setTempHp", { tempHp: 0 });
        _damage -= temp;
        if (_damage == 0) {
          return;
        }
      } else {
        const remainingTemp = temp - _damage;
        dispatch("setTempHp", { tempHp: remainingTemp });
        return;
      }
    }

    const remainingHp = Math.max(current - _damage, 0);
    dispatch("setCurrentHp", {
      currentHp: remainingHp
    });
  },
  heal({ state, dispatch }, { amount }) {
    let _amount = parseInt(amount);

    if (_amount <= 0) {
      dispatch(
        "Errors/setError",
        {
          errorText: "Invalid Heal Amount: " + amount
        },
        {
          root: true
        }
      );
      return;
    }

    const { currentHp, maxHp } = state.character.health;
    const newHp = Math.min(currentHp + _amount, maxHp);
    dispatch("setCurrentHp", { currentHp: newHp });
  },
  healAll({ state, commit }) {
    const { maxHp } = state.character.health;
    commit("SET_CURRENT_HP", {
      currentHp: maxHp
    });
  },

  setArmor({ commit }, { armor }) {
    // verify the armor is correct
    if (isNil(armor)) {
      return;
    }

    if (!(armor.hasOwnProperty("name") && armor.name)) {
      return;
    }
    if (!(armor.hasOwnProperty("ac") && armor.ac > 0)) {
      return;
    }
    const newArmor = {
      name: armor.name,
      ac: armor.ac,
      addDexMod: armor.addDexMod || false,
      attributes: armor.attributes,
      category: armor.category
    };
    commit("SET_ARMOR", {
      armor: newArmor
    });
  },
  setAc({ commit }, { ac }) {
    const newAc = Number(ac);
    if (isNaN(newAc)) {
      return;
    }
    if (newAc <= 0 || newAc >= 40) {
      return;
    }

    commit("SET_AC", { ac: newAc });
  },

  setSkills({ commit }, { skills }) {
    commit("SET_SKILLS", { skills });
  }
};

const getters = {
  isSpellKnown: state => id => {
    const result = state.character.magic.knownSpellIds.includes(id);
    return result;
  },
  isSpellPrepared: state => id =>
    state.character.magic.preparedSpellIds.includes(id),
  skillModifier: state => skill => {
    let mod = 0;
    // first find base stat
    const stat = state.character.abilityScores.find(
      score => score.stat === skill.stat
    );
    mod += stat.mod;

    // check for proficiency and/or other modifiers
    if (skill.name in state.character.skills) {
      const sk = state.character.skills[skill.name];
      // check for proficiency
      if ("proficiency" in sk) {
        mod += Math.floor(sk["proficiency"] * state.character.proficiency);
      }

      if ("modifier" in sk) {
        mod += sk["modifier"];
      }
    }
    return mod;
  },
  savingThrowBonuses: state => {
    const ch = state.character;
    const { savingThrows, proficiency, abilityScores } = ch;

    let res = [];
    for (let i = 0; i < 6; i++) {
      let sc = abilityScores[i].mod;
      if (savingThrows[i]) {
        sc += proficiency;
      }
      res.push(sc);
    }
    return res;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
