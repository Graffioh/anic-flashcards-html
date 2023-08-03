const newImg = document.getElementById("void1");

const frontTextArea = document.getElementById("front-textarea");
const rearTextArea = document.getElementById("rear-textarea");
const addBtn = document.getElementById("add-btn");
const ulist = document.getElementById("flashcards-list-ul");

var str = "";

// Add typed text into unordered list by tapping on btn
addBtn.addEventListener("click", () => {
    addTextListNode();
});

function addTextListNode() {
    var frontTxtStr = "";
    var rearTxtStr = "";

    frontTxtStr = frontTextArea.value;
    rearTxtStr = rearTextArea.value;
    
    str = frontTxtStr;

    // If rearTxtStr has no empty value/whitespaces
    if (rearTxtStr.trim() && frontTxtStr.trim()) {
        const frontTextParagraph = document.createElement("p");
        const rearTextParagraph = document.createElement("p");
        const ulistEntry = document.createElement("li");
        const deleteBtn = document.createElement("button");
        const flipBtn = document.createElement("button");

        rearTxtStr.replace(/\n/g, "<br />");
        frontTxtStr.replace(/\n/g, "<br />");

        deleteBtn.setAttribute("class", "remove-btn-style");
        deleteBtn.innerText = "Remove";
        deleteBtn.addEventListener("click", function() {
            ulistEntry.remove()
        });

        frontTextParagraph.style.display = "block";
        rearTextParagraph.style.display = "none";
        
        frontTextParagraph.innerHTML = frontTxtStr;
        rearTextParagraph.innerHTML = rearTxtStr;

        flipBtn.setAttribute("class", "flip-btn-style");
        flipBtn.innerText = "Flip";
        flipBtn.addEventListener("click", function() {
            if(frontTextParagraph.style.display === "none") {
                console.log("Front should be visible");

                frontTextParagraph.style.display = "block";
                rearTextParagraph.style.display = "none";
            } else {
                console.log("Rear should be visible");

                frontTextParagraph.style.display = "none";
                rearTextParagraph.style.display = "block";
            }
        });

        ulistEntry.appendChild(frontTextParagraph);
        ulistEntry.appendChild(rearTextParagraph);
        ulistEntry.appendChild(deleteBtn);
        ulistEntry.appendChild(flipBtn);

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
