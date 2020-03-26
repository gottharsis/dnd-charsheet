<template>
  <div class="magic-item">
    <div class="card" @click="isDetailModalOpen = true">
      <header class="card-header  has-text-centered">
        <p class="card-header-title has-text-centered">
          {{ magicItem.name }}
        </p>
      </header>
      <div class="card-content">
        <circle-progress
          :value="percentage"
          :radius="100"
          style="margin-left: 30px; margin-right: 30px;"
        >
          <div class="has-text-weight-bold">Remaining Charges</div>
          <div>
            <span class="is-size-2">{{ magicItem.charges }}</span> /
            {{ magicItem.maxCharges }}
          </div>
        </circle-progress>

        <hr class="has-background-white-bis" />
        <div class="content">
          <p>
            <span class="has-text-weight-bold">Attuned?</span>
            <span class="icon">
              <i
                class="fas fa-check has-text-success"
                v-if="magicItem.attuned"
              ></i>
              <i class="fas fa-times has-text-danger" v-else></i>
            </span>
          </p>

          <div class="has-text-weight-bold">Description</div>
          <div>
            {{ magicItem.description }}
          </div>
        </div>
      </div>
    </div>
    <b-modal :active.sync="isDetailModalOpen">
      <div class="content box">
        <h1 class="has-text-centered">{{ magicItem.name }}</h1>
        <div class="columns">
          <div class="column is-4">
            <form @submit="useCharges(chargesToUse)">
              <div
                class="flex-row align-items-center has-margin-bottom-10"
                style=""
              >
                <div class="has-margin-right-5">Use</div>
                <b-input native-type="number" v-model.number="chargesToUse" />
                <div class="has-margin-left-5">
                  charges
                </div>
              </div>
              <b-button native-type="submit">
                Use
              </b-button>
            </form>
          </div>

          <div class="column is-4">
            <circle-progress
              :value="percentage"
              :radius="100"
              style="margin-left: 30px; margin-right: 30px;"
            >
              <div class="has-text-weight-bold">Remaining Charges</div>
              <div>
                <span class="is-size-2">{{ magicItem.charges }}</span> /
                {{ magicItem.maxCharges }}
              </div>
            </circle-progress>
          </div>

          <div class="column is-4">
            <b-button icon-left="sync" icon-pack="fas" @click="restoreCharges">
              Restore all charges
            </b-button>
          </div>
        </div>
        <div>
          <h2>Description</h2>
          <p>
            {{ magicItem.description }}
          </p>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import CircleProgress from "@/components/global/CircleProgress";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("Character");

export default {
  props: {
    magicItem: Object
  },
  components: {
    CircleProgress
  },
  computed: {
    percentage() {
      return (100 * this.magicItem.charges) / this.magicItem.maxCharges;
    }
  },
  data() {
    return {
      isDetailModalOpen: false,
      chargesToUse: 1
    };
  },
  methods: {
    ...mapActions(["updateMagicItem"]),
    useCharges(n) {
      const totalCharges = this.magicItem.charges - n;
      console.log("totalCharges: " + totalCharges);
      if (totalCharges < 0 || totalCharges > this.magicItem.maxCharges) {
        return;
      }
      const id = this.magicItem.id;
      const newItem = {
        ...this.magicItem,
        charges: totalCharges
      };
      this.updateMagicItem({
        id,
        newItem
      });
    },
    restoreCharges() {
      const charges = this.magicItem.maxCharges;
      const newItem = {
        ...this.magicItem,
        charges
      };
      const id = this.magicItem.id;
      this.updateMagicItem({
        id,
        newItem
      });
    }
  }
};
</script>

<style lang="scss">
.magic-item {
  width: 300px;
  max-width: 300px;
  margin: 20px;
}
</style>
