// import { getTongYiAiChart, getQianFanAiChart, getMoonshotAiChart } from "@/api/ai";
// const LLM_API_MAP = {
//     'tongyi': getTongYiAiChart,
//     'qianfan': getQianFanAiChart,
//     'moonshot': getMoonshotAiChart
// }

const LLM_SELECT_OPTIONS = [
    {value: 'tongyi', label: '通义千问'},
    {value: 'qianfan', label: '文心一言'},
    {value: 'moonshot', label: '月之暗面'}
]

export {
    // LLM_API_MAP,
    LLM_SELECT_OPTIONS
}