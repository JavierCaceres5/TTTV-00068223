const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#estado");
const restartBtn = document.querySelector("#restartBtn");
const winLine = document.querySelector("#winLine");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Turno de ${currentPlayer}`;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `Turno de ${currentPlayer}`;
}
function checkWinner(){
    let roundWon = false;
    let winIndex = -1;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            winIndex = i;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `Gana ${currentPlayer}!`;
        displayWinLine(winIndex); 
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Empate!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Turno de ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = "");
    winLine.style.display = "none";
    running = true;
}
function displayWinLine(index) {
    winLine.style.display = "block";

    switch(index) {
        case 0:
            winLine.style.top = "40px"; 
            winLine.style.left = "2px";
            winLine.style.transform = "rotate(0deg)";
            break;
        case 1:
            winLine.style.top = "120px"; 
            winLine.style.left = "2px";
            winLine.style.transform = "rotate(0deg)";
            break;
        case 2:
            winLine.style.top = "200px"; 
            winLine.style.left = "2px";
            winLine.style.transform = "rotate(0deg)";
            break;
        case 3:
            winLine.style.top = "2px";
            winLine.style.left = "40px";
            winLine.style.width = "5px";
            winLine.style.height = "240px";
            winLine.style.transform = "rotate(90deg)";
            break;
        case 4:
            winLine.style.top = "2px"; 
            winLine.style.left = "120px";
            winLine.style.width = "5px";
            winLine.style.height = "240px";
            winLine.style.transform = "rotate(90deg)";
            break;
        case 5:
            winLine.style.top = "2px";
            winLine.style.left = "200px";
            winLine.style.width = "5px";
            winLine.style.height = "240px";
            winLine.style.transform = "rotate(90deg)";
            break;
        case 6:
            winLine.style.top = "2px"; 
            winLine.style.left = "2px";
            winLine.style.width = "340px";
            winLine.style.height = "5px";
            winLine.style.transform = "rotate(45deg)";
            break;
        case 7:
            winLine.style.top = "2px";
            winLine.style.left = "2px";
            winLine.style.width = "340px";
            winLine.style.height = "5px";
            winLine.style.transform = "rotate(-45deg)";
            break;
    }
}

