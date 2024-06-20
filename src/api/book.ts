import axios from "axios";
import Book from "@/types/book"
const getBooks = (params: Object) => {
    return axios.get("/books/getBooks", {params}).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const getBookById = (id: String) => {
    return axios.get("/books/getBookById", { params: { id } }).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const createBook = (params: Book) => {
    return axios.post("/books/createBook", params).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const updateBook = (params: Book) => {
    return axios.post("/books/updateBook", params).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const updateBookTitle = (params: Book) => {
    return axios.post("/books/updateBookTitle", params).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const removeBook = (id: string) => {
    return axios.post("/books/removeBook", { id }).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const searchBook = (key: string) => {
    return axios.get("/books/searchBook", { params: {key} }).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
export {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    removeBook,
    updateBookTitle,
    searchBook
}