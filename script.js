function Library() {
    this.books = []
}

Library.prototype.addBook = function(newBook) {
    this.books.push(newBook)
}

Library.prototype.isInLibrary = function(newBook) {
    return this.books.some((book) => book.title === newBook.title)
}

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

Book.prototype.getReadString = () => this.isRead ? 'read' : 'not read yet'

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.getReadString}`
}

const library = new Library()

const books = library.books
const bookshelf = document.getElementById('bookshelf')
const addBookBtn = document.getElementById('addBookBtn')
const addBookModal = document.getElementById('addBookModal')
const addBookForm = document.getElementById('addBookForm')
const errorMsg = document.getElementById('errorMsg')
const overlay = document.getElementById('overlay')

function addBookToLibrary(title, author, pages, isRead) {
    let newBook = new Book(title, author, pages, isRead)
    library.addBook(newBook)
}

function display() {
    resetLibraryTable()
    for (let i = 0; i < books.length; i++) {
        let row = bookshelf.appendChild(document.createElement('tr'))
        let titleCell = document.createElement('td')
        titleCell.textContent = books[i].title
        row.appendChild(titleCell)
        let authorCell = document.createElement('td')
        authorCell.textContent = books[i].author
        row.appendChild(authorCell)
        let pagesCell = document.createElement('td')
        pagesCell.textContent = books[i].pages
        row.appendChild(pagesCell)
        let readCell = document.createElement('td')
        readCell.textContent = books[i].getReadString()
        row.appendChild(readCell)
        bookshelf.appendChild(row)
    }
}


const resetLibraryTable = () => {
    bookshelf.innerHTML = ''
}

const openAddBookModal = () => {
    addBookModal.classList.add('active')
    overlay.classList.add('active')
}

const closeAddBookModal = () => {
    addBookModal.classList.remove('active')
    overlay.classList.remove('active')
    errorMsg.classList.remove('active')
    errorMsg.textContent = ''
}

const closeAllModals = () => {
    closeAddBookModal()
    // closeAccountModal()
}

const getBookFromInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').checked
    return new Book(title, author, pages, isRead)
}

const addBook = (e) => {
    e.preventDefault()
    const newBook = getBookFromInput()

    if (library.isInLibrary(newBook)) {
        errorMsg.textContent = 'This book already exists in your library'
        errorMsg.classList.add('active')
        return
      } else {
        library.addBook(newBook)
        display()
        closeAddBookModal()
      }
}

addBookBtn.onclick = openAddBookModal
overlay.onclick = closeAllModals
addBookForm.onsubmit = addBook

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295)
addBookToLibrary('Around the World in Eighty Days', 'Jules Verne', 200)
addBookToLibrary('The Watchmen', 'Alan Moore', 150)

display()

