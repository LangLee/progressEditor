import Anchor from './anchor';
interface Book {
    _id?: string;
    id?: string
    title?: string,
    author?: string,
    description?: string,
    image?: string,
    content: string,
    anchors?: Array<Anchor>
    category?: string,
    type?: string,
    appId?: string,
    editable?: boolean,
    share?: boolean
}
export default Book;