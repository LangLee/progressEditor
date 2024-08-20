<template>
  <div class="flex flex-col h-screen w-full justify-center items-center text-slate-700 dark:text-slate-300">
    <Header></Header>
    <div class="flex-1 w-full bg-slate-300/20 overflow-hidden">
      <div class="flex flex-col w-full h-full max-w-screen-md mx-auto p-2">
        <div class="flex-1 flex-col">
          <div v-if="dailyNote" class="border border-slate-300/20 rounded-lg p-2 lg:p-4 mb-2 lg:mb-4 bg-white dark:bg-neutral-800">
            <div class="font-bold py-2">
              <span class="bg-blue-500 text-slate-50 rounded-xl px-4 py-1">每日一句</span>
            </div>
            <div class="lg:text-lg p-2">{{ dailyNote.chinese || '' }}</div>
            <div class="italic lg:text-lg p-2">{{ dailyNote.english || '' }}</div>
          </div>
          <div v-if="question" class="border border-slate-300/20 rounded-lg p-2 lg:p-4 mb-2 lg:mb-4 bg-white dark:bg-neutral-800">
            <div class="font-bold text-lg lg:text-xl text-blue-700 dark:text-blue-300 py-1">{{ question }}</div>
            <span class="text-lg text-slate-300">
              <RemixIcon class="hover:text-blue-400" name="clipboard-line" @click.stop="copyText(question)" />
            </span>
          </div>
          <div v-if="response" class="border border-slate-300/20 rounded-lg p-2 lg:p-4 mb-2 lg:mb-4 bg-white dark:bg-neutral-800">
            <div class="font-bold text-lg lg:text-xl text-blue-700 dark:text-blue-300">{{ response }}</div>
            <span class="text-lg text-slate-300">
              <RemixIcon class="mr-2 hover:text-blue-400" name="volume-up-line" @click="playAudio(false)" />
              <RemixIcon class="mr-2 hover:text-blue-400" name="clipboard-line" @click.stop="copyText()" />
              <RemixIcon class="hover:text-blue-400" name="add-line" @click.stop="addText()" />
            </span>
            <audio id="responseAudioPlayer" :src="resSpeakUrl"></audio>
            <!-- <audio v-show="false" controls id="responseAudioPlayer">
          <source :src="resSpeakUrl" type="audio/mpeg">
        </audio> -->
          </div>
        </div>
        <Question @send="onTranslate" placeholder="输入中文/英文"></Question>
      </div>

    </div>
  </div>
  <Loading v-if="loading"></Loading>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import { getYouDaoAiTranslate, getYouDaoAiDict } from '@/api/ai'
import { getDailyEnglish, createWord } from '@/api/word'
import message from '@/components/feedback/message.ts'
import Header from '@/components/navigation/Header.vue'
import Loading from '@/components/common/Loading.vue'
import { copyTextToClipboard } from '@/common/utils.ts'
import Question from '@/components/entry/Question.vue'
const question = ref('');
const queSpeakUrl = ref('');
const resSpeakUrl = ref('');
const response = ref('');
const loading = ref(false);
const dictUrl = ref('');
const dailyNote = ref();
const copyText = () => {
  copyTextToClipboard(response.value);
  message.success("复制成功！")
}
const addText = () => {
  createWord({
    code: response.value,
    english: response.value,
    chinese: question.value,
    newWord: true
  }).catch((msg) => {
    message.error(msg)
  })
}
const onTranslate = (query) => {
  if (!query) {
    message.warning("请输入要翻译的文本！")
  }
  const reg = new RegExp(/^[A-Za-z\s]*$/);
  const isEnglish = reg.test(query);
  loading.value = true;
  getYouDaoAiTranslate({ query, from: isEnglish ? "en" : "zh-CHS", to: isEnglish ? "zh-CHS" : "en" }).then((data) => {
    let { translation, speakUrl, tSpeakUrl, dict, tDict } = data || {};
    question.value = query;
    response.value = translation;
    // dictUrl.value = mTerminalDict?.url;
    // queSpeakUrl.value = speakUrl;
    resSpeakUrl.value = tSpeakUrl;
    loading.value = false;
  })
  // getYouDaoAiDict({ query: question.value, langType: isEnglish ? "en" : "zh-CHS" }).then((data) => {
  // })
}
const playAudio = (isQue) => {
  let audioPlayer = null;
  if (isQue) {
    audioPlayer = document.getElementById('questionAudioPlayer');
  } else {
    audioPlayer = document.getElementById('responseAudioPlayer');
  }
  if (audioPlayer.paused) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
}
onMounted(() => {
  getDailyEnglish().then((data) => {
    dailyNote.value = data;
  })
})
</script>


<style lang='scss' scoped></style>