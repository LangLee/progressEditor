<template>
  <div class="w-full h-full flex" :class="{ 'select-none': !editable }">
    <component :editable='editable' :is="currentComponent" v-model="content" v-model:anchors="anchors" @save="save"
      @share="share" @export="onExport"></component>
    <!-- <div v-if="editable"
      class="fixed top-28 right-4 w-8 h-8 text-center rounded-full border bg-blue-700/10 hover:bg-blue-500 z-40 cursor-pointer"
      @click="doAction">
      <RemixIcon class="text-slate-50 text-lg" :name="editing ? 'save-line' : 'file-edit-line'" />
    </div> -->
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
// import RemixIcon from "@/components/common/RemixIcon.vue"
import loading from '@/components/feedback/loading.ts'
import { change } from '@/common/status'
import { copyTextToClipboard } from '@/common/utils'
import markdown from "@/components/editor/extend/markdown"
import { saveAs } from 'file-saver'
import { upload } from "@/api/file";
const route = useRoute();
const currentComponent = shallowRef();
const content = ref('');
const anchors = ref(Array<Anchor>());
const editable = ref(false);
let currentBook;
let previousContent = '';
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
      id: currentBook._id,
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
const save = () => {
  autoSave().then(() => {
    change(false);
  });
}
const share = () => {
  let book: Book = {
    id: currentBook._id,
    share: true
  }
  updateBook(book).then(() => {
    const url = `${window.location.origin}/#/book/${book.id}`;
    const text = `标题：${book.title}\n链接：${url}\n`;
    copyTextToClipboard(text, () => {
      message.success("已经复制到剪切板！");
    });
  })
}
const onExport = (type, editor) => {
  switch (type) {
    case 'json': {
      let json = editor.getJSON();
      const blob = new Blob([JSON.stringify(json)], {
        type: 'application/json;charset=utf-8'
      })
      saveAs(blob, `${currentBook.title}.json`)
      break;
    }
    case 'html': {
      let html = editor.getHTML();
      const blob = new Blob([html], {
        type: 'text/html;charset=utf-8'
      })
      saveAs(blob, `${currentBook.title}.html`)
      break;
    }
    case 'docx': {
      message.warning("暂不支持导出docx格式, 敬请期待！");
      break;
    }
    case 'markdown': {
      let md = markdown.serialize(editor.view.state.doc);
      const blob = new Blob([md], {
        type: 'text/markdown;charset=utf-8'
      })
      saveAs(blob, `${currentBook.title}.md`)
      break;
    }
    case 'pdf': {
      message.warning("暂不支持导出docx格式, 敬请期待！");
      break;
    }
    default:
      break;
  }
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
      currentComponent.value = defineAsyncComponent(() =>
        import('@/components/editor/Chat.vue')
      );
      break;
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
watch(() => route.params.id, (newVal, oldValue) => {
  if (newVal && newVal !== oldValue) {
    newVal = typeof (newVal) === 'string' ? newVal : '';
    loading.show();
    getBookById(newVal).then((data: Book) => {
      content.value = data.content || '';
      anchors.value = data.anchors || [];
      previousContent = data.content || "";
      editable.value = (data.editable && data.type !== 'chat') || false;
      setCurrentComponent(data.type);
      currentBook = data;
      loading.hide();
    }).catch((msg) => {
      message.error(msg);
      loading.hide();
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
