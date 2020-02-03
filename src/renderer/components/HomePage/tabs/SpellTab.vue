<template>
  <div id="spell-tab">
    <!-- <div class="has-text-weight-bold is-3 has-text-weight-bold">Spells</div> -->
    <div class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-4">Spell DC</p>
          <p class="has-text-weight-bold is-size-3">{{ dc }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-4">Spell Attack Bonus</p>
          <p class="has-text-weight-bold is-size-3">+{{ bonus }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading is-size-4">Casting Ability</p>
          <p class="has-text-weight-bold is-size-3">{{ castingAbility }}</p>
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
    </div>
    <table class="table is-bordered  is-fullwidth has-text-centered">
      <thead>
        <tr class="has-background-link">
          <th class="has-text-centered">Name</th>
          <th class="has-text-centered">Level</th>
          <th class="has-text-centered">School</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="spell in knownSpells"
          :key="spell.id"
          @click="showSpellDetail(spell)"
        >
          <td>{{ spell.name }}</td>
          <td>{{ spell.level }}</td>
          <td>{{ spell.school }}</td>
        </tr>
      </tbody>
    </table>

    <b-modal :active.sync="isEditModalOpen">
      <edit-slots />
    </b-modal>

    <b-modal :active="shouldShowSpellDetail" @close="closeSpellDetail">
      <spell-detail :spell="detailSpell" />
    </b-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState: GuideState } = createNamespacedHelpers("Guide");
import SpellSlotIndicator from "./SpellTab/SpellSlotIndicator";
import EditSlots from "./SpellTab/EditSlots";
import SpellDetail from "./SpellTab/SpellDetail";

const {
  mapGetters: CharGetter,
  mapState: charState,
  mapActions: charActions
} = createNamespacedHelpers("Character");
export default {
  computed: {
    ...GuideState(["spells"]),
    ...charState({
      knownIds: state => state.character.magic.knownSpellIds,
      spellLevels: state =>
        state.character.magic.spellSlots
          .filter(i => i.max > 0)
          .map(i => i.level),
      dc: state => state.character.magic.dc,
      bonus: state => state.character.magic.bonus,
      castingAbility: state => state.character.magic.castingAbility
    }),
    knownSpells() {
      return this.spells.filter(({ id }) => this.knownIds.includes(id));
    },
    shouldShowSpellDetail() {
      return this.detailSpell !== null;
    }
  },
  methods: {
    ...CharGetter(["isSpellKnown"]),
    ...charActions(["learnSpell"]),
    showSpellDetail(spell) {
      this.detailSpell = spell;
    },
    closeSpellDetail() {
      this.detailSpell = null;
    }
  },
  data() {
    return {
      isEditModalOpen: false,
      detailSpell: null
    };
  },
  components: {
    SpellSlotIndicator,
    EditSlots,
    SpellDetail
  }
};
</script>

<style></style>
