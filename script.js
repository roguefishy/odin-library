const library = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.info = function () {
    console.log(this.title, " written by ", this.author, " in ", this.pages, " pages. Read? ", this.read)
}

function addBookToLibrary(title, author, pages, read) {
    library.push(new Book(title, author, pages, read));
}

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Atomic Habits", "James Clear", 320, false);
console.log(library);

for (const book of library) {
    console.log(book.info());
}