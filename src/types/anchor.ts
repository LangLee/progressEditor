interface Anchor {
    dom?: HTMLElement // the HTML element for this anchor
    editor?: any // the editor
    id: string // the node id
    isActive?: boolean // whether this anchor is currently active
    isScrolledOver?: boolean // whether this anchor was already scrolled over
    itemIndex: number // the index of the item on it's current level
    level: number // the current level of the item - this could be different from the actual anchor level and is used to render the hierarchy from high to low headlines
    node?: Node // the ProseMirror node for this anchor
    originalLevel: number // the actual level
    pos: number // the position of the anchor node
    textContent: string // the text content of the anchor
}
export default Anchor;