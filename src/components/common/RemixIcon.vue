<template>
    <i :class="`ri-${name}`" />
  </template>
  <script setup>
  import { defineProps } from "vue";
  const props = defineProps({
    name: {
      type: String,
      required: true
    }
  })
  </script>
  <style scoped lang="scss">
  </style>