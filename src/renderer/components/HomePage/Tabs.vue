<template>
  <div class="tabs is-toggle is-centered">
    <ul>
      <li
        v-for="(tab, i) in tabs"
        :key="tab.name"
        :class="{ 'is-active': i == activeIndex }"
      >
        <router-link :to="tab.link" @click.native="setActiveIndex(i)">
          {{ tab.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          name: "Overview",
          link: "/overview"
        },
        {
          name: "Spells",
          link: "/spells"
        },
        {
          name: "Combat",
          link: "/combat"
        },
        {
          name: "Inventory",
          link: "/inventory"
        },
        {
          name: "Notes",
          link: "/notes"
        }
      ],
      activeIndex: 0
    };
  },
  methods: {
    setActiveIndex(i) {
      this.activeIndex = i;
    }
  }
};
</script>

<style></style>
