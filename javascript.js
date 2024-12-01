const myLibrary = [];

const submit = document.querySelector("#book-form");
const newTitle = document.querySelector("#new-title");
const newAuthor = document.querySelector("#new-author");
const newPage = document.querySelector("#new-pages");
const notRead = document.querySelector("#not-read");
const yesRead = document.querySelector("#read");
const inProgress = document.querySelector("#in-progress");
const tableData = document.querySelector("td");
const statusHeading = document.createElement("th");
const tBody = document.querySelector("#tbody");
const removeHeading = document.createElement("th");
const headings = document.querySelector(".headings");
const heading = document.querySelector("#book-heading");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return title + " by " + author + ", " + pages + " pages, " + read;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const tableRow = document.createElement("tr");
  tableRow.classList.add("row-data");
  const dataInfo = document.createElement("div");
  dataInfo.classList.add("data");
  const table = document.querySelector("table");
  const removeTable = document.createElement("div");
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-button");
  const readTable = document.createElement("div");
  const readButton = document.createElement("button");
  readButton.classList.add("read-button");
  readButton.textContent = "Done";

  const book = new Book(title, author, pages, read);
  myLibrary.push(book);

  tBody.appendChild(tableRow);
  tableRow.setAttribute("data-i", myLibrary.indexOf(book));

  for (let i = 0; i < myLibrary.length; i++) {
    dataInfo.textContent = myLibrary[i].info();
    tableRow.appendChild(dataInfo);
    dataInfo.appendChild(readTable);
    readTable.appendChild(readButton);
    dataInfo.appendChild(removeTable);
    removeTable.appendChild(removeButton);
  }

  removeButton.addEventListener("click", () => {
    const iData = parseInt(
      removeButton.parentNode.parentNode.parentNode.dataset.i
    );
    removeButton.parentNode.parentNode.parentNode.remove();
    myLibrary.splice(iData, 1);
    document.querySelectorAll(".row-data").forEach((row) => {
      for (let i = 0; i < myLibrary.length; i++) {
        if (row.firstChild.firstChild.textContent === myLibrary[i].info()) {
          row.setAttribute("data-i", [i]);
        }
      }
    });

    if (tBody.childElementCount === 0) {
      heading.innerHTML = "No Book Entry";
    }
  });

  readButton.addEventListener("click", () => {
    const readText = readButton.parentNode.parentNode.firstChild.textContent;
    document.querySelectorAll(".row-data").forEach((row) => {
      for (let i = 0; i < myLibrary.length; i++) {
        if (row.firstChild.firstChild.textContent === myLibrary[i].info()) {
          myLibrary[i].read = "completed";
          const completed = new Book(
            myLibrary[i].title,
            myLibrary[i].author,
            myLibrary[i].pages,
            myLibrary[i].read
          );
          myLibrary[i] = completed;
          row.firstChild.firstChild.textContent = myLibrary[i].info();
          readButton.disabled = "true";
        }
      }
    });
  });

  if (read === yesRead.value) {
    readButton.disabled = "true";
  }
}

const openDialog = document.querySelector("#open");
const closeDialog = document.querySelector("#close");
const dialog = document.querySelector("dialog");

openDialog.addEventListener("click", () => {
  dialog.showModal();
});
closeDialog.addEventListener("click", () => {
  dialog.close();
});

submit.addEventListener("submit", submitClick, false);

function submitClick(event) {
  event.preventDefault();

  heading.innerHTML = "Book Info";

  let result = false;

  if (myLibrary.length >= 1) {
    for (i = 0; i < myLibrary.length; i++) {
      if (
        newTitle.value.toLowerCase() === myLibrary[i].title.toLowerCase() &&
        newAuthor.value.toLowerCase() === myLibrary[i].author.toLowerCase() &&
        newPage.value === myLibrary[i].pages
      ) {
        result = true;
        alert("Book already exist");
      }
    }
  }

  if (result === false) {
    if (yesRead.checked === true) {
      addBookToLibrary(
        newTitle.value,
        newAuthor.value,
        newPage.value,
        yesRead.value
      );
    } else if (inProgress.checked === true) {
      addBookToLibrary(
        newTitle.value,
        newAuthor.value,
        newPage.value,
        inProgress.value
      );
    } else {
      addBookToLibrary(
        newTitle.value,
        newAuthor.value,
        newPage.value,
        notRead.value
      );
    }
  }

  document.querySelector("form").reset();
}
