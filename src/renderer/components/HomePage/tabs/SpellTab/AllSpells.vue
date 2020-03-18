<template>
  <div id="all-spells" style="height: 80vh; margin-bottom: 40px" class="">
    <h1 class="is-size-2 has-text-centered">All Spells</h1>
    <div>
      <div>
        <input
          type="text"
          class="input"
          v-model="searchStringInput"
          @input="search"
          placeholder="Search for spells..."
        />
      </div>
      <div class="flex-row">
        <multiselect
          multiple
          :options="options.classes"
          v-model="selected.classes"
          placeholder="Classes"
          class="has-background-dark"
        >
          <template slot="selection" slot-scope="{ values }">
            <span class="multiselect__single" v-if="values.length">
              {{ values.join(", ") }}</span
            >
          </template>
        </multiselect>
        <multiselect
          multiple
          :options="options.schools"
          v-model="selected.schools"
          placeholder="Schools"
        >
          <template slot="selection" slot-scope="{ values }">
            <span class="multiselect__single" v-if="values.length">
              {{ values.join(", ") }}</span
            >
          </template>
        </multiselect>
        <multiselect
          multiple
          :options="options.levels"
          v-model="selected.levels"
          placeholder="Levels"
        >
          <template slot="selection" slot-scope="{ values }">
            <span class="multiselect__single" v-if="values.length">
              {{ values.join(", ") }}</span
            >
          </template>
        </multiselect>
      </div>
    </div>
    <div class="flex-row has-background-grey-dark" style="max-height: 80%">
      <div style="" class="spell-menu">
        <div
          v-for="spell in resultsPage"
          :key="spell.slug"
          :class="{
            'has-cursor-pointer': true,
            'has-padding-10': true,
            'spell-menu-item': true,
            selected: selectedSpell ? selectedSpell.slug === spell.slug : false
          }"
          @click="selectedSpell = spell"
        >
          {{ spell.name }}
        </div>
      </div>
      <div style="flex: 3; overflow-y: scroll" class="has-padding-15">
        <div v-if="selectedSpell">
          <spell-detail :spell="selectedSpell" v-if="selectedSpell" />
          <template v-if="currentSpellKnown">
            <b-button type="is-danger" @click="forgetCurrentSpell">
              <i class="fas fa-cancel"></i> Forget
            </b-button>
          </template>
          <b-button v-else type="is-info" @click="learnCurrentSpell">
            <i class="fas fa-scroll"></i> Learn
          </b-button>
        </div>
        <div v-else class="has-padding-25 is-italic">
          Click on a spell on the left to see its description
        </div>
      </div>
    </div>
    <div class="flex-row justify-space-between">
      <div class="is-italic has-text-color-grey">
        Showing results {{ offset + 1 }}-{{
          Math.min(offset + resultsPerPage, sortedResults.length)
        }}
        of {{ sortedResults.length }}
      </div>

      <div class="is-grouped">
        <b-button :disabled="!pageButtons.prevAllowed" @click="prevPage">
          <i class="fas fa-chevron-left"></i>
          Previous
        </b-button>
        <b-button :disabled="!pageButtons.nextAllowed" @click="nextPage">
          Next
          <i class="fas fa-chevron-right"></i>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers as h } from "vuex";
const { mapState: guide } = h("Guide");
const { mapState, mapGetters, mapActions } = h("Character");
import Fuse from "fuse.js";
import orderBy from "lodash/orderBy";
import isNil from "lodash/isNil";
import SpellDetail from "./SpellDetail";
import debounce from "lodash/debounce";
import Multiselect from "vue-multiselect";

const searchOptions = {
  keys: ["name"],
  threshold: 0.4
};
export default {
  computed: {
    ...guide({
      spells: state => Object.values(state.spells)
    }),
    currentSpellKnown() {
      return this.isSpellKnown()(this.selectedSpell.slug);
    },
    searchResults() {
      const search = this.searchString
        ? this.fuse.search(this.searchString)
        : this.spells;
      return search;
    },
    filteredResults() {
      return this.searchResults.filter(
        i =>
          this.matchesClass(i) && this.matchesLevel(i) && this.matchesSchool(i)
      );
    },
    sortedResults() {
      return this.filteredResults;
    },
    resultsPage() {
      return this.sortedResults.slice(
        this.offset,
        this.offset + this.resultsPerPage
      );
    },
    showSpellDetail() {
      return !isNil(this.selectedSpell);
    },
    pageButtons() {
      return {
        nextAllowed:
          this.offset + this.resultsPerPage < this.sortedResults.length,
        prevAllowed: this.offset > 0
      };
    }
  },
  data() {
    return {
      fuse: null,
      searchStringInput: "",
      searchString: "",
      selected: {
        levels: [],
        classes: [],
        schools: []
      },
      offset: 0,
      resultsPerPage: 50,
      selectedSpell: null,
      options: {
        classes: [
          "Bard",
          "Cleric",
          "Druid",
          "Paladin",
          "Ranger",
          "Sorcerer",
          "Warlock",
          "Wizard"
        ],
        levels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        schools: [
          "Abjuration",
          "Conjuration",
          "Divination",
          "Enchantment",
          "Evocation",
          "Illusion",
          "Necromancy",
          "Transmutation"
        ]
      }
    };
  },

  mounted() {
    this.fuse = new Fuse(this.spells, searchOptions);
    console.log("Fuse");
    console.log(this.fuse);
  },
  methods: {
    matchesLevel(spell) {
      if (this.selected.levels.length === 0) return true;
      return this.selected.levels.includes(spell.level);
    },
    matchesClass(spell) {
      if (this.selected.classes.length === 0) return true;
      if (this.selected.classes.some(cl => spell.classes.includes(cl)))
        return true;
      return false;
    },
    matchesSchool(spell) {
      if (this.selected.schools.length === 0) return true;
      return this.selected.schools.includes(spell.school);
    },
    search: debounce(function() {
      this.searchString = this.searchStringInput;
    }, 500),
    ...mapGetters(["isSpellKnown", "isSpellPrepared"]),
    ...mapActions(["learnSpell", "forgetSpell"]),

    nextPage() {
      this.offset += this.resultsPerPage;
    },
    prevPage() {
      this.offset -= this.resultsPerPage;
      if (this.offset < 0) this.offset = 0;
    },
    learnCurrentSpell() {
      this.learnSpell({ spellId: this.selectedSpell.slug });
    },
    forgetCurrentSpell() {
      this.forgetSpell({ spellId: this.selectedSpell.slug });
    }
  },
  components: {
    SpellDetail,
    Multiselect
  }
};
</script>

<style lang="scss">
@import "~bulmaswatch/superhero/variables";
@import "~bulma/bulma";
@import "~vue-multiselect/dist/vue-multiselect.min.css";

.spell-menu {
  flex: 1;
  overflow-y: scroll;
  max-height: 100%;
  background: $dark;

  &::-webkit-scrollbar {
    background: $dark;
    width: 5px;

    &-thumb {
      background: $grey-light;
      border-radius: 5px;
    }
  }

  &-item {
    border: 1px solid $grey;
    &:hover,
    &.selected {
      background: $grey;
    }
  }
}

// .multiselect__select,
.multiselect__single,
.multiselect--active,
.multiselect__tags,
.multiselect__content-wrapper {
  background: $dark;
  color: $light;
}
</style>
