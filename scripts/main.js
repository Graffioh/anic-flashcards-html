const newImg = document.getElementById("void1");

const frontTextArea = document.getElementById("front-textarea");
const rearTextArea = document.getElementById("rear-textarea");
const addBtn = document.getElementById("add-btn");
const fetchBtn = document.getElementById("fetch-btn");
const ulist = document.getElementById("flashcards-list-ul");

var fetchedCardsCount = 0

// Add typed text into unordered list by tapping on btn
addBtn.addEventListener("click", async () => {
    await createFlashcard(frontTextArea.value, rearTextArea.value);
    frontTextArea.value = "";
    rearTextArea.value = "";

    await populateFlashcardList();
});

function addTextListNode(front, rear, id) {
    var frontTxtStr = "";
    var rearTxtStr = "";

    // if(front === "" && rear === "") {
    //     frontTxtStr = frontTextArea.value;
    //     rearTxtStr = rearTextArea.value;
    // } else {
        frontTxtStr = front;
        rearTxtStr = rear;
    // }

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
        deleteBtn.addEventListener("click", async () => {
            await removeFlashcard(id, ulistEntry);
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
        flipBtn.addEventListener("click", () => {
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

fetchBtn.addEventListener("click", async () => {
    await populateFlashcardList();
});

async function fetchAllFlashcards() {
    const response = await fetch('http://localhost:8080/flashcards');
    const cards = await response.json();
    return cards;
}

async function createFlashcard(front, rear) {
    const response = await fetch('http://localhost:8080/flashcards', {
        method: 'POST',
        body: JSON.stringify({
            front: front,
            rear: rear
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
}

async function removeFlashcard(id, ulistEntry) {
    ulistEntry.remove()

    const response = await fetch('http://localhost:8080/flashcards/' + id, {
        method: 'DELETE',
      })
}

async function populateFlashcardList() {
    const cards = await fetchAllFlashcards();

    for(let i = fetchedCardsCount; i < cards.length; ++i) {
        addTextListNode(cards[i].front, cards[i].rear, cards[i].id);
        fetchedCardsCount++;
    }
}
