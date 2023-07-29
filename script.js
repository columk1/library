function Library() {
    this.books = []
}

Library.prototype.addBook = function(newBook) {
    this.books.push(newBook)
}

Library.prototype.removeBook = function(book) {
    this.books.splice(this.books.indexOf(book), 1)
}

Library.prototype.isInLibrary = function(newBook) {
    return this.books.some((book) => book.title === newBook.title)
}

function Book(title, author, pages, isRead = false) {
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
        let authorCell = document.createElement('td')
        let pagesCell = document.createElement('td')
        let readCell = document.createElement('td')
        let removeCell = document.createElement('td')
        let isReadLabel = document.createElement('label')
        let isReadCheckbox = document.createElement('input')
        let removeBtn = document.createElement('button')
        let span = '<span class=checkbox-custom></span>'

        isReadCheckbox.type = 'checkbox'
        isReadCheckbox.classList = 'checkbox'
        isReadCheckbox.checked = books[i].isRead
        isReadCheckbox.dataset.id = i
        isReadCheckbox.onclick = toggleRead
        isReadLabel.appendChild(isReadCheckbox)
        isReadLabel.insertAdjacentHTML('beforeend', span)

        removeBtn.classList.add('btn','removeBtn')
        removeBtn.dataset.id = i
        removeBtn.onclick = removeBook
        removeBtn.innerHTML = '<img src="assets/delete.svg" alt="remove">'

        titleCell.textContent = books[i].title
        authorCell.textContent = books[i].author
        pagesCell.textContent = books[i].pages
        // readCell.textContent = books[i].getReadString()

        readCell.appendChild(isReadLabel)
        removeCell.appendChild(removeBtn)
        row.appendChild(titleCell)
        row.appendChild(authorCell)
        row.appendChild(pagesCell)
        row.appendChild(readCell)
        row.appendChild(removeCell)
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

const removeBook = (e) => {
    console.log(e)
    const index = e.currentTarget.dataset.id
    console.log(index)
    library.removeBook(books[index])
    console.log(books)
    display()
}

const toggleRead = (e) => {
    const index = e.target.dataset.id
    books[index].isRead = e.target.checked
}

const status = () => console.table(library.books)

addBookBtn.onclick = openAddBookModal
overlay.onclick = closeAllModals
addBookForm.onsubmit = addBook

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295)
addBookToLibrary('Around the World in Eighty Days', 'Jules Verne', 200)
addBookToLibrary('The Watchmen', 'Alan Moore', 150)

display()

