<template>
  <div class="flex flex-col h-screen w-full justify-center items-center text-slate-700">
    <Header></Header>
    <div class="flex-1 w-full p-2 lg:p-4">
      <!-- {{ response }} -->
      <!-- <iframe v-if="dictUrl" :src="dictUrl" frameborder="0" width="100%" height="100%"></iframe> -->
      <div v-if="dailyNote" class="rounded-lg shadow-lg p-4 lg:p-8 mb-4 lg:mb-8">
        <div class="font-bold text-normal lg:text-lg py-2"><span class="bg-blue-600 text-slate-50 rounded-xl px-2 py-1">每日一句</span></div>
        <div class="text-normal lg:text-lg p-2">{{ dailyNote.chinese || '' }}</div>
        <div class="text-normal lg:text-lg p-2">{{ dailyNote.english || '' }}</div>
      </div>
      <div v-if="question" class="rounded shadow-lg p-4 lg:p-8 mb-4 lg:mb-8">
        <div class="font-bold text-lg lg:text-xl text-blue-700 py-1">{{ question }}</div>
        <span class="text-lg text-slate-300">
          <!-- <RemixIcon class="mr-2 hover:text-blue-400" name="volume-up-line" @click="playAudio(true)" /> -->
          <RemixIcon class="hover:text-blue-400" name="clipboard-line" @click.stop="copyText(question)" />
        </span>
        <!-- <audio v-show="false" controls id="questionAudioPlayer">
          <source :src="queSpeakUrl" type="audio/mpeg">
        </audio> -->
      </div>
      <div v-if="response" class="rounded shadow-lg p-4 lg:p-8 mb-4 lg:mb-8">
        <div class="font-bold text-lg lg:text-xl text-blue-700">{{ response }}</div>
        <span class="text-lg text-slate-300">
          <RemixIcon class="mr-2 hover:text-blue-400" name="volume-up-line" @click="playAudio(false)" />
          <RemixIcon class="mr-2 hover:text-blue-400" name="clipboard-line" @click.stop="copyText()" />
          <RemixIcon class="hover:text-blue-400" name="add-line" @click.stop="addText()"/>
        </span>
        <audio id="responseAudioPlayer" :src="resSpeakUrl"></audio> 
        <!-- <audio v-show="false" controls id="responseAudioPlayer">
          <source :src="resSpeakUrl" type="audio/mpeg">
        </audio> -->
      </div>
    </div>
    <div class="relative h-24 lg:h-28 w-full text-lg px-2 lg:px-4 mb-4 lg:mb-8">
      <textarea ref="questionInput" :rows="3"
        class="w-full border rounded-lg shadow-sm py-2 lg:py-4 pl-4 pr-20 text-slate-600 placeholder-slate-300 font-normal text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        v-model="question" type="text" placeholder="开始对话" @keyup.enter.stop="onTranslate" />
      <button class="absolute top-2 lg:top-4 right-4 lg:right-8 w-16 text-blue-300 hover:text-blue-600"
        @click="onTranslate">
        <span class="mr-1">发送</span>
        <RemixIcon name="send-plane-fill"></RemixIcon>
      </button>
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
const fallbackCopyTextToClipboard = (text) => {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? '成功拷贝!' : '拷贝失败!';
    console.log(msg);
  } catch (err) {
    console.error('拷贝到剪贴板失败:', err);
  }
  document.body.removeChild(textArea);
}
const question = ref('');
const queSpeakUrl = ref('');
const resSpeakUrl = ref('');
const response = ref('');
const loading = ref(false);
const dictUrl = ref('');
const dailyNote = ref();
const copyText = () => {
  // 判断Clipboard API的支持情况
  if (!response.value) return;
  if (!navigator.clipboard) {
    navigator.clipboard = {
      writeText: fallbackCopyTextToClipboard
    };
  }
  navigator.clipboard.writeText(response.value);
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
const onTranslate = () => {
  if (!question.value) {
    message.warning("请输入要翻译的文本！")
  }
  question.value = question.value.replace(/[\r\n]/g, "");
  const reg = new RegExp(/^[A-Za-z\s]*$/);
  const isEnglish = reg.test(question.value);
  loading.value = true;
  getYouDaoAiTranslate({ query: question.value, from: isEnglish ? "en" : "zh-CHS", to: isEnglish ? "zh-CHS" : "en" }).then((data) => {
    let { translation, speakUrl, tSpeakUrl, dict, tDict } = data || {};
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