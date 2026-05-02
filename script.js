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
    console.log(this.title, " written by ", this.author, " in ", this.pages, " pages. Read? ", this.read);
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
    const bookCover = document.createElement("article");
    bookCover.className = "card";
    const bookInfo = book.info();
    bookCover.innerHTML = `          
            <div class="title">${book.title}</div>
            <div class="book-info">${book.author}</div>
            <div class="book-info">${book.pages} pages</div>
            <div class="book-info">${book.read}</div>
            <hr>
            <div class="book-info"><button class="removebutton">remove book</button></div>`;
    const stack = document.getElementById("stack");
    stack.appendChild(bookCover);
}
const cards = [...document.querySelectorAll(".card")];
let active = 2;

function render() {
    cards.forEach((card, index) => {
        const offset = index - active;
        const abs = Math.abs(offset);

        let x = offset * 105;
        let scale = offset === 0 ? 1 : 0.96;
        let opacity = abs > 3 ? 0 : 1;
        let z = 100 - abs;
        let rotate = offset * -2;

        card.style.zIndex = z;
        card.style.opacity = opacity;
        card.style.filter = offset === 0 ? "none" : "brightness(0.98)";
        card.style.transform = `
      translate(-50%, -50%)
      translateX(${x}px)
      scale(${scale})
      rotate(${rotate}deg)
    `;
    });
}

function move(direction) {
    active = (active + direction + cards.length) % cards.length;
    render();
}

render();
