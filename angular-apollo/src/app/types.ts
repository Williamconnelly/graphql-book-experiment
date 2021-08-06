export type Book = {
    id: string;
    name: string;
    genre: string;
    authorId: string;
};

export type Author = {
    id: string;
    name: string;
    age: number;
    books: Book[];
}