var books = {};

$(document).ready(function () {
    $('#modal-add-book-ok').on('click', addBookToLibrary);
    var saveBook = localStorage.getItem('library');
    if (saveBook) {
        books = JSON.parse(saveBook);
        console.log(books);
        for (var key in books) {
            drawBook(key);
        }
    }
});

/*Ф-ия добавления книги в массив*/
function addBookToLibrary() {
    var formData = $('form').serializeArray();
    console.log(formData);
    var bookArray = {};
    for (var key in formData) {
        bookArray[formData[key]['name']] = formData[key]['value'];
    }
    console.log(bookArray);
    var data = $(this).attr('data');
    if (data === undefined) {
        var randomArticul = Math.round(Math.random() * 100000);
        books[randomArticul] = bookArray;
        console.log(books);
        drawBook(randomArticul);
    } else {
        books[data] = bookArray;
        drawBook(data);
    }

    $('#modal-add-book').modal('hide');

    localStorage.setItem('library', JSON.stringify(books));

}

/*Ф-ия отрисовки внесенной книги на странице*/
function drawBook(articul) {
    var book = $('.book[data=' + articul + ']');
    if (book.length == 0) {
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

        var buttonEdit = document.createElement('button');
        buttonEdit.className = 'btn btn-success edit';
        buttonEdit.textContent = 'Edit';
        buttonEdit.setAttribute('data', articul);
        buttonEdit.addEventListener('click', editBook);

        var buttonDelete = document.createElement('button');
        buttonDelete.className = 'btn btn-warning delete';
        buttonDelete.textContent = 'Delete';
        buttonDelete.setAttribute('data', articul);
        buttonDelete.addEventListener('click', deleteBook);

        div.appendChild(cover);
        div.appendChild(bookName);
        div.appendChild(bookYear);
        div.appendChild(buttonEdit);
        div.appendChild(buttonDelete);

        $('.book-panel').append(div);
    } else {
        var bookCover = book.find('.book-cover');
        bookCover.css({'background-image':'url('+books[articul]['book-cover']+')'});
        var bookYear = book.find('.book-year').eq(0);
        bookYear.html(books[articul]['book-year']);
        var bookName = book.find('.book-title').eq(0);
        bookName.html(books[articul]['book-name']);
        var bookAutor = book.find('.book-autor').eq(0);
        bookAutor.html(books[articul]['book-autor']);

        $('#modal-add-book-ok').removeAttr('data');
    }

}

function editBook() {
    var data = $(this).attr('data');
    console.log(data);
    //show modal
    $('#modal-add-book').modal('show');
    $('form #book-name').val(books[data]['book-name']);
    $('form #book-autor').val(books[data]['book-autor']);
    $('form #book-cover').val(books[data]['book-cover']);
    $('form #book-year').val(books[data]['book-year']);
    $('#modal-add-book-ok').attr('data', data);
}

function deleteBook() {
    $(this).parent('.book').remove();
    var data = $(this).attr('data');
    delete books[data];
    console.log(books)
}