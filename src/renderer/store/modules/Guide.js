import { join } from "path";
import fs from "fs";
import isEmpty from "lodash/isEmpty";
const dataStores = [
  {
    name: "armors",
    file: "armor.json"
  },
  {
    name: "backgrounds",
    file: "backgrounds.json"
  },
  {
    name: "classes",
    file: "classes.json"
  },
  {
    name: "races",
    file: "races_new.json"
  },
  {
    name: "skills",
    file: "skills.json"
  },
  {
    name: "spells",
    file: "spells.json"
  },
  {
    name: "weapons",
    file: "weapons.json"
  },
  {
    name: "stats",
    file: "stats.json"
  }
];

const dataDir = join(__static, "data");

const state = {
  armors: [],
  backgrounds: [],
  classes: [],
  races: [],
  skills: [],
  spells: [],
  weapons: [],
  stats: []
};

const mutations = {
  SET_GUIDE_PROPERTY(state, { property, value }) {
    if (Object.keys(state).includes(property)) {
      state[property] = value;
    }
  }
};

const actions = {
  async loadStore({ commit }, { name, file }) {
    const fp = join(dataDir, file);
    try {
      const json = fs.readFileSync(fp, "utf-8");
      const data = JSON.parse(json);
      commit("SET_GUIDE_PROPERTY", {
        property: name,
        value: data
      });
    } catch (e) {
      console.error(`Failure reading file ${fp}`);
      console.error(JSON.stringify(e));
    }
  },

  async loadGuide({ commit, dispatch }) {
    await Promise.all(dataStores.map(store => dispatch("loadStore", store)));
    // commit("SET_INITIALIZED");
  }
};

const getters = {
  getArmorById: state => id => state.armors.find(armor => armor.id === id),
  getBackgroundById: state => id => state.backgrounds.find(bg => bg.id === id),
  getClassById: state => id => state.classes.find(cl => cl.id === id),
  getRaceById: state => id => state.races.find(r => r.id === id),
  getSkillById: state => id => state.skills.find(s => s.id === id),
  getSpellById: state => id => state.spells.find(s => s.id === id),
  getSpellBySlug: state => slug => state.spells.find(s => s.slug === slug),
  getWeaponById: state => id => state.weapons.find(w => w.id === id),
  getStatById: state => id => state.stats.find(s => s.id === id)
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
