<template>
    <svg class="symbol-icon-svg" aria-hidden="true">
      <use :xlink:href="iconSvg"></use>
    </svg>
  </template>
  <script setup>
  import { defineProps, computed } from "vue";
  const props = defineProps({
    name: {
      type: String,
      required: true,
    }
  })
  const iconSvg = computed(() => `#me-${props.name}`)
  </script>
   
  <style scoped lang="scss">
  .symbol-icon-svg {
    width: 1.5em;
    height: 1.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  </style>