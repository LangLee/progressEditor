let _changed = false;
const change = (changed)=> {
    _changed = changed
}
const isChanged = ()=> _changed

export { change, isChanged }