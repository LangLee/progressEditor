<template>
  <div
    class="absolute z-20 top-0 lg:top-0 inset-x-0 flex justify-center lg:justify-end overflow-hidden pointer-events-none bg-slate-300">
    <div class="w-[80rem] lg:w-[100rem] flex-none flex justify-end">
      <!-- <picture>
        <source srcset="./assets/bg-01.avif" type="image/avif">
        <img src="./assets/bg-01.avif" alt="" class="w-[70rem] flex-none max-w-none dark:hidden" decoding="async">
      </picture> -->
    </div>
  </div>
  <router-view></router-view>
</template>
<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import initialize from './api/globalConfig'
import modal from '@/components/feedback/modal'
import { isChanged, change } from '@/common/status'
const router = useRouter();
const route = useRoute();
router.beforeEach((to, from, next) => {
  let reg = new RegExp(/^\/(books|book)/);
  if (reg.test(from.path)) {
    if (isChanged()) {
      modal.confirm({
        title: '提示',
        content: '您有未保存的修改，确定离开吗？',
        onOk: () => {
          change(false);
          next();
        },
        onCancel: () => {
          next(false);
        }
      })
    } else {
      next();
    }
  } else {
    next();
  }
})
onBeforeMount(() => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  initialize(route, () => {
    localStorage.removeItem("me_token")
    router.replace('/login')
  });
})
</script>


<style lang='scss'>
/* 去掉code的引号 */
.prose :where(code):not(:where([class~="not-prose"], [class~="not-prose"] *))::before {
  content: '';
}

.prose :where(code):not(:where([class~="not-prose"], [class~="not-prose"] *))::after {
  content: '';
}

/* 去掉quote的引号 */
.prose :where(blockquote p:first-of-type):not(:where([class~="not-prose"], [class~="not-prose"] *))::before {
  content: '';
}

.prose :where(blockquote p:last-of-type):not(:where([class~="not-prose"], [class~="not-prose"] *))::after {
  content: '';
}

.prose :where(code):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  font-weight: normal;
}

.tiptap {
  :first-child {
    margin-top: 0;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    padding: 0.25em;
    border-radius: 0.25em;
    background-color: rgba(#616161, 0.1);
    color: #616161;
    box-decoration-break: clone;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }

    .hljs-comment,
    .hljs-quote {
      color: #787878;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #F98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #FBBC88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #B9F18D;
    }

    .hljs-title,
    .hljs-section {
      color: #FAF594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70CFF8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  /* Table-specific styling */
  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;

    td,
    th {
      border: 1px solid #ced4da;
      box-sizing: border-box;
      min-width: 1em;
      padding: 6px 8px;
      position: relative;
      vertical-align: top;

      >* {
        margin-bottom: 0;
      }
    }

    th {
      background-color: #f1f3f5;
      font-weight: bold;
      text-align: left;
    }

    .selectedCell:after {
      background: rgba(200, 200, 255, 0.4);
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }

    .column-resize-handle {
      background-color: #adf;
      bottom: -2px;
      pointer-events: none;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }
  }

  .tableWrapper {
    margin: 1.5rem 0;
    overflow-x: auto;
  }

  .resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }

  // task css 
  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    p {
      margin: 0;
    }

    li {
      display: flex;

      >label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      >div {
        flex: 1 1 auto;
      }

      ul li,
      ol li {
        display: list-item;
      }

      ul[data-type="taskList"]>li {
        display: flex;
      }
    }
  }

  /* Link styles */
  a {
    color: var(--purple);
    cursor: pointer;

    &:hover {
      color: var(--purple-contrast);
    }
  }
}
</style>