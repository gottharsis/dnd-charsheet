<template>
  <div
    class="circle-progress"
    :style="{
      height: size,
      width: size
    }"
  >
    <svg class="circle-progress__ring" :height="size" :width="size">
      <circle
        :stroke-width="strokeWidth"
        stroke="lightgrey"
        fill="transparent"
        :r="innerRadius"
        :cx="radius"
        :cy="radius"
        :style="{
          'stroke-dasharray': `${circumference} ${circumference}`
        }"
        v-if="showBackground"
      />
      <circle
        class="circle-progress__circle"
        :stroke-width="strokeWidth"
        :stroke="stroke"
        :fill="fill"
        :r="innerRadius"
        :cx="radius"
        :cy="radius"
        :style="{
          'stroke-dasharray': `${circumference} ${circumference}`,
          'stroke-dashoffset': offset
        }"
      />
    </svg>
    <div class="circle-progress__inner" :style="innerPosition">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 50
    },
    radius: {
      type: Number,
      default: 60
    },
    strokeWidth: {
      type: Number,
      default: 4
    },
    showBackground: {
      type: Boolean,
      default: true
    },
    // stroke: {
    //   type: String,
    //   default: "green"
    // },
    strokeFunc: {
      type: Function,
      default: ratio => {
        if (ratio >= 75) {
          return "green";
        } else if (ratio >= 50) {
          return "blue";
        } else if (ratio >= 25) {
          return "orange";
        } else {
          return "red";
        }
      }
    },
    fill: {
      type: String,
      default: "transparent"
    }
  },

  computed: {
    innerRadius() {
      return this.radius - 2 * this.strokeWidth;
    },
    circumference() {
      return 2 * Math.PI * this.innerRadius;
    },
    percentage() {
      return this.value / 100;
    },
    offset() {
      return (1 - this.percentage) * this.circumference;
    },
    innerPosition() {
      const proportion = Math.sqrt(2) / 2;
      return {
        position: "absolute",
        top: `${60 - proportion * 52}px`,
        bottom: `${60 - proportion * 52}px`,
        left: `${60 - proportion * 52}px`,
        right: `${60 - proportion * 52}px`
      };
    },
    size() {
      return `${2 * this.radius}px`;
    },
    stroke() {
      return this.strokeFunc(this.value);
    }
  }
};
</script>

<style lang="scss">
.circle-progress {
  position: relative;
  display: inline-block;
  .circle-progress__ring {
    position: abolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .circle-progress__circle {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }

  .circle-progress__inner {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

circle {
  transition: stroke-dashoffset 0.5s ease-in;
}
</style>
