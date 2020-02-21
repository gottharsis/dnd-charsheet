<template>
  <div class="spell-detail box">
    <div class="content">
      <h2 class="is-size-2 has-text-centered has-text-weight-bold">
        {{ spell.name }}
      </h2>

      <p class="has-text-weight-bold">Description</p>
      <p>{{ spell.description }}</p>

      <p class="has-text-weight-bold">Range</p>
      <p>{{ spell.range }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    spell: Object
  }
};
</script>

<style>
.spell-detail {
  max-width: 640px;
  width: 640px;
}
</style>
