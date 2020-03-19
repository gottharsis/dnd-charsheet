<template>
  <div class="box">
    <form @submit.prevent="submit">
      <h2 class="is-size-2 has-text-weight-bold">
        Name
      </h2>
      <b-field>
        <b-input v-model="name"></b-input>
      </b-field>

      <!-- select the class -->
      <h2 class="is-size-2 has-text-weight-bold">
        Class
      </h2>
      <div v-for="(cl, i) in cls" :key="i" class="flex-row">
        <b-field label="Class" class="has-margin-right-25">
          <b-select v-model="cl.id" expanded>
            <option
              v-for="[k, v] in classList.filter(
                ([k, v]) => !cls.some((j, idx) => idx !== i && j.id === k)
              )"
              :key="k"
              :value="k"
            >
              {{ v.name }}
            </option>
          </b-select>
        </b-field>

        <b-field label="Level" class="has-margin-right-25">
          <b-input
            native-type="numeric"
            v-model.number="cl.level"
            required
          ></b-input>
        </b-field>

        <b-field label="Subclass" class="has-margin-right-25">
          <b-select v-model="cl.subclass">
            <option
              v-for="k in Object.keys(
                allClasses[cl.id] ? allClasses[cl.id].subclasses : {}
              )"
              :key="k"
              :value="k"
              required
            >
              {{ allClasses[cl.id].subclasses[k].name }}
            </option>
          </b-select>
        </b-field>

        <b-field label="Delete">
          <b-button
            type="is-danger"
            icon-left="trash"
            icon-pack="fas"
            @click="remove(cl.id)"
          >
          </b-button
        ></b-field>
      </div>
      <b-button icon-left="plus" icon-pack="fas" @click="addClass">
        Add class
      </b-button>

      <h2 class="is-size-2 has-text-weight-bold">
        Race
      </h2>
      <div>
        To be implemented
      </div>

      <h2 class="is-size-2 has-text-weight-bold">
        Speed
      </h2>
      <b-field>
        <b-input v-model="speed" required></b-input>
      </b-field>

      <h2 class="is-size-2 has-text-weight-bold">
        Proficiency Bonus
      </h2>
      <b-field>
        <b-input
          native-type="numeric"
          v-model.number="proficiencyBonus"
          required
        ></b-input>
      </b-field>
      <b-button native-type="submit">
        Save changes
      </b-button>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import cloneDeep from "lodash/cloneDeep";
import isNil from "lodash/isNil";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers(
  "Character"
);

const { mapState: GuideState } = createNamespacedHelpers("Guide");
export default {
  data() {
    return {
      name: "",
      cls: [],
      speed: 0,
      proficiencyBonus: 0
    };
  },
  computed: {
    ...mapState({
      currName: state => state.character.name,
      currCls: state => state.character.class,
      currSpeed: state => state.character.speed,
      currProficiency: state => state.character.proficiencyBonus
    }),
    ...GuideState({
      allClasses: state => state.classes
    }),
    classList() {
      return Object.entries(this.allClasses);
    }
  },
  mounted() {
    this.name = cloneDeep(this.currName);
    this.cls = cloneDeep(this.currCls);
    this.speed = cloneDeep(this.currSpeed);
    this.proficiencyBonus = cloneDeep(this.currProficiency);
  },
  methods: {
    addClass() {
      this.cls.push({
        name: "Select",
        id: "new_class",
        subclass: "_"
      });
    },

    remove(id) {
      this.cls = this.cls.filter(i => i.id !== id);
    },
    ...mapActions(["setBasicInfo"]),
    submit() {
      const validClasses = this.cls.filter(
        i =>
          !isNil(i.id) &&
          i.id !== "new_class" &&
          !isNil(i.subclass) &&
          i.subclass !== "_"
      );

      this.setBasicInfo({
        name: this.name,
        cls: validClasses,
        speed: this.speed,
        proficiencyBonus: this.proficiencyBonus
      });
      this.$parent.close();
    }
  }
};
</script>

<style></style>
