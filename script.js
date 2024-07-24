document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector(".crud-container");
    const form = document.querySelector("form");
    const inputBox = document.getElementById('input-box');

    form.addEventListener('submit', submitInput);

    function submitInput(event) {
        event.preventDefault();
        let alertContainer = document.querySelector('.alert-msg');
        alertContainer.innerHTML = "";
        let inputValue = inputBox.value;
        if (inputValue.trim() === ""){
            let alert = document.createElement('div');
             alert.classList.add('alert');
             alert.innerHTML = `
             <span class="alert-text">Enter Something to write...</span>
            <button class="alert-dismiss" aria-label="Close">&times;</button>
            `;
             document.querySelector('.alert-msg').append(alert);
             document.querySelectorAll('.alert-dismiss').forEach(button => {
             button.addEventListener('click', function() {
                this.parentElement.style.display = 'none';
            });
        });
         
         return; // Prevent adding empty cards
        }
        addCard(inputValue);
        saveCardData();
        inputBox.value = "";
    }

    
    
    function addCard(text) {
        // Creating card
        let card = document.createElement("div");
        card.classList.add('card');
        container.append(card);

        // Creating card text
        let cardText = document.createElement("div");
        cardText.classList.add('card-text');
        cardText.textContent = text;

        // Creating edit button
        let editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = "Edit";
        // Edit button functionality
        editBtn.addEventListener('click', () => {
            let insertInput = document.createElement('input');
            insertInput.classList.add('card-input');
            insertInput.value = cardText.textContent;
            cardText.textContent = "";
            cardText.appendChild(insertInput);
            insertInput.focus(); // Focus on the new input element

            editBtn.remove();
            let addEdits = document.createElement('button');
            addEdits.textContent = "Add edits";
            addEdits.classList.add('add-edits');
            addEdits.style.order = 2;
            card.appendChild(addEdits);

            function addNewVal() {
                cardText.textContent = insertInput.value;
                insertInput.remove();
                addEdits.remove();
                card.appendChild(editBtn);
                saveCardData(); // Save updated card data
            }

            addEdits.addEventListener('click', addNewVal);
        });

        // Creating remove button
        let removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = "Remove";

        removeBtn.addEventListener('click', () => {
            card.remove();
            saveCardData(); // Save updated card data
        });

        cardText.style.order = 1;
        editBtn.style.order = 2;
        removeBtn.style.order = 3;
        card.append(cardText);
        card.append(editBtn);
        card.append(removeBtn);
    }

    function saveCardData() {
        const cards = [];
        document.querySelectorAll('.card-text').forEach(cardText => {
            cards.push(cardText.textContent);
        });
        localStorage.setItem('cards', JSON.stringify(cards));
    }

    function loadCardData() {
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        cards.forEach(cardText => addCard(cardText));
    }

    loadCardData();
});

