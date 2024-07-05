interface Word {
    _id: string
    code?: string,
    english?: string,
    chinese?: string,
    createBy?: string,
    createTime?: string,
    newWord?: boolean,
    dailyWord?: boolean
}
export default Word;