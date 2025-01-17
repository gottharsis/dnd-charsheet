<template>
  <div id="known-spells">
    <div class="flex-row justify-space-between">
      <h2 class="is-size-2 has-text-weight-bold">Known Spells</h2>
      <div class="is-size-3">
        To Prepare: {{ spellCastingStrings.toPrepare }}
      </div>
    </div>
    <table class="table is-bordered  is-fullwidth has-text-centered">
      <thead>
        <tr class="has-background-link">
          <th class="has-text-centered" @click="cycleSort('name')">
            Name <span v-html="sortIcons['name']" />
          </th>
          <th class="has-text-centered" @click="cycleSort('level')">
            Level <span v-html="sortIcons['level']" />
          </th>
          <th class="has-text-centered">School</th>
          <th class="has-text-centered">Prepared</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="spell in sortedSpells"
          :key="spell.slug"
          @click="showSpellDetail(spell)"
        >
          <td>{{ spell.name }}</td>
          <td>{{ spell.level }}</td>
          <td>{{ spell.school }}</td>
          <td class="flex-row justify-space-between">
            <template v-if="spell.isPrepared || spell.level == 0">
              <b-button
                type="is-success"
                @click.prevent.stop="unprepare(spell)"
                icon-left="check"
                icon-pack="fas"
                :disabled="spell.alwaysPrepared || spell.level == 0"
              >
                Prepared
              </b-button>
            </template>
            <template v-else>
              <b-button type="is-info" @click.prevent.stop="prepare(spell)">
                Prepare
              </b-button>
            </template>

            <b-button
              type="is-danger"
              icon-left="trash"
              icon-pack="fas"
              @click.prevent.stop="remove(spell)"
            >
              Forget
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>

    <b-modal :active="shouldShowSpellDetail" @close="closeSpellDetail">
      <div class="box">
        <spell-detail :spell="detailSpell" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import SpellDetail from "./SpellDetail";
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

    ...charGetter(["spellCastingStrings", "numPrepared"]),

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
    SpellDetail
  }
};
</script>

<style></style>
