<template>
  <div class="spell-detail">
    <div class="content">
      <h2 class="is-size-2 has-text-centered has-text-weight-bold">
        {{ spell.name }}
      </h2>
      <div class="has-text-weight-bold ">
        {{ spell.classes.join(", ") }}
      </div>
      <div class="is-italic">
        <span v-if="spell.level == 0"> Cantrip</span>
        <span v-else>Level {{ spell.level }}</span
        >, {{ spell.school }}
      </div>
      <div></div>
      <h2>Description</h2>
      <!-- <p>{{ spell.description }}</!-->

      <p v-html="spell.description"></p>

      <!-- <h2>Range, Casting Time, and Duration</h2> -->
      <p><span class="has-text-weight-bold">Range: </span>{{ spell.range }}</p>
      <p>
        <span class="has-text-weight-bold">Duration: </span>{{ spell.duration }}
      </p>

      <p>
        <span class="has-text-weight-bold">Casting Time: </span
        >{{ spell.casting_time }}
      </p>

      <p>
        <span class="has-text-weight-bold">Concentration: </span>
        {{ spell.concentration }}
      </p>

      <div v-if="spell.at_higher_level">
        <h3>At Higher levels</h3>
        <p>{{ spell.at_higher_level }}</p>
      </div>
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
}
</style>
