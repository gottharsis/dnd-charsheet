<template>
  <div class="edit-slots-modal box">
    <form @submit.prevent="submit">
      <div class="columns is-multiline">
        <div
          v-for="(skill, i) in skills"
          :key="skill.name"
          class="column is-one-third"
        >
          <div class="card ">
            <header class="card-header">
              <p class="card-header-title">
                {{ skill.name }} ({{ getAbility(i).stat }}
                {{ modifierString(getAbility(i).mod) }})
              </p>
            </header>

            <div class="card-content">
              <b-field label="Proficiency">
                <b-select v-model="charSkills[i].proficiency">
                  <option
                    v-for="option in proficiencyOptions"
                    :key="option.text"
                    :value="option.value"
                  >
                    {{ option.text }}
                  </option>
                </b-select>
              </b-field>

              <b-field label="Additional Modifier">
                <b-input
                  type="numeric"
                  v-model.number="charSkills[i].modifier"
                ></b-input>
              </b-field>

              <div class="is-divider"></div>
              <div class="has-text-centered has-text-weight-bold">
                Final Computed:
              </div>
              <div class="is-size-2 has-text-centered">
                {{ totalScores[i] }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-button @click="submit">Save Changes</b-button>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { modifierString } from "@/util";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers(
  "Character"
);
const { mapState: GuideState } = createNamespacedHelpers("Guide");

export default {
  data() {
    return {
      proficiencyOptions: [
        { text: "None", value: 0 },
        { text: "Proficient", value: 1 },
        { text: "Double", value: 2 },
        { text: "Half", value: 0.5 }
      ],
      charSkills: []
    };
  },
  methods: {
    submit() {
      const nonDefault = {};
      this.skills.forEach((skill, index) => {
        const o = {};
        let changed = false;
        const sk = this.charSkills[index];
        if (sk.proficiency > 0) {
          o.proficiency = sk.proficiency;
          changed = true;
        }

        if (sk.modifier > 0) {
          o.modifier = sk.modifier;
          changed = true;
        }

        if (changed) {
          nonDefault[skill.name] = o;
        }
      });
      this.setSkills({
        skills: nonDefault
      });
    },
    ...mapActions(["setSkills"]),
    ...mapGetters(["skillModifier"]),
    calculateModifier(index) {
      const ability = this.getAbility(index).mod;
      const proficiency = Math.floor(
        this.charSkills[index].proficiency * this.proficiencyBonus
      );
      const modifier = this.charSkills[index].modifier;

      return ability + proficiency + modifier;
    },
    getAbility(index) {
      const ability = this.abilityScores.find(
        i => i.stat === this.skills[index].stat
      );
      return ability;
    },
    modifierString
  },
  computed: {
    ...GuideState({
      skills: guide => guide.skills
    }),
    ...mapState({
      currentCharSkills: state => state.character.skills,
      proficiencyBonus: state => state.character.proficiencyBonus,
      abilityScores: state => state.character.abilityScores
    }),

    totalScores() {
      return this.skills.map((sk, index) => this.calculateModifier(index));
    }
  },
  mounted() {
    this.charSkills = this.skills.map(skill => {
      let currentSkill = {
        proficiency: 0,
        modifier: 0
      };
      if (skill.name in this.currentCharSkills) {
        const obj = this.currentCharSkills[skill.name];
        if ("proficiency" in obj) currentSkill.proficiency = obj.proficiency;
        if ("modifier" in obj) currentSkill.modifier = obj.modifier;
      }

      return currentSkill;
    });
  }
};
</script>

<style lang="scss">
// .edit-slots-modal {
//   width: 640px;
// }
</style>
