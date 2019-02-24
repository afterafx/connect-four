const form = document.getElementById('form');

// ======================================================

const formHTML = `
<button class="open-button" id="open-button">Player Names</button>
<div class="form-popup" id="playerForm">
    <form onsubmit="submitForm(event)" class="form-container">
        <label for="player1Name"><b>Player 1:</b></label>
        <input type="text" name="playerone" id="playerone" placeholder="Enter Name">
        <br>
        <label for="player2Name"><b>Player 2:</b></label>
        <input type="text" name="playertwo" id="playertwo" placeholder="Enter Name">
        <br>
        <button type="submit" class="btn">Submit</button>
        <button class="btn cancel" id="btn-cancel">Close</button>
    </form>
</div>
`;

// form.innerHTML = formHTML;

// ======================================================

// Functions to open and close form
function openForm() {
  console.log("hi");
  document.getElementById('playerForm').style.display = 'block';
}

function closeForm() {
  document.getElementById('playerForm').style.display = 'none';
}

// Submits form data into local storage
// Adds Players name to Local storage
function submitForm(event) {
  // prevent page from refreshing after submission
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const players = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
    players[key] = value;
  }
  localStorage.setItem('players', JSON.stringify(players));
  // closeForm();
}

// ======================================================

// Event Listeners
// document.getElementById("open-button").addEventListener("click", openForm);

// document.getElementById("btn-cancel").addEventListener("click", closeForm);

// ======================================================