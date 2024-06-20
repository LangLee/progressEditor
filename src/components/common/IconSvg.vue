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
    width: 1em;
    height: 1em;
    vertical-align: -0.1em;
    fill: currentColor;
    overflow: hidden;
  }
  </style>