<template>
  <div class="dice-roller-button has-text-right">
    <span
      class="dice-roller-button__button has-background-primary"
      @click="$emit('click')"
    >
      <b-icon pack="fas" icon="dice-d20" />
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.dice-roller-button {
  height: 56px;
  cursor: pointer;

  &__button {
    vertical-align: middle;
    line-height: 56px;
    padding: 14px;
    border-radius: 28px;
  }
}
</style>
