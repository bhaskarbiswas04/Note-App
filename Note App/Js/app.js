console.log("Welcome to Note App");
showNotes();


//If user adds a note, add it to the localStorage.
const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', function (e) {

    let addText = document.getElementById('add-text');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addText.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    console.log(notesObj);

    showNotes();
});


function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerText = "Nothing to show! Use 'Add a Note' section above to add Notes.";
    }
}



//Function to delete a Note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


//Modifying the search button
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal))
        {
            element.style.display = "block";
        }else{
            element.style.display = "none"; 
        }
    })
})


/*Further Features :
    1. Add Note Title.
    2. Mark a note as Important.
    3. Seperate Notes by user.
    4. Sync and host to a web server.
*/
