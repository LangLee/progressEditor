<template>
  <div class="relative overflow-hidden min-w-56">
    <template v-if="items.length">
      <div v-for="(item, index) in items" :key="index"
        class="h-8 leading-8 px-2 rounded mb-1 hover:bg-neutral-100 dark:hover:bg-neutral-600 cursor-pointer text-gray-700 dark:text-gray-200"
        :class="{ 'bg-neutral-200 dark:bg-neutral-500': index === selectedIndex}" @click="selectItem(index)">
        <RemixIcon :name="item.icon" />
        <span class="ml-2">{{ item.title }}</span>
      </div>
    </template>
    <div v-else class="block px-2 w-full text-left">
      No result
    </div>
  </div>
</template>

<script>
import RemixIcon from '@/components/common/RemixIcon.vue'
export default {
  components: {
    RemixIcon,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    }
  },

  watch: {
    items() {
      this.selectedIndex = 0
    },
  },

  methods: {
    onKeyDown({ event }) {
      event.stopPropagation();
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }
      return false
    },

    upHandler() {
      this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
    },

    enterHandler() {
      this.selectItem(this.selectedIndex)
    },

    selectItem(index) {
      const item = this.items[index]

      if (item) {
        this.command(item)
      }
    },
  },
}
</script>

<style lang="scss"></style>