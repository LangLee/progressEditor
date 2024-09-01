<template>
  <node-view-wrapper>
    <div class="flex flex-col bg-gray-100 m-1 p-4 rounded-md">
      <div v-if="response" class="w-full mt-1">
        <div class="text-gray-600 mb-2 px-1 text-sm">Preview</div>
        <span id="response"
          class="inline-block w-full max-w-full max-h-80 bg-white p-2 border border-slate-300/20 rounded-md prose dark:prose-invert tiptap overflow-y-auto"
          v-html="response"></span>
      </div>
      <label class="mt-1" for="prompt">
        <div class="text-gray-600 mb-2 px-1 flex items-center text-sm">
          <span class="mr-2">Prompt</span>
          <button class="text-white bg-slate-400 hover:bg-slate-500 rounded-lg px-1 mr-2" @click.stop="onAddPrompt">
            <RemixIcon class="mr-1" name="add-line" />
            <span>创建提词</span>
          </button>
          <Dropdown title="选择提词" :options="prompts" @select="onSelectPrompt">
            <template #item="{ item }">
              <div class="h-8 leading-8 px-2 rounded mb-1 hover:bg-gray-100 cursor-pointer text-gray-500"
                @click="onSelectPrompt(item)">{{ item.name }}</div>
            </template>
          </Dropdown>
        </div>
        <textarea id="prompt" name="prompt"
          class="px-2 rounded-md w-full border border-slate-300/20 focus:outline-none focus:ring-none" rows="2"
          v-model="prompt"></textarea>
      </label>
      <label class="mt-1" for="question">
        <div class="text-gray-600 mb-2 px-1 text-sm">Question</div>
        <textarea id="question" name="question"
          class="px-2 rounded-md w-full border border-slate-300/20 font-medium focus:outline-none focus:ring-none"
          rows="3" v-model="question"></textarea>
      </label>
      <div class="flex flex-row">
        <div>
          <button v-if="response" class="bg-slate-500 hover:bg-slate-700 text-white py-1 px-2 rounded-md mr-2"
            @click="onAdd">
            <RemixIcon class="mr-2" name="add-fill"></RemixIcon>
            <span>insert</span>
          </button>
          <button class="bg-slate-500 hover:bg-slate-700 text-white py-1 px-2 rounded-md" @click="onDiscard">
            <RemixIcon class="mr-2" name="delete-bin-line"></RemixIcon>
            <span>discard</span>
          </button>
        </div>
        <div class="flex-1 flex justify-end">
          <button class="bg-purple-500 hover:bg-purple-700 text-white py-1 px-2 rounded-md justify-self-end"
            @click="onGenerate" :disabled="loading">
            <RemixIcon v-if="loading" class="inline-block animate-spin duration-300" name="loader-3-fill"></RemixIcon>
            <RemixIcon v-else name="send-plane-fill"></RemixIcon>
            <span class="ml-2">{{ loading ? 'process' : 'generate' }}</span>
          </button>
        </div>
      </div>
      <PromptModal :visible="!!editPrompt" v-model:prompt="editPrompt" @confirm="onUpdatePrompt"
        @cancel="closePromptModal">
      </PromptModal>
    </div>
  </node-view-wrapper>
</template>

<script setup>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { ref, nextTick, onMounted } from 'vue'
import { getAiChatStream } from '@/api/ai'
import { marked } from 'marked'
import RemixIcon from '@/components/common/RemixIcon.vue'
import Dropdown from '@/components/navigation/Dropdown.vue'
import { getPrompts, createPrompt } from '@/api/prompt'
import PromptModal from '@/components/feedback/PromptModal.vue'
const props = defineProps(nodeViewProps)
const attrs = props?.node?.attrs;
const question = ref(attrs?.question || '')
const prompt = ref(attrs?.prompt || '')
const response = ref('')
const loading = ref(false)
const prompts = ref([])
const editPrompt = ref();
const onGenerate = () => {
  if (!question.value) return;
  let result = '';
  loading.value = true;
  getAiChatStream({ question: question.value, prompt: prompt.value, autoSave: false }, (content) => {
    result += content;
    response.value = marked(result);
    nextTick(() => {
      const aiChatContent = document.getElementById('response');
      aiChatContent && aiChatContent.scrollTo({ top: aiChatContent.scrollHeight, behavior: 'smooth' });
    })
  }, () => {
    result = '';
    loading.value = false;
  })
}
const onAdd = () => {
  props.editor.commands.insertContent(response.value);
}
const onDiscard = () => {
  props.deleteNode();
}
const onAddPrompt = () => {
  editPrompt.value = {
    name: '',
    content: prompt.value || ''
  }
}
const onUpdatePrompt = () => {
  createPrompt(editPrompt.value).then((data) => {
    prompts.value.push(data);
    closePromptModal();
  })
}
const closePromptModal = () => {
  editPrompt.value = undefined;
}
const onSelectPrompt = (item) => {
  prompt.value = item.content;
}
onMounted(() => {
  if (question.value) {
    onGenerate();
  }
  getPrompts().then((data) => {
    prompts.value = data;
  });
})
</script>

<style lang="scss"></style>