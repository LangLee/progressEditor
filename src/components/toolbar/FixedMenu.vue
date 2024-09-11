<template>
  <div v-if="editor" :editor="editor"
    class="fixedMenu flex flex-wrap p-2 bg-neutral-50 dark:bg-neutral-700 text-gray-700 dark:text-gray-100">
    <Dropdown class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      :options="aiOptions">
      <template #title>
        <RemixIcon class="mr-1 text-purple-500 dark:text-purple-300" name="robot-2-line"></RemixIcon>
        <span class="text-purple-500 dark:text-purple-300">Ai Tools</span>
      </template>
      <template #item="{ item }">
        <div
          class="h-8 leading-8 px-2 rounded mb-1 hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer text-gray-700 dark:text-gray-200"
          @click="handleAIWrite(item.value)"
          :class="{ 'bg-neutral-200 dark:bg-neutral-600': editor.isActive('heading', { level: item.level }) }">
          <RemixIcon :name="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </div>
      </template>
    </Dropdown>
    <!-- <div class="my-2 border-l border-gray-300"></div> -->
    <Dropdown class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      :options="headingOptions">
      <template #title>
        <RemixIcon name="heading"></RemixIcon>
      </template>
      <template #item="{ item }">
        <div
          class="h-8 leading-8 px-2 rounded mb-1 hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer text-gray-700 dark:text-gray-200"
          @click="editor.chain().focus().toggleHeading({ level: item.level }).run()"
          :class="{ 'bg-neutral-200 dark:bg-neutral-600': editor.isActive('heading', { level: item.level }) }">
          <RemixIcon :name="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </div>
      </template>
    </Dropdown>
    <Dropdown class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      :options="listOptions">
      <template #title>
        <RemixIcon name="menu-line"></RemixIcon>
      </template>
      <template #item="{ item }">
        <div
          class="h-8 leading-8 px-2 rounded mb-1 hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer text-gray-700 dark:text-gray-200"
          @click="editor.chain().focus()[item.command]().run()" :class="{ 'bg-neutral-200 dark:bg-neutral-600': editor.isActive(item.value) }">
          <RemixIcon :name="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </div>
      </template>
    </Dropdown>
    <div class="my-2 border-l border-gray-300"></div>
    <div class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'bg-neutral-200 dark:bg-neutral-600': editor.isActive('bold') }">
      <RemixIcon name="bold" />
    </div>
    <div class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'bg-neutral-200 dark:bg-neutral-600': editor.isActive('italic') }">
      <RemixIcon name="italic" />
    </div>
    <div class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().toggleUnderline().run()"
      :disabled="!editor.can().chain().focus().toggleUnderline().run()"
      :class="{ 'bg-neutral-200 dark:bg-neutral-600': editor.isActive('underline') }">
      <RemixIcon name="underline" />
    </div>
    <div class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :class="{ 'bg-neutral-200 dark:bg-neutral-600': editor.isActive('strike') }">
      <RemixIcon name="strikethrough" />
    </div>
    <tippy ref="linkDropdown" trigger="click" placement="bottom" :offset="[0, 10]" animation="scale" :interactive="true"
      :appendTo="appendToBody" :onShow="setLinkShow" :onHide="setLinkHide" maxWidth="none">
      <div class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
        :class="{ 'bg-neutral-200 dark:bg-neutral-600': editor.isActive('link') }">
        <RemixIcon name="link" />
      </div>
      <template #content>
        <div class="flex flex-row shadow-lg bg-white rounded-lg p-1">
          <label for="link" class="mr-2">
            <input type="text" id="link" v-model="link" class="p-2 rounded-lg" placeholder="https://" />
          </label>
          <button class="w-full px-2 my-1 rounded-lg bg-purple-500 text-white" @click="setLink">set</button>
        </div>
      </template>
    </tippy>
    <!-- <div class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().setParagraph().run()" :class="{ 'bg-neutral-200 dark:bg-neutral-600': editor.isActive('paragraph') }">
      <RemixIcon name="paragraph" />
    </div> -->
    <div class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().toggleCode().run()" :disabled="!editor.can().chain().focus().toggleCode().run()"
      :class="{ 'bg-neutral-200 dark:bg-neutral-600': editor.isActive('code') }">
      <RemixIcon name="code-view" />
    </div>
    <div class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'bg-neutral-200 dark:bg-neutral-600': editor.isActive('codeBlock') }">
      <RemixIcon name="code-block" />
    </div>
    <div class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().toggleBlockquote().run()">
      <RemixIcon name="quote-text" />
    </div>
    <!-- <div class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().setHorizontalRule().run()">
      <RemixIcon name="separator" />
    </div> -->
    <!-- <div class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().setHardBreak().run()">
      <RemixIcon name="text-wrap" />
    </div> -->
    <!-- <div class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @mousedown="onTranslate">
      <RemixIcon name="translate" />
    </div> -->
    <Dropdown class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      :options="blockOptions">
      <template #title>
        <RemixIcon name="paragraph"></RemixIcon>
      </template>
      <template #item="{ item }">
        <div
          class="h-8 leading-8 px-2 rounded mb-1 hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer text-gray-700 dark:text-gray-200"
          @click="editor.chain().focus()[item.command]().run()">
          <RemixIcon :name="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </div>
      </template>
    </Dropdown>
    <div class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().save()">
      <RemixIcon name="save-line" />
    </div>
    <div class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().share()">
      <RemixIcon name="share-line" />
    </div>
    <div class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().import()">
      <RemixIcon name="import-line" />
    </div>
    <Dropdown class="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      :options="exportOptions" :arrow="false">
      <template #title>
        <RemixIcon name="export-line"></RemixIcon>
      </template>
      <template #item="{ item }">
        <div
          class="h-8 leading-8 px-2 rounded mb-1 hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer text-gray-700 dark:text-gray-200"
          @click="handleExport(item.value)">
          <RemixIcon :name="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </div>
      </template>
    </Dropdown>
  </div>
