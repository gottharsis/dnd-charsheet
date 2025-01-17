<template>
  <div id="spell-tab">
    <!-- <div class="has-text-weight-bold is-3 has-text-weight-bold">Spells</div> -->
    <div class="level" @dblclick="editSpellStats = true">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-4">Spell DC</p>
          <p class="has-text-weight-bold is-size-3">
            {{ spellCastingStrings.dc }}
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-4">Spell Attack Bonus</p>
          <p class="has-text-weight-bold is-size-3">
            {{ spellCastingStrings.bonus }}
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-4">Casting Ability</p>
          <p class="has-text-weight-bold is-size-3">
            {{ spellCastingStrings.castingAbility }}
          </p>
        </div>
      </div>
    </div>
    <div>
      <spell-slot-indicator v-for="i in spellLevels" :key="i" :level="i" />
    </div>
    <div class="has-padding-25">
      <!-- <router-link :to="{ name: 'edit-slots' }" class="button">
        Edit Spell Slots
      </router-link> -->
      <b-button @click="isEditModalOpen = true">
        Edit Spell Slots
      </b-button>
      <b-button @click="restoreAllSpellSlots">
        Restore Slots
      </b-button>
    </div>

    <known-spells />

    <b-modal :active.sync="isEditModalOpen">
      <edit-slots />
    </b-modal>

    <b-modal :active="shouldShowSpellDetail" @close="closeSpellDetail">
      <div class="box">
        <spell-detail :spell="detailSpell" />
      </div>
    </b-modal>

    <b-modal :active.sync="editSpellStats">
      <edit-spell-stats-modal />
    </b-modal>

    <!-- <b-modal :active.sync="showAllSpells"> -->
    <all-spells />
    <!-- </b-modal> -->
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import SpellSlotIndicator from "./SpellTab/SpellSlotIndicator";
import EditSlots from "./SpellTab/EditSlots";
import EditSpellStatsModal from "./SpellTab/EditSpellStatsModal";
import SpellDetail from "./SpellTab/SpellDetail";
import AllSpells from "./SpellTab/AllSpells";
import KnownSpells from "./SpellTab/KnownSpellsCards";
import orderBy from "lodash/orderBy";
import { modifierString } from "@/util";

const {
  mapGetters: charGetter,
  mapState: charState,
  mapActions: charActions
} = createNamespacedHelpers("Character");
const { mapState: GuideState } = createNamespacedHelpers("Guide");

export default {
  computed: {
    ...GuideState(["spells", "classes"]),
    ...charState({
      knownIds: state => state.character.magic.knownSpellIds,
      preparedIds: state => state.character.magic.preparedSpellIds,
      alwaysPreparedIds: state => state.character.magic.alwaysPreparedIds,
      spellLevels: state =>
        state.character.magic.spellSlots
          .filter(i => i.max > 0)
          .map(i => i.level),
      // rawDc: state => state.character.magic.dc,
      // rawBonus: state => state.character.magic.bonus,
      // rawCastingAbility: state => state.character.magic.castingAbility,
      charClass: state => state.character.class,
      toPrepare: state => state.character.magic.toPrepare
    }),

    ...charGetter(["spellCastingStrings"]),

    knownSpells() {
      return this.knownIds.map(id => ({
        ...this.spells[id],
        isPrepared: this.preparedIds.includes(id),
        alwaysPrepared: this.alwaysPreparedIds.includes(id)
      }));
    },
    sortedSpells() {
      const orders = this.sort.properties.map(prop => this.sort.order[prop]);
      const order = orderBy(this.knownSpells, this.sort.properties, orders);
      return order;
    },
    shouldShowSpellDetail() {
      return this.detailSpell !== null;
    },
    sortIcons() {
      return {
        name: this.getSortIcon("name"),
        level: this.getSortIcon("level")
      };
    }

    // dc() {
    //   return this.combineClasses(this.rawDc);
    // },
    // bonus() {
    //   return this.combineClasses(this.rawBonus, true);
    // },
    // castingAbility() {
    //   return this.combineClasses(this.rawCastingAbility);
    // }
  },
  methods: {
    ...charGetter(["isSpellKnown", "isSpellPrepared"]),
    ...charActions([
      "learnSpell",
      "restoreAllSpellSlots",
      "prepareSpell",
      "unprepareSpell",
      "forgetSpell"
    ]),
    showSpellDetail(spell) {
      this.detailSpell = spell;
    },
    closeSpellDetail() {
      this.detailSpell = null;
    },
    prepare(spell) {
      this.prepareSpell({ spellId: spell.slug });
    },

    unprepare(spell) {
      this.unprepareSpell({ spellId: spell.slug });
    },
    remove(spell) {
      this.unprepare(spell);
      this.forgetSpell({ spellId: spell.slug });
    },
    cycleSort(prop) {
      if (this.sort.order[prop] == null) {
        this.sort.order[prop] = "asc";
        this.sort.properties.push(prop);
      } else if (this.sort.order[prop] === "asc") {
        this.sort.order[prop] = "desc";
      } else {
        this.sort.order[prop] = null;
        const idx = this.sort.properties.indexOf(prop);
        this.sort.properties.splice(idx, 1);
      }
    },
    getSortIcon(prop) {
      if (this.sort.order[prop] == "asc")
        return '<i class="fas fa-sort-up"></i>';
      if (this.sort.order[prop] == "desc")
        return '<i class="fas fa-sort-down"></i>';
      return "";
    }
  },
  data() {
    return {
      isEditModalOpen: false,
      editSpellStats: false,
      detailSpell: null,
      showAllSpells: false,
      searchString: "",
      selected: {
        levels: []
      },
      sort: {
        properties: [],
        order: {
          name: null,
          level: null
        }
      }
    };
  },
  components: {
    SpellSlotIndicator,
    EditSlots,
    SpellDetail,
    AllSpells,
    EditSpellStatsModal,
    KnownSpells
  }
};
</script>

<style></style>
