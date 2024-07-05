import Anchor from './anchor';
interface Book {
    id: string
    title?: string,
    author?: string,
    description?: string,
    image?: string,
    content: string,
    anchors?: Array<Anchor>
    category?: string,
    type?: string,
    appId?: string
}
export default Book;