<template>
  <div class="w-full h-full flex" :class="{ 'select-none': !editable }">
    <component :editable='editing' :is="currentComponent" v-model="content" v-model:anchors="anchors"></component>
    <div v-if="editable"
      class="fixed top-28 right-4 w-8 h-8 text-center rounded-full border bg-blue-700/10 hover:bg-blue-500 z-40 cursor-pointer"
      @click="doAction">
      <RemixIcon class="text-slate-50 text-lg" :name="editing ? 'save-line' : 'file-edit-line'" />
    </div>
  </div>
</template>

<script setup lang="ts">
// import MdEditor from "@/components/editor/Markdown.vue"
import { ref, shallowRef, watch, defineAsyncComponent } from "vue"
import { useRoute } from "vue-router";
import { getBookById, updateBook } from "@/api/book";
import Book from "@/types/book"
import Anchor from "@/types/anchor";
import message from '@/components/feedback/message'
import RemixIcon from "@/components/common/RemixIcon.vue"
const route = useRoute();
const currentComponent = shallowRef();
const content = ref('');
const anchors = ref(Array<Anchor>());
const editable = ref(false);
const editing = ref(false);
let previousContent = '';
const id = ref('')
// let intervalSave: NodeJS.Timeout | number;
const autoSave = () => {
  return new Promise((resolve) => {
    if (content.value === previousContent) return resolve(true);
    let formatAnchors: Anchor[] = [];
    if (anchors.value.length > 0) {
      formatAnchors = anchors.value.map((anchor: Anchor) => {
        return {
          id: anchor.id,
          itemIndex: anchor.itemIndex,
          level: anchor.level,
          originalLevel: anchor.originalLevel,
          pos: anchor.pos,
          textContent: anchor.textContent
        };
      });
    }
    let book: Book = {
      id: id.value,
      content: content.value,
      anchors: formatAnchors
    }
    updateBook(book).then((data) => {
      if (data) {
        previousContent = content.value;
        message.success('保存成功');
        resolve(true);
      }
    }).catch(msg => {
      message.error(msg);
      resolve(false);
    })
  })
}
const setCurrentComponent = (type) => {
  switch (type) {
    case "markdown": {
      currentComponent.value = defineAsyncComponent(() =>
        import('@/components/editor/Markdown.vue')
      );
      break;
    }
    case "chat":
    case "text": {
      currentComponent.value = defineAsyncComponent(() =>
        import('@/components/editor/Text.vue')
      );
      break;
    }
    case "code": {
      currentComponent.value = defineAsyncComponent(() =>
        import('@/components/editor/Code.vue')
      );
      break;
    }
    case "task": {
      currentComponent.value = defineAsyncComponent(() =>
        import('@/components/editor/Task.vue')
      );
      break;
    }
    case "drawing": {
      currentComponent.value = defineAsyncComponent(() =>
        import('@/components/editor/Drawing.vue')
      );
      break;
    }
    default: {
      currentComponent.value = defineAsyncComponent(() =>
        import('@/components/editor/Markdown.vue')
      );
      break;
    }
  }
}
const doAction = () => {
  // 编辑模式
  if (editing.value) {
    // 保存
    autoSave().then(() => {
      editing.value = false;
    });
  } else {
    editing.value = editable.value;
  }
}
watch(() => route.params.id, (newVal, oldValue) => {
  if (newVal && newVal !== oldValue) {
    if (typeof (newVal) === 'string') {
      id.value = newVal || '';
    }
    getBookById(id.value).then((data: Book) => {
      content.value = data.content || '';
      anchors.value = data.anchors || [];
      previousContent = data.content || "";
      editable.value = data.editable || false;
      setCurrentComponent(data.type);
    }).catch((msg)=>{
      message.error(msg);
    })
  }
}, { immediate: true })

// onBeforeMount(() => {
//   intervalSave = setInterval(() => {
//     autoSave()
//   }, 5000)
// })

// onBeforeUnmount(() => {
//   clearInterval(intervalSave)
// })
</script>


<style lang="scss"></style>