</template>
<script setup>
import { ref, reactive, defineProps, defineComponent, onMounted, defineEmits } from 'vue'
import RemixIcon from '../common/RemixIcon.vue'
import { getYouDaoAiTranslate, getAiChatStream } from "@/api/ai"
import message from '../feedback/message';
import Dropdown from '@/components/navigation/Dropdown.vue'
import { marked } from 'marked'
const appendToBody = () => document.body;
const props = defineProps({
  editor: {
    type: Object,
    default: null
  }
})
const emits = defineEmits(['save', 'import', 'export', 'share']);
const link = ref('');
const linkDropdown = ref();
const aiOptions = [{
  value: 'write',
  label: "Write",
  icon: 'edit-2-line'
}, {
  value: 'complete',
  label: "Complete",
  icon: 'check-line'
}, {
  value: 'simplify',
  label: "Simplify",
  icon: 'edit-circle-line'
},
{
  value: 'summarize',
  label: "Summarize",
  icon: 'more-line'
}, {
  value: 'correction',
  label: "Correction",
  icon: 'eraser-line'
},
{
  value: 'longer',
  label: "Longer",
  icon: 'expand-right-line'
}];
const headingOptions = [{
  value: 'heading1',
  label: "Heading 1",
  level: 1,
  icon: 'h-1'
}, {
  value: 'heading2',
  label: "Heading 2",
  level: 2,
  icon: 'h-2'
}, {
  value: 'heading3',
  label: "Heading 3",
  level: 3,
  icon: 'h-3'
}, {
  value: 'heading4',
  label: "Heading 4",
  level: 4,
  icon: 'h-4'
}, {
  value: 'heading5',
  label: "Heading 5",
  level: 5,
  icon: 'h-5'
}, {
  value: 'heading6',
  label: "Heading 6",
  level: 6,
  icon: 'h-6'
}];
const listOptions = [{
  value: 'bulletList',
  label: "Bullet list",
  icon: 'list-unordered',
  command: 'toggleBulletList'
}, {
  value: 'orderedList',
  label: "Ordered list",
  icon: 'list-ordered-2',
  command: 'toggleOrderedList'
}, {
  value: 'taskList',
  label: "Task list",
  icon: 'list-check-3',
  command: 'toggleTaskList'
}];

const blockOptions = [{
  value: 'paragraph',
  label: "Paragraph",
  icon: 'paragraph',
  command: 'setParagraph'
}, {
  value: 'horizontalRule',
  label: "Horizontal",
  icon: 'separator',
  command: 'setHorizontalRule'
}, {
  value: 'hardBreak',
  label: "HardBreak",
  icon: 'text-wrap',
  command: 'setHardBreak'
}];
const exportOptions = [{
  value: 'markdown',
  label: "导出markdown",
  icon: 'markdown-line'
}, {
  value: 'json',
  label: "导出json",
  icon: 'javascript-line'
}, {
  value: 'html',
  label: "导出html",
  icon: 'html5-line'
}, {
  value: 'docx',
  label: "导出word",
  icon: 'file-word-line'
}]
const setLinkShow = () => {
  let linkStr = props.editor.getAttributes('link').href;
  link.value = linkStr;
  return true;
};
const setLinkHide = () => {
  return true;
}
const setLink = () => {
  let url = link.value;
  // empty
  if (!url) {
    props.editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .unsetLink()
      .run()
  } else {
    // update link
    props.editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run()
  }
  link.value = '';
  linkDropdown?.value?.hide();
}
const onTranslate = () => {
  let { doc, selection } = props.editor?.view?.state || {};
  let { from, to } = selection || {};
  let text = doc.textBetween(selection.from, selection.to, '\n');
  if (from === to || !text) {
    message.warning("请选择要翻译的文本！")
  }
  const reg = new RegExp(/^[a-zA-Z/s]*$/);
  const isEnglish = reg.test(text);
  getYouDaoAiTranslate({ query: text, from: isEnglish ? "en" : "zh-CHS", to: isEnglish ? "zh-CHS" : "en" }).then((data) => {
    let translation = data.translation;
    if (translation !== text) {
      // 在翻译单词后插入翻译结果
      props.editor.commands.insertContentAt(to, `<em>[翻译：${translation}]</em>`);
    }
  })
}
const handleAIWrite = (key) => {
  let prompt = '';
  switch (key) {
    case 'simplify':
      prompt = '将以下文本简化为更易懂的表达方式，尽量使用简单的词汇和短句，同时保持原意不变。'
      break;
    case 'translate':
      prompt = '将以下文本从[源语言]翻译成[目标语言]。'
      break;
    case 'summarize':
      prompt = '阅读以下文章，并提供一个简短的摘要。'
      break;
    case 'correction':
      prompt = '检查这段文本中的语法和拼写错误，并进行修正。'
      break;
    case 'longer':
      prompt = '使用更多的细节或例证来扩写这段文本。'
      break;
    case 'complete':
      prompt = '根据以下提示或关键词，生成一段新的文本。'
      break;
    default: break
  }
  let { doc, selection, tr } = props.editor?.view?.state || {};
  let { from, to } = selection || {};
  let text = doc.textBetween(from, to, '\n');
  props.editor.chain().focus().setAiWrite({ question: text, prompt }).run();
}
const handleExport = (key) => {
  switch (key) {
    case 'json':
      props?.editor?.commands?.export('json');
      break;
    case 'html':
      props?.editor?.commands?.export('html');
      break;
    case 'markdown':
      props?.editor?.commands?.export('markdown');
      break;
    case 'docx':
      props?.editor?.commands?.import('docx');
    default: break
  }
}
</script>


<style lang='scss' scoped>
.fixedMenu {
  box-shadow: 0 -5px 10px 0 rgb(0 0 0 / 0.1)
  
}
</style>