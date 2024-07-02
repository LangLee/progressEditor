import { getTongYiAiChart, getQianFanAiChart, getMoonshotAiChart } from "@/api/ai";
const LLM_API_MAP = {
    'TongYiQianWen': getTongYiAiChart,
    'QianFan': getQianFanAiChart,
    'Moonshot': getMoonshotAiChart
}

const LLM_SELECT_OPTIONS = [
    {value: 'TongYiQianWen', label: '通义千问'},
    {value: 'QianFan', label: '文心一言'},
    {value: 'Moonshot', label: '月之暗面'}
]

export {
    LLM_API_MAP,
    LLM_SELECT_OPTIONS
}