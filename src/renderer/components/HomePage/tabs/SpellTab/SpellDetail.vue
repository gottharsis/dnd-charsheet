<template>
  <div class="spell-detail box">
    {{ spell.name }}
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
