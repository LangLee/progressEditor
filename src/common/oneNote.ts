import {ref} from 'vue';
import { getOneNote as getOneNoteApi } from '@/api/note.ts' 
const _oneNote = ref();
const setOneNote = (note)=>{
    _oneNote.value = note;
}
const getOneNote = ()=>{
    return _oneNote.value;
}
const useOneNote = ()=>{
    if (!_oneNote || !_oneNote.value) {
        getOneNoteApi().then(note=>{
            setOneNote(note || {});
        })
    };
    return _oneNote;
}
export {
    setOneNote,
    getOneNote,
    useOneNote
}