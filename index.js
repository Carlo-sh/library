const dialog = document.querySelector('dialog');
const newButton = document.getElementById('new-btn');
const addButton = document.querySelector('#add-btn');
const library = document.querySelector('.library-container');
//
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');

const myLibrary = [];

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		this.info = function () {
			return `${this.title} by ${this.author}, ${this.pages} pages, ${
				this.read ? 'already read' : 'not read yet'
			}`;
		};
	}
}

function createNewCard(idx = myLibrary.length - 1) {
	const card = document.createElement('div');
	card.classList.add('card');
	card.setAttribute('id', `${idx}`);

	const heading = document.createElement('h2');
	const bookTitle = document.createElement('p');
	const bookAuthor = document.createElement('p');
	const bookPages = document.createElement('p');
	const bookRead = document.createElement('button');
	const bookRemove = document.createElement('button');

	heading.textContent = 'New Book';
	bookTitle.textContent = `Title: ${myLibrary[idx].title}`;
	bookAuthor.textContent = `Author: ${myLibrary[idx].author}`;
	bookPages.textContent = `Pages: ${myLibrary[idx].pages}`;
	bookRemove.textContent = 'Remove';

	if (read.checked) {
		myLibrary[idx].read = false;
	} else {
		myLibrary[idx].read = true;
	}

	if (myLibrary[idx].read) {
		bookRead.classList.add('book-read');
		bookRead.textContent = 'Read!';
	} else {
		bookRead.classList.add('not-read');
		bookRead.textContent = 'Not Read';
	}

	bookRead.addEventListener('click', () => {
		if (bookRead.classList.contains('book-read')) {
			bookRead.classList.remove('book-read');
			bookRead.classList.add('not-read');
			bookRead.textContent = 'Not Read';
			myLibrary[idx].read = false;
		} else {
			bookRead.classList.add('book-read');
			bookRead.classList.remove('not-read');
			bookRead.textContent = 'Read!';
			myLibrary[idx].read = true;
		}
	});

	bookRemove.classList.add('remove-book');
	bookRemove.addEventListener('click', () => {
		removeFunc(idx);
	});
	card.append(heading, bookTitle, bookAuthor, bookPages, bookRead, bookRemove);
	library.appendChild(card);
}

newButton.addEventListener('click', () => {
	dialog.showModal();
});

addButton.addEventListener('click', () => {
	let book = new Book(title.value, author.value, pages.value, true);
	myLibrary.push(book);
	createNewCard(myLibrary.length - 1);
	dialog.close();
});

function removeFunc(n) {
	let elem = document.getElementById(`${n}`);
	let books = Array.from(document.querySelectorAll('.card'));
	let x = 0;
	if (elem.parentNode) {
		x = books.indexOf(elem);
		elem.parentNode.removeChild(elem);
	}
	myLibrary.splice(x, 1);
}
