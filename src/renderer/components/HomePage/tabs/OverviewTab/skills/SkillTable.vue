<template>
  <div class="overview-skills">
    <b-table
      :data="tableData"
      :sort-icon="'arrow-up'"
      :sort-icon-size="'is-small'"
      :sort-icon-pack="'fas'"
    >
      <template slot-scope="props">
        <b-table-column field="name" label="Name" sortable>
          {{ props.row.name }}
        </b-table-column>
        <b-table-column field="stat" label="Ability" sortable centered>
          {{ props.row.stat }}
        </b-table-column>
        <b-table-column field="mod" label="Mod">
          {{ props.row.mod }}
        </b-table-column>
        <b-table-column field="profIndicator" label="Proficiency">
          <div class="has-text-centered" v-html="props.row.profIndicator"></div>
        </b-table-column>
      </template>
    </b-table>
    <b-button class="is-pulled-right" @click="shouldShowEdit = true">
      Edit
    </b-button>

    <b-modal :active.sync="shouldShowEdit">
      <edit-skills-modal />
    </b-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { modifierString } from "@/util";
const { mapState, mapGetters } = createNamespacedHelpers("Character");
const { mapState: GuideState } = createNamespacedHelpers("Guide");

import EditSkillsModal from "./EditSkillsModal";

export default {
  computed: {
    ...mapState({
      charSkills: state => state.character.skills
    }),
    ...GuideState({
      skills: state => state.skills
    }),

    tableData() {
      return this.skills.map(skill => ({
        name: skill.name,
        stat: skill.stat,
        mod: this.skMod(skill),
        profIndicator: this.getProficiencyIndicator(skill)
      }));
    }
  },

  methods: {
    ...mapGetters(["skillModifier"]),
    skMod(skill) {
      return modifierString(this.skillModifier()(skill));
    },
    getProficiencyIndicator(skill) {
      if (skill.name in this.charSkills) {
        const sk = this.charSkills[skill.name];
        if ("proficiency" in sk) {
          const prof = sk["proficiency"];
          if (prof == 1) {
            return `<i class="fas fa-check has-text-success"></i>`;
          }
          if (prof == 2) {
            return `<i class="fas fa-check-double has-text-success"></i>`;
          }
          if (prof == 0.5) {
            return `<span>&frac12;</span>`;
          }
        }
      }

      return `<i class="fas fa-ban has-text-danger"></i>`;
    }
  },

  data() {
    return {
      shouldShowEdit: false
    };
  },
  components: {
    EditSkillsModal
  }
};
</script>

<style></style>
