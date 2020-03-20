<template>
  <div id="known-spell-cards">
    <div class="flex-row justify-space-between">
      <h2 class="is-size-2 has-text-weight-bold">Known Spells</h2>
      <div class="is-size-3">
        To Prepare: {{ spellCastingStrings.toPrepare }}, Prepared:
        {{ numPrepared }}
      </div>
    </div>

    <div class="levels">
      <div v-for="[level, spells] in spellsByLevel" :key="level">
        <h1 class="is-size-3 is-italic">Level {{ level }}</h1>
        <div class="flex-row wrap">
          <div
            v-for="spell in spells"
            :key="spell.slug"
            class="spell-card"
            @click="showSpellDetail(spell)"
          >
            <div class="content">
              <h3>{{ spell.name }}</h3>
              <div>
                <span class="is-italic">Concentration: </span>
                {{ spell.concentration }}
              </div>
              <div>
                <span class="is-italic">Range:</span>
                {{ spell.range }}
              </div>
            </div>
            <div class="buttons">
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal :active="detailSpell !== null" @close="closeSpellDetail">
      <div class="box">
        <spell-detail :spell="detailSpell" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import SpellDetail from "./SpellDetail";
import groupBy from "lodash/groupBy";
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
      toPrepare: state => state.character.magic.toPrepare,
      customSpells: state => state.character.magic.customSpells
    }),

    ...charGetter(["spellCastingStrings", "numPrepared"]),

    knownSpells() {
      return this.knownIds.map(id => ({
        ...this.spells[id],
        isPrepared: this.preparedIds.includes(id),
        alwaysPrepared: this.alwaysPreparedIds.includes(id)
      }));
    },

    spellsByLevel() {
      return orderBy(
        Object.entries(
          groupBy(
            orderBy(
              this.knownSpells,
              ["ritual", "alwaysPrepared", "name"],
              ["asc", "desc", "asc"]
            ),
            "level"
          )
        ),
        0
      );
    }
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
      detailSpell: null
    };
  },
  components: {
    SpellDetail
  }
};
</script>

<style lang="scss" scoped>
@import "~bulmaswatch/superhero/variables";
@import "~bulma/bulma";
.spell-card {
  margin: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid white;
  background: $grey-dark;
}
</style>
