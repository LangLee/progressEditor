<template>
<div class="flex lg:flex-row flex-col h-screen w-full justify-center items-center p-4 text-slate-700">
    <textarea v-model="source" class="w-full border-2 rounded-md lg:shadow-md p-2 border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent" rows="10" @keyup.enter="onTranslate"></textarea>
    <div class="text-2xl p-2 text-purple-400 hover:text-purple-700 rotate-90 lg:rotate-0" @click="onTranslate">
        <RemixIcon name="arrow-left-right-line"/>
    </div>
    <textarea v-model="target" class="w-full border-2 rounded-md lg:shadow-md p-2 border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent" rows="10" readonly></textarea>
</div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import {getYouDaoAiTranslate} from '@/api/ai'
const source = ref('');
const target = ref('');
const onTranslate = ()=>{
  if (!source.value) {
    message.warning("请输入要翻译的文本！")
  }
  source.value = source.value.replace(/[\r\n]/g, "");
  const reg = new RegExp(/^[a-zA-Z]+$/);
  const isEnglish = reg.test(source.value);
  getYouDaoAiTranslate({query: source.value, from: isEnglish ? "en" : "zh-CHS", to: isEnglish ? "zh-CHS": "en"}).then((data) => {
    target.value = data;
  })
}
</script>


<style lang='scss' scoped>

</style>