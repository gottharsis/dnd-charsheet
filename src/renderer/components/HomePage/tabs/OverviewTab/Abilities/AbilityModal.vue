<template>
  <div class="ability-modal">
    <h3 class="is-size-3 has-text-weight-bold">
      {{ ability.name }}
    </h3>
    <p>
      {{ ability.description }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    ability: Object
  }
};
</script>

<style></style>
