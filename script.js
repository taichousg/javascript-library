/* All of your book objects are going to be stored in an array, so you’ll need a constructor for books.
Then, add a separate function to the script (not inside the constructor) that can take some arguments,
create a book from those arguments, and store the new book object into an array.

Write a function that loops through the array and displays each book on the page.
You can display them in some sort of table, or each on their own “card”.
It might help for now to manually add a few books to your array so you can see the display.

Add a “New Book” button that brings up a form allowing users to input the details for the new book and
 add it to the library: author, title, number of pages, whether it’s been read and anything else you might want.
Options: form show in a side bar or explore dialogs and modals using <dialog> tag (add event.preventDefault();)

Add a button on each book’s display to remove the book from the library
You will need to associate your DOM elements with the actual book objects in some way.
One easy solution is giving them a data-attribute that corresponds to the unique id of the respective book object.

Add a button on each book’s display to change its read status.
To facilitate this you will want to create Book prototype function that toggles a book instance’s read status.

*/

let childCounter = 0;
const myLibrary = [];

// Book Prototype
const bookObject = {
    id: String,
    author: String,
    title: String,
    pages: Number,
    read: Boolean
};

/* const bookStatus = {
    not_started: "not-started",
    reading: "reading",
    finished: "finished",
    abandoned: "abandoned",
}; */

// Book constructor
function Book(author, title, pages, read) {
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(formData) {
  // Step 1: Get the parent element
  const parentDiv = document.getElementById('parentContainer');
  // Step 2: Create Book Card
  //const bookData = new Book("Author","Title1",100,true);
  const bookData = new Book(formData.author, formData.title, formData.pages, formData.read);
  // Step 3: Add new book card to Library array
  myLibrary.push(bookData);
  // Step 4: Create new child element
  const childDiv = document.createElement('div');
  // Step 5: Add content and styling of div element
  childDiv.className = 'child-div';
  childDiv.setAttribute('data-id', bookData.id);
  childDiv.innerHTML = `
      <strong>Book Title: ${bookData.title}</strong>
      <p>by ${bookData.author}</p>
      <p>Pages: ${bookData.pages}</p>
      <p>Read: ${bookData.read}</p>
      <button class="remove-btn" id="remove-btn" onclick="removeDivChild(this)">Remove Book</button>
      <button class="toggleread-btn" id="toggleread-btn" onclick="toggleReadStatus(this)">Change Read Status</button>
  `;
  // Step 6: Update book counter
  childCounter++;
  // Step 7: Update counter display
  updateChildCount(childCounter);
  // Step 8: Append to parent
  parentDiv.appendChild(childDiv);
}

// Function to change the "read" status of the book
function toggleReadStatus(button) {
  const newReadStatus = false;
  // Step 1: Get the parent div of the button (the child div)
  const childDiv = button.parentNode;
  // Step 2: Get and update the value of the "read" parameter
  if (childDiv.read == false){
    newReadStatus = true;
  }
  updateReadStatus(newReadStatus, button);
}

// Function to update the child count display
function updateReadStatus(newReadStatus, button) {
  const childDiv = button.parentNode;
  childDiv.read = newReadStatus;
}

// Function to remove each book
function removeDivChild(button) {
  // Step 1: Get the parent div of the button (the child div)
  const childDiv = button.parentNode;
  // Step 2: Get the parent div of the child div (the parent container)
  const parentDiv = childDiv.parentNode;
  // Step 3: Remove the child div from the parent container
  parentDiv.removeChild(childDiv);
  // Update counter
  childCounter--;
  updateChildCount(childCounter);
}

// Function to clear all books
function clearAllChildren() {
  // Step 1: Get the parent container
  const parentDiv = document.getElementById('parentContainer');
  // Step 2: Get all child divs
  const childDivs = parentDiv.querySelectorAll('.child-div');
  // Step 3: Remove each one
  childDivs.forEach(child => child.remove());
  // Step 4: Reset counter
  childCounter = 0;
  // Step 5: Update counter
  updateChildCount(childCounter);
}

// Function to update the child count display
function updateChildCount(childCounter) {
  //document.getElementById('childCount').textContent = childCounter;
}

// Sidebar functions
function openSidebar() {
    document.getElementById('bookSidebar').classList.add('open');
    document.getElementById('sidebarOverlay').classList.add('show');
}

function closeSidebar() {
    document.getElementById('bookSidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('show');
    // Clear form
    document.getElementById('bookForm').reset();
}

// Form submission handler
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent page reload
    
    const formData = new FormData(event.target);
    const bookData = {
        title: formData.get('title'),
        author: formData.get('author'),
        pages: formData.get('pages'),
        read: formData.get('isRead')
    };
    
    // Create book from form data
    addBookToLibrary(bookData);
    
    // Close sidebar
    closeSidebar();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('addBookBtn').addEventListener('click', openSidebar);
  document.getElementById('clearAllBtn').addEventListener('click', clearAllChildren);
  // Sidebar event listeners
  document.getElementById('closeSidebar').addEventListener('click', closeSidebar);
  document.getElementById('cancelBtn').addEventListener('click', closeSidebar);
  document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);
  document.getElementById('bookForm').addEventListener('submit', handleFormSubmit);
});