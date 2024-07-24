const container = document.querySelector(".crud-container");
const form = document.querySelector("form");
const inputBox = document.getElementById('input-box');

function submitInput(event) {
    event.preventDefault();
    let inputValue = inputBox.value;
    if(inputValue.trim()==="") {
        return;
    }
    /* creating card*/
    let card = document.createElement("div");
    card.classList.add('card');
    container.append(card);
    let cardText = document.createElement("div");
    cardText.classList.add('card-text');    
    cardText.textContent = inputValue;
    
    /* creating button*/
    let editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = "Edit";
    
    /* edit button functionality*/
    
    /* event listener*/
    editBtn.addEventListener('click',() =>{
        cardEdit = true;
        
        let tempText = cardText.textContent;
        if(cardEdit) {
            let insertInput = document.createElement('input');
            insertInput.focus();
            insertInput.classList.add('card-input');
            insertInput.value = cardText.textContent;
            let cardTextTemp = cardText.textContent
            cardText.textContent = "";
            editBtn.remove();
            let addEdits = document.createElement('button');
            addEdits.textContent = "Add edits";
            addEdits.classList.add('add-edits');
            addEdits.style.order = 2;
            card.append(addEdits);
            cardText.append(insertInput);
            
            
            
            function addNewVal() {
                cardText.textContent = insertInput.value;
                insertInput.remove();
                addEdits.remove();
                card.append(editBtn);
            }
            
            addEdits.onclick = addNewVal;
            cardEdit = false;    
            
            
        }
      
    });
    /* event listener ends here*/
    
    
    /* creating Remove btn*/
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = "Remove";
    
    
    removeBtn.addEventListener('click', () => {
        card.remove();
        });
        
    cardText.style.order = 1;
    editBtn.style.order = 2;
    removeBtn.style.order = 3;
    card.append(cardText);
    card.append(editBtn);
    card.append(removeBtn);
    inputBox.value = "";
}


