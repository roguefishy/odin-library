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

const bookForm = document.getElementById('addBook-form');

bookForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stops the page from refreshing

    const form = new FormData(e.target);

    // Get a specific field by its "name" attribute
    addBookToLibrary(form.get('title'), form.get('author'), form.get('pages'), form.get('readStatus'));

    const myDialog = document.getElementById('my-dialog');
    myDialog.close();
    render();
    e.target.reset(); 23

});


addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, "read");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "not yet read");
addBookToLibrary("Atomic Habits", "James Clear", 320, "not yet read");
console.log(library);

// this part is the script that display the books in library
let active = 2;

function render() {
    const stack = document.getElementById("stack");
    stack.innerHTML = "";

    for (const book of library) {
        const bookCover = document.createElement("article");
        bookCover.className = "card";
        const bookInfo = book.info();
        bookCover.innerHTML = `          
            <div class="title">${book.title}</div>
            <div class="book-info">${book.author}</div>
            <div class="book-info">${book.pages} pages</div>
            <div class="book-info"><button id="${book.id}toggleRead">${book.read}</button></div>
            <hr>
            <div class="book-info"><button class="removebutton" id="${book.id}RemoveBook">remove book</button></div>`;
        stack.appendChild(bookCover);
        const removeBookButton = document.getElementById(`${book.id}RemoveBook`);
        const index = library.findIndex(item => item.id === `${book.id}`);

        removeBookButton.addEventListener('click', function (e) {
            if (index > -1) {
                library.splice(index, 1);
                render();
            }
        });
        const toggleRead = document.getElementById(`${book.id}toggleRead`);
        toggleRead.addEventListener('click', function (e) {

            if (index > -1) {
                library[index].read = (library[index].read === "not yet read") ? "read" : "not yet read";

                render();
            }
        });

    }
    const cards = [...document.querySelectorAll(".card")];
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
    const cards = [...document.querySelectorAll(".card")];
    active = (active + direction + cards.length) % cards.length;
    render();
}

render();