const board = document.getElementById('board');

// Setup Board
// bounds: i j
// direction: i j
let boardHTML = '';
for (let row = 5; row >= 0; row--) {
    for(let col = 0; col < 7; col++){
        boardHTML += `
        <div class="slot">
            <label for="slot${col}${row}">
                <input type="checkbox" name="slot${col}${row}" id="slot${col}${row}">
            </label>
        </div>
        `;
    }
}

// Set the html
board.innerHTML = boardHTML;