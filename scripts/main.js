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

    // If rearTxtStr has no empty value or whitespaces then add to list
    if (rearTxtStr.trim() && frontTxtStr.trim()) {
        const frontTextParagraph = document.createElement("p");
        const rearTextParagraph = document.createElement("p");
        const deleteBtn = document.createElement("button");
        const flipBtn = document.createElement("button");
        const ulistEntry = document.createElement("li");

        // Replace all newlines with <br /> tags to go to the next line
        rearTxtStr.replace(/\n/g, "<br />");
        frontTxtStr.replace(/\n/g, "<br />");

        deleteBtn.setAttribute("class", "btn-style");
        deleteBtn.setAttribute("id", "delete-btn");
        deleteBtn.innerText = "Remove";
        deleteBtn.addEventListener("click", function() {
            ulistEntry.remove()
        });

        // Displaying the front text as the default
        frontTextParagraph.style.display = "block";
        rearTextParagraph.style.display = "none";
        
        // Setting the text of the <p> element
        frontTextParagraph.innerHTML = frontTxtStr;
        rearTextParagraph.innerHTML = rearTxtStr;

        flipBtn.setAttribute("class", "btn-style");
        flipBtn.setAttribute("id", "flip-btn");
        flipBtn.innerText = "Flip";
        // Show front or rear based on what's on the screen
        flipBtn.addEventListener("click", function() {
            if(frontTextParagraph.style.display === "none") {
                frontTextParagraph.style.display = "block";
                rearTextParagraph.style.display = "none";
            } else {
                frontTextParagraph.style.display = "none";
                rearTextParagraph.style.display = "block";
            }
        });

        // Constructing the <li> element
        ulistEntry.appendChild(frontTextParagraph);
        ulistEntry.appendChild(rearTextParagraph);
        ulistEntry.appendChild(deleteBtn);
        ulistEntry.appendChild(flipBtn);

        // Appending the <li> element to the <ul> element
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
