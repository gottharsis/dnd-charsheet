<template>
  <div class="box">
    <h1 class="has-text-centered is-size-2">Edit Spell Stats</h1>
    <form @submit.prevent="submit" class="content">
      <section>
        <h2>Spell Attack Bonus</h2>
        <p class="is-italic">Proficiency + Modifier</p>
        <p>
          <span v-for="score in abilityScores" :key="score.stat">
            <span class="has-text-weight-bold">{{ score.stat }}</span
            >: {{ score.mod }};
          </span>
        </p>
        <div v-for="k in Object.keys(bonus)" :key="k">
          <b-field :label="k">
            <b-input v-model.number="bonus[k]"></b-input>
          </b-field>
        </div>
      </section>

      <section>
        <h2>Spell Save DC</h2>
        <p class="is-italic">8 + Proficiency + Modifier</p>

        <div v-for="k in Object.keys(dc)" :key="k">
          <b-field :label="k">
            <b-input v-model.number="dc[k]"></b-input>
          </b-field>
        </div>
      </section>
      <section>
        <h2>Casting Ability</h2>

        <div v-for="k in Object.keys(castingAbility)" :key="k">
          <b-field :label="k">
            <b-select v-model="castingAbility[k]">
              <option
                v-for="score in abilityScores"
                :key="score.stat"
                :value="score.stat"
              >
                {{ score.stat }}
              </option>
            </b-select>
          </b-field>
        </div>
      </section>

      <section>
        <h2>To Prepare</h2>

        <div v-for="k in Object.keys(toPrepare)" :key="k">
          <b-field :label="k">
            <b-input v-model.number="toPrepare[k]" />
          </b-field>
        </div>
      </section>

      <b-button native-type="submit">
        Save Changes
      </b-button>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import cloneDeep from "lodash/cloneDeep";
const { mapState, mapActions } = createNamespacedHelpers("Character");
import { calculateModifier, modifierString } from "@/util";
export default {
  data() {
    return {
      dc: {},
      bonus: {},
      castingAbility: {},
      toPrepare: {}
    };
  },
  computed: {
    ...mapState({
      currDc: state => state.character.magic.dc,
      currBonus: state => state.character.magic.bonus,
      currCastingAbility: state => state.character.magic.castingAbility,
      proficiencyBonus: state => state.character.proficiencyBonus,
      abilityScores: state => state.character.abilityScores,
      currToPrepare: state => state.character.magic.toPrepare
    })
  },

  mounted() {
    this.dc = cloneDeep(this.currDc);
    this.bonus = cloneDeep(this.currBonus);
    this.castingAbility = cloneDeep(this.currCastingAbility);
    this.toPrepare = cloneDeep(this.currToPrepare);
  },
  methods: {
    ...mapActions(["setSpellStats"]),
    submit() {
      this.setSpellStats({
        dc: this.dc,
        castingAbility: this.castingAbility,
        bonus: this.bonus,
        toPrepare: this.toPrepare
      });
      this.$parent.close();
    }
  }
};
</script>

<style></style>
