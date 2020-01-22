<template>
  <div id="edit-slots has-padding-top-20" class="box">
    <h1 class="has-text-centered has-text-weight-bold is-size-2">Edit Slots</h1>
    <div class="container">
      <form @submit.prevent="submit">
        <div class="columns is-multiline">
          <div
            v-for="slot in slots"
            :key="slot.level"
            class="column is-one-third"
          >
            <div class="box">
              <p class="has-text-centered has-text-weight-bold">
                Level {{ slot.level }} slot
              </p>

              <div class="field">
                <label for="" class="label">Max</label>
                <div class="control">
                  <input
                    class="input"
                    type="number"
                    min="0"
                    v-model.number="slot.max"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Used</label>
                <div class="control">
                  <input
                    :class="{
                      input: true,
                      'is-danger': slot.used > slot.max
                    }"
                    v-model.number="slot.used"
                    type="number"
                    min="0"
                  />
                </div>
              </div>
              <p class="help is-danger" v-if="slot.used > slot.max">
                Invalid amount of used slots
              </p>
            </div>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-primary"
              type="submit"
              :disabled="!isValid"
            >
              Save Changes
            </button>
          </div>

          <div class="control">
            <button class="button" @click.prevent="setSlots">Reset</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import deepclone from "lodash/cloneDeep";
import { ipcRenderer } from "electron";
const { mapState, mapActions } = createNamespacedHelpers("Character");
export default {
  computed: {
    ...mapState({
      currentSlots: state => state.character.magic.spellSlots
    }),
    isValid() {
      return this.slots.every(sl => sl.max >= sl.used);
    }
  },
  data() {
    return {
      slots: []
    };
  },
  mounted() {
    this.setSlots();
    console.log("EditSlots mounted");
  },
  methods: {
    submit() {
      const hasDifference = (original, changed) =>
        !(original.max === changed.max && original.used === changed.used);

      const changedSlots = this.slots.filter(slot => {
        const original = this.currentSlots.find(i => i.level === slot.level);
        return hasDifference(original, slot);
      });

      this.setSpellSlots({ updatedSlots: changedSlots });
      this.$emit("close");
    },
    setSlots() {
      this.slots = deepclone(this.currentSlots).filter(i => i.level > 0);
    },
    ...mapActions(["setSpellSlots"])
  }
};
</script>

<style>
.edit-slots {
  max-width: 640px;
}
</style>
