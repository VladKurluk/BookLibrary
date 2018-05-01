var books = {};

$(document).ready(function() {
    $('#modal-add-book-ok').on('click', addBookToLibrary);
});

/*Ф-ия добавления книги в массив*/
function addBookToLibrary() {
    var formData = $('form').serializeArray();
    console.log(formData);
    var bookArray = [];
    for (var key in formData) {
        bookArray[formData[key]['name']] = formData[key]['value'];
    }
    console.log(bookArray);
    var randomArticul = Math.round(Math.random()*100000);
    books[randomArticul] = bookArray;
    console.log(books);
    $('#modal-add-book').modal('hide');
    drawBook(randomArticul);
}

/*Ф-ия отрисовки внесенной книги на странице*/
function drawBook(articul) {
    var div = document.createElement('div');
    div.className = 'col-lg-3 book';
    div.setAttribute('data', articul);

    var cover = document.createElement('div');
    cover.className = 'book-cover';
    cover.style.backgroundImage = `url(${books[articul]['book-cover']})`;

    var bookName = document.createElement('h4');
    bookName.className = 'book-title';
    bookName.textContent = books[articul]['book-name'];

    var bookYear = document.createElement('p');
    bookYear.className = 'book-year';
    bookYear.textContent = books[articul]['book-year'];

    div.appendChild(cover);
    div.appendChild(bookName);
    div.appendChild(bookYear);

    $('.book-panel').append(div);
}