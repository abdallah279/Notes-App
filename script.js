const addBtn = document.querySelector(".add"),
popupApp = document.querySelector(".popup-app"),
popupHeader = document.querySelector(".popup .header h4"),
close = document.querySelector(".close"),
input = document.querySelector("input"),
textarea = document.querySelector("textarea"),
formBtn = document.querySelector(".btn"),
firstDiv = document.querySelector(".add");

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

let notes = [],
idEdit,
isEdit = false;

// Check if Theres Tasks In Local Storage
if(window.localStorage.getItem("notes")){
    notes = JSON.parse(window.localStorage.getItem("notes"));
}

// Trigger Get Data From Local Storage Function
getItemFromLocal();

// handle show popup
addBtn.addEventListener("click", ()=>{
    popupApp.classList.add("open");
    formBtn.innerHTML = "Add";
    popupHeader.innerHTML = "Add New Note";
    input.value = '';
    textarea.value = '';
    input.focus();
});

// handle close popup
close.addEventListener("click", ()=>{
    popupApp.classList.remove("open");
});

// handle add Note
formBtn.addEventListener("click", addNewEle);

function addNewEle(e){
    e.preventDefault();
    let title = input.value.trim(),
    desc = textarea.value.trim();

    if(title && desc){
        let date = new Date();
        let day = date.getDate();
        let mon = date.getMonth();
        let year = date.getFullYear();

        let noteInfo = {
            title,
            desc,
            noteDate : `${months[mon]}, ${day}, ${year}`
        };

        if(isEdit){
            notes[idEdit] = noteInfo;
            isEdit = false;
        } else{
            notes.push(noteInfo);
        }
        showNote(notes);
        addNoteToLocal(notes);
        close.click();
    }
}


function showNote(notes){
    document.querySelectorAll(".card").forEach((card) => card.remove());
    // Looping On Array Of Notes
    notes.forEach((note, idx)=>{
        let card = `
        <div class="card card-style">
            <div class="card_content">
                <h4>${note.title}</h4>
                <p>${note.desc}</p>
            </div>
            <div class="card_details">
                <span class="date">${note.noteDate}</span>
                <div class="menu-app">
                    <i onclick="showMenu(this)" class="bx bx-dots-horizontal-rounded"></i>
                    <ul class="menu">
                        <li onclick="editNote(${idx},'${note.title}','${note.desc}')"><i class="bx bx-edit-alt"></i>Edit</li>
                        <li onclick="deleteNote(${idx})"><i class="bx bx-trash-alt"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    firstDiv.insertAdjacentHTML("afterend", card);
    });
}

function addNoteToLocal(array){
    localStorage.setItem("notes", JSON.stringify(array));
}

function getItemFromLocal(){
    let data = localStorage.getItem("notes");
    if(data){
        notes = JSON.parse(data);
        showNote(notes);
    }
}

function showMenu(el){
    el.parentElement.classList.add("show");
    document.addEventListener("click", (e)=>{
        if(e.target.tagName != "I" || e.target != el){
            el.parentElement.classList.remove("show");
        }
    })
}

function deleteNote(index){
    let confirmD = confirm("Are you sure you want to delete this note?");
    if(!confirmD) return;
    notes.splice(index, 1);
    addNoteToLocal(notes);
    showNote(notes);
}

function editNote(index, title, desc){
    isEdit = true;
    idEdit = index;
    addBtn.click();
    input.value = title;
    textarea.value = desc;
    formBtn.innerHTML = "Update";
    popupHeader.innerHTML = "Update A Note";
}