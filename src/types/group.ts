import Book from "./book";

interface Group {
  id?: string,
  name?: string,
  description?: string,
  createTime?: string,
  books?: Book[],
  readonly?: boolean,
  appId?: string
}

export default Group