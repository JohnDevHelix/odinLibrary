const myLibrary = [];

const submit = document.querySelector("#book-form");
const newTitle = document.querySelector("#new-title");
const newAuthor = document.querySelector("#new-author");
const newPage = document.querySelector("#new-pages");
const notRead = document.querySelector("#not-read");
const yesRead = document.querySelector("#read");
const notReadCheck = document.querySelector("input[name='status']");
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
  const dataInfo = document.createElement("td");
  dataInfo.classList.add("data");
  const table = document.querySelector("table");
  const removeTable = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-button");
  const readTable = document.createElement("td");
  const readButton = document.createElement("button");
  readButton.classList.add("read-button");
  readButton.textContent = "Done";

  removeButton.addEventListener("click", () => {
    const iData = parseInt(
      removeButton.parentNode.parentNode.parentNode.dataset.i
    );
    const buttonTable =
      removeButton.parentNode.parentNode.parentNode.parentNode;
    console.log(iData);
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

  readButton.addEventListener("click", () => {});

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

  if (notReadCheck.checked === true) {
    addBookToLibrary(
      newTitle.value,
      newAuthor.value,
      newPage.value,
      notRead.value
    );
  } else {
    addBookToLibrary(
      newTitle.value,
      newAuthor.value,
      newPage.value,
      yesRead.value
    );
  }
}
