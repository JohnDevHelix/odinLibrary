const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return title + " by " + author + ", " + pages + " pages, " + read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book.info());

  const tableRow = document.createElement("tr");
  const dataInfo = document.createElement("td");
  const table = document.querySelector("table");
  const removeTable = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  const readTable = document.createElement("td");
  const readButton = document.createElement("button");
  readButton.textContent = "Read";


  table.appendChild(tableRow);  

  for (let i = 0; i < myLibrary.length; i++) {
    dataInfo.textContent = myLibrary[i];

    tableRow.appendChild(dataInfo);


    tableRow.appendChild(readTable);
    readTable.appendChild(readButton);
    tableRow.appendChild(removeTable);
    removeTable.appendChild(removeButton);
    
  }
}

const openDialog = document.querySelector("#open");
const closeDialog = document.querySelector("#close");
const dialog = document.querySelector("dialog");

openDialog.addEventListener("click", () => { dialog.showModal(); });
closeDialog.addEventListener("click", () => { dialog.close(); });

const submit = document.querySelector("#book-form");

const newTitle = document.querySelector("#new-title");
const newAuthor = document.querySelector("#new-author");
const newPage = document.querySelector("#new-pages");
const notRead = document.querySelector("#not-read");
const yesRead = document.querySelector("#read");
const notReadCheck = document.querySelector("input[name='status']");
const tableData = document.querySelector("td");
  const statusHeading = document.createElement("th");
  
  const removeHeading = document.createElement("th");
  const headings = document.querySelector(".headings");
  const heading = document.querySelector("#book-heading");

submit.addEventListener("submit", submitClick, false);



function submitClick(event) {
    event.preventDefault();

   if (statusHeading.textContent === "") {
    heading.textContent = "Book Info";
    headings.appendChild(statusHeading);
    headings.appendChild(removeHeading);
    statusHeading.textContent = "Status";
    removeHeading.textContent = "Remove from Library";

    } 
    
  if (notReadCheck.checked === true) {
    addBookToLibrary(newTitle.value, newAuthor.value, newPage.value, notRead.value);
    } else {
    addBookToLibrary(newTitle.value, newAuthor.value, newPage.value, yesRead.value);
    }
  }



  

