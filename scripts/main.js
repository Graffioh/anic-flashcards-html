const newImg = document.getElementById("void1");

const frontTextArea = document.getElementById("front-textarea");
const rearTextArea = document.getElementById("rear-textarea");
const addBtn = document.getElementById("add-btn");
const ulist = document.getElementById("flashcards-list-ul");

var frontTxtStr = "";
var rearTxtStr = "";

// Add typed text into unordered list by tapping on btn
addBtn.addEventListener("click", () => {
    addTextListNode();
});

function addTextListNode() {
    frontTxtStr = frontTextArea.value;
    rearTxtStr = rearTextArea.value;
    
    // for(let i = 0; i < rearTxtStr.length; i++) {
    //     if(i % 37 === 0) {
    //         rearTxtStr.at += "\n";
    //     }
    // }
    // console.log rearTxtStr);

    // If rearTxtStr has no empty value/whitespaces
    if (rearTxtStr.trim() && frontTxtStr.trim()) {
        const paragraph = document.createElement("p");
        const ulistEntry = document.createElement("li");
        const deleteBtn = document.createElement("button");

        deleteBtn.setAttribute("class", "remove-btn-style");
        deleteBtn.innerText = "Remove";
        deleteBtn.addEventListener("click", function() {
            ulistEntry.remove()
        });

        paragraph.innerHTML = rearTxtStr.replace(/\n/g, "<br />");

        ulistEntry.appendChild(paragraph);
        ulistEntry.appendChild(deleteBtn);
        ulistEntry.setAttribute("id", "card-1");

        ulist.appendChild(ulistEntry);
        
        frontTextArea.value = "";
        rearTextArea.value = "";
    } else {
        return;
    }
}

function removeTextListNode() {
    if(ulist.childElementCount > 1 && rearTextArea.value === "") {
        ulist.removeChild(ulist.lastChild);
    } else {
        return;
    }
}
