import Anchor from './anchor';
interface Book {
    id: string,
    title: string,
    content: string,
    anchors: Array<Anchor>
}
export default Book;