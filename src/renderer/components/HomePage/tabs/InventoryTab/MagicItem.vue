<template>
  <!-- <div class="magic-item column box is-3">
    <h3 class="is-size-4">{{ magicItem.name }}</h3>
    <hr />
    <p>
      Attuned?
      <span class="icon">
        <i class="fas fa-check" v-if="magicItem.attuned" />
        <i class="fas fa-times" v-else />
      </span>
    </p>
  </div> -->
  <div class="card magic-item ">
    <header class="card-header has-background-primary has-text-centered">
      <p class="card-header-title has-text-centered">
        {{ magicItem.name }}
      </p>
    </header>
    <div class="card-image">
      <figure class="is-1by1">
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
      </figure>
    </div>
    <div class="card-content">
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
</template>

<script>
import CircleProgress from "@/components/global/CircleProgress";
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
  }
};
</script>

<style lang="scss">
.magic-item {
  width: 260px;
  margin: 20px;
}
</style>
