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
  const table = document.querySelector("table");

  const tableRow = document.createElement("tr");
  tableRow.classList.add("row-data");

  const tData = document.createElement("td");
  tData.classList.add("tData");

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("trMainDiv");

  const dataInfo = document.createElement("div");
  dataInfo.classList.add("data");

  const removeDiv = document.createElement("div");
  removeDiv.classList.add("removeDiv");
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-button");

  const readDiv = document.createElement("div");
  readDiv.classList.add("readDiv");
  const readButton = document.createElement("button");
  readButton.classList.add("read-button");
  readButton.textContent = "Completed";

  const coverDiv = document.createElement("div");
  coverDiv.classList.add("cover");

  const img = document.createElement("img");
  img.src = "images/bg" + Math.floor(Math.random() * 9 + 1) + ".jpeg";

  const existingBook = myLibrary.find(
    (book) =>
      book.title.toLowerCase() === title.toLowerCase() &&
      book.author.toLowerCase() === author.toLowerCase() &&
      book.pages === pages
  );

  if (existingBook) {
    alert("Book already exists");
    return;
  }

  const book = new Book(title, author, pages, read);
  myLibrary.push(book);

  tBody.appendChild(tableRow);
  tableRow.setAttribute("data-i", myLibrary.indexOf(book));

  tableRow.appendChild(tData);
  tData.appendChild(mainDiv);
  mainDiv.append(coverDiv, dataInfo, readDiv, removeDiv);
  readDiv.appendChild(readButton);
  removeDiv.appendChild(removeButton);
  coverDiv.appendChild(img);
  dataInfo.textContent = book.info();

  removeButton.addEventListener("click", () => {
    const iData = parseInt(
      removeButton.parentNode.parentNode.parentNode.parentNode.dataset.i
    );
    myLibrary.splice(iData, 1);
    removeButton.parentNode.parentNode.parentNode.parentNode.remove();
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
    const readText =
      readButton.parentNode.parentNode.parentNode.parentNode.dataset.i;
    document.querySelectorAll(".row-data").forEach((row) => {
      if (
        row.firstChild.firstChild.firstChild.nextSibling.textContent ===
        myLibrary[readText].info()
      ) {
        myLibrary[readText].read = "Completed";
        const completed = new Book(
          myLibrary[readText].title,
          myLibrary[readText].author,
          myLibrary[readText].pages,
          myLibrary[readText].read
        );
        myLibrary[readText] = completed;
        row.firstChild.firstChild.firstChild.nextSibling.textContent =
          myLibrary[readText].info();
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
  document.querySelector("form").reset();
}
