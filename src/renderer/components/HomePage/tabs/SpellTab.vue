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
    <table class="table is-bordered is-striped is-fullwidth has-text-centered">
      <thead>
        <tr>
          <th class="has-text-centered">Id</th>
          <th class="has-text-centered">Name</th>
          <th class="has-text-centered">Level</th>
          <th class="has-text-centered">School</th>
          <th class="has-text-centered">Known?</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="spell in spells" :key="spell.id">
          <td>{{ spell.id }}</td>
          <td>{{ spell.name }}</td>
          <td>{{ spell.level }}</td>
          <td>{{ spell.school }}</td>
          <td>
            <button
              class="button is-info is-outlined is-static"
              v-if="isSpellKnown()(spell.id)"
            >
              Spell Already Known
            </button>
            <button
              class="button is-info "
              v-else
              @click="learnSpell({ spellId: spell.id })"
            >
              Learn
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <b-modal :active.sync="isEditModalOpen">
      <edit-slots />
    </b-modal>
    {{ knownIds }}
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState: GuideState } = createNamespacedHelpers("Guide");
import SpellSlotIndicator from "./SpellTab/SpellSlotIndicator";
import EditSlots from "./SpellTab/EditSlots";

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
    })
  },
  methods: {
    ...CharGetter(["isSpellKnown"]),
    ...charActions(["learnSpell"])
  },
  data() {
    return {
      isEditModalOpen: false
    };
  },
  components: {
    SpellSlotIndicator,
    EditSlots
  }
};
</script>

<style></style>
