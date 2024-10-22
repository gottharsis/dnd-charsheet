import merge from "deepmerge";
import isNil from "lodash/isNil";
import zip from "lodash/zip";
import {
  readCharacter,
  characterList,
  saveCharacter
} from "../../data/persistCharacter";
import { Character } from "../../data/character";

import { modifierString } from "@/util";

const state = {
  character: new Character(),
  characterFile: "",
  characterWasSet: false,
  characterList: []
};

const mutations = {
  SET_NAME(state, { name }) {
    state.character.name = name;
  },
  SET_CLASS(state, { cls }) {
    state.character.class = cls;
  },
  SET_RACE(state, { raceId }) {
    state.character.raceId = raceId;
  },
  SET_PROFICIENCY_BONUS(state, { proficiencyBonus }) {
    state.character.proficiencyBonus = proficiencyBonus;
  },
  SET_SPEED(state, { speed }) {
    state.character.speed = speed;
  },
  SET_ABILITY_SCORES(state, { abilityScores }) {
    state.character.abilityScores = abilityScores;
  },
  SET_SPELL_STATS(state, { dc, bonus, castingAbility, toPrepare }) {
    if (!isNil(bonus)) {
      state.character.magic.bonus = bonus;
    }
    if (!isNil(dc)) {
      state.character.magic.dc = dc;
    }
    if (!isNil(castingAbility)) {
      state.character.magic.castingAbility = castingAbility;
    }

    if (!isNil(toPrepare)) {
      state.character.magic.toPrepare = toPrepare;
    }
  },
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
  FORGET_SPELL(state, { spellId }) {
    const newSp = state.character.magic.knownSpellIds.filter(
      i => i !== spellId
    );
    state.character.magic.knownSpellIds = newSp;
  },
  PREPARE_SPELL(state, { spellId }) {
    state.character.magic.preparedSpellIds.push(spellId);
  },
  UNPREPARE_SPELL(state, { spellId }) {
    const newSp = state.character.magic.preparedSpellIds.filter(
      i => i !== spellId
    );
    state.character.magic.preparedSpellIds = newSp;
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
  SET_REMAINING_HIT_DICE(state, { remainingHitDice }) {
    state.character.health.remainingHitDice = remainingHitDice;
  },
  SET_MAX_HIT_DICE(state, { maxHitDice }) {
    state.character.health.maxHitDice = maxHitDice;
    state.character.health.remainingHitDice = maxHitDice;
  },
  SET_HIT_DICE(state, { hitDice }) {
    state.character.health.hitDice = hitDice;
  },
  SET_ARMOR(state, { armor }) {
    state.character.armor = armor;
  },
  SET_AC(state, { ac }) {
    state.character.ac = ac;
  },

  SET_SKILLS(state, { skills }) {
    state.character.skills = skills;
  },

  SET_ABILITY(state, { id, ability }) {
    const ab = state.character.abilities.find(a => a.id === id);
    Object.assign(ab, ability);
  },
  ADD_ABILITY(state, { ability }) {
    state.character.abilities.push(ability);
  },
  SET_ABILITY_LIST(state, { abilityList }) {
    state.character.abilities = abilityList;
  },

  SET_FEATURES(state, { features }) {
    state.character.features = features;
  },

  SET_INVENTORY_ITEMS(state, { items }) {
    state.character.inventory.items = items;
  },
  SET_INVENTORY_MAGIC_ITEMS(state, { magicItems }) {
    state.character.inventory.magicItems = magicItems;
  },
  SET_WEAPONS(state, { weapons }) {
    state.character.inventory.weapons = weapons;
  },
  UPDATE_ITEM(state, { id, newItem }) {
    const item = state.character.inventory.items.find(i => i.id === id);
    if (isNil(item)) return;
    Object.assign(item, newItem);
  },
  UPDATE_MAGIC_ITEM(state, { id, newItem }) {
    console.log("in update magic item mutation");
    const item = state.character.inventory.magicItems.find(i => i.id === id);
    if (isNil(item)) return;
    Object.assign(item, newItem);
  },
  SET_WEALTH(state, { wealth }) {
    state.character.inventory.wealth = wealth;
  },

  SET_NOTES(state, { notes }) {
    state.character.notes = notes;
  },
  UPDATE_NOTE(state, { note }) {
    const currNote = state.character.notes.find(n => n.id === note.id);

    if (isNil(note)) return;
    Object.assign(currNote, note);
  },

  SET_SAVED_ROLLS(state, { savedRolls }) {
    if (isNil(savedRolls)) {
      return;
    }
    state.character.savedRolls = savedRolls;
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

  setBasicInfo({ commit }, { name, cls, speed, proficiencyBonus }) {
    if (!isNil(name)) {
      commit("SET_NAME", { name });
    }

    if (!isNil(cls)) {
      commit("SET_CLASS", { cls });
    }

    if (!isNil(proficiencyBonus)) {
      commit("SET_PROFICIENCY_BONUS", { proficiencyBonus });
    }

    if (!isNil(speed)) {
      commit("SET_SPEED", { speed });
    }
  },
  setAbilityScores({ commit }, { abilityScores }) {
    if (
      !isNil(abilityScores) &&
      Array.isArray(abilityScores) &&
      abilityScores.length
    ) {
      commit("SET_ABILITY_SCORES", { abilityScores });
    }
  },
  setSpellStats({ commit }, { dc, castingAbility, bonus, toPrepare }) {
    commit("SET_SPELL_STATS", { dc, castingAbility, bonus, toPrepare });
  },
  learnSpell({ commit }, { spellId }) {
    console.log("Learning spell with id " + spellId);
    commit("LEARN_SPELL", { spellId });
  },
  forgetSpell({ commit }, { spellId }) {
    commit("FORGET_SPELL", { spellId });
  },
  prepareSpell({ commit, getters }, { spellId }) {
    const isKnown = getters.isSpellKnown(spellId);
    if (!isKnown) return;
    commit("PREPARE_SPELL", { spellId });
  },
  unprepareSpell({ commit, getters }, { spellId }) {
    const isKnown = getters.isSpellKnown(spellId);
    if (!isKnown) return;
    commit("UNPREPARE_SPELL", { spellId });
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
  setRemainingHitDice({ state, commit }, { remainingHitDice }) {
    const max = state.character.health.maxHitDice;
    if (remainingHitDice <= 0 || remainingHitDice > max) return;
    commit("SET_REMAINING_HIT_DICE", { remainingHitDice });
  },
  setMaxHitDice({ commit }, { maxHitDice }) {
    if (maxHitDice <= 0) return;
    commit("SET_MAX_HIT_DICE", { maxHitDice });
  },
  setHitDice({ commit }, { hitDice }) {
    commit("SET_HIT_DICE", { hitDice });
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
  },

  setAbility({ commit }, { id, ability }) {
    if (ability.used < 0 || ability.used > ability.max) {
      return;
    }
    console.log("Setting ability at id " + id);
    console.log("new used: " + ability.used);
    commit("SET_ABILITY", { id, ability });
  },

  addAbility({ commit }, { ability }) {
    commit("ADD_ABILITY", { ability });
  },
  setAbilityList({ commit }, { abilityList }) {
    commit("SET_ABILITY_LIST", { abilityList });
  },
  setFeatures({ commit }, { features }) {
    commit("SET_FEATURES", { features });
  },

  setInventoryItems({ commit }, { items }) {
    commit("SET_INVENTORY_ITEMS", { items });
  },
  setInventoryMagicItems({ commit }, { magicItems }) {
    commit("SET_INVENTORY_MAGIC_ITEMS", { magicItems });
  },
  setWeapons({ commit }, { weapons }) {
    commit("SET_WEAPONS", { weapons });
  },
  updateItem({ commit }, { id, newItem }) {
    commit("UPDATE_ITEM", { id, newItem });
  },
  updateMagicItem({ commit }, { id, newItem }) {
    commit("UPDATE_MAGIC_ITEM", { id, newItem });
  },
  setWealth({ commit }, { wealth }) {
    commit("SET_WEALTH", { wealth });
  },

  setNotes({ commit }, { notes }) {
    commit("SET_NOTES", { notes });
  },
  updateNote({ commit }, { note }) {
    commit("UPDATE_NOTE", { note });
  },
  deleteNote({ commit, state }, { note }) {
    const notes = state.character.notes.filter(n => n.id !== note.id);
    commit("SET_NOTES", { notes });
  },
  setSavedRolls({ commit }, { savedRolls }) {
    commit("SET_SAVED_ROLLS", { savedRolls });
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
        mod += Math.floor(sk["proficiency"] * state.character.proficiencyBonus);
      }

      if ("modifier" in sk) {
        mod += sk["modifier"];
      }
    }
    return mod;
  },
  savingThrowBonuses: state => {
    console.log("Caluclating saving throw bonuses");
    const ch = state.character;
    const { savingThrows, proficiencyBonus, abilityScores } = ch;
    console.log(proficiencyBonus);
    console.log(savingThrows);

    let res = [];
    for (let i = 0; i < 6; i++) {
      let sc = abilityScores[i].mod;
      let stat = abilityScores[i].stat;
      if (savingThrows.includes(stat)) {
        sc += proficiencyBonus;
      }
      res.push(sc);
    }
    return res;
  },
  classString: (state, getters, rootState) => {
    const classes = state.character.class;
    const data = classes.map(i =>
      [
        rootState.Guide.classes[i.id].subclasses[i.subclass].name,
        rootState.Guide.classes[i.id].name,
        i.level
      ].join(" ")
    );
    return data.join("\t|\t");
  },
  spellCastingStrings: state => {
    const cls = state.character.class;
    const magic = state.character.magic;

    const combineClasses = (property, mod = false) => {
      if (typeof property === "number") {
        return mod ? modifierString(property) : property;
      }

      const vals = [];
      for (let cl of cls) {
        if (Object.hasOwnProperty.call(property, cl.id)) {
          if (mod) {
            vals.push(modifierString(property[cl.id]));
          } else {
            vals.push(property[cl.id]);
          }
        }
      }

      return vals.join(" / ");
    };

    return {
      dc: combineClasses(magic.dc),
      bonus: combineClasses(magic.bonus, true),
      castingAbility: combineClasses(magic.castingAbility),
      toPrepare: combineClasses(magic.toPrepare)
    };
  },
  numPrepared: state =>
    state.character.magic.preparedSpellIds.length -
    state.character.magic.alwaysPreparedIds.length
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
