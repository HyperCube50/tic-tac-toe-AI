const mainBoard = new Board();
const ai = new AI('X');
let player = 'O';
let opponent = 'X';

function mouseClicked() {

	//calculates coord index
	let x = floor(mouseX / (width / 3));
	let y = floor(mouseY / (height / 3));


	if (mainBoard.board[x][y] != '') {
		return;
	}

	mainBoard.makeMove(player, [x, y]);

	//wincheck, also makes sure further input will not effect the game
	let winner = mainBoard.winCheck();

	if (winner || mainBoard.isFull())
		gameOver(winner);
	else {
		let move = ai.getBestMove(mainBoard);

		mainBoard.makeMove(opponent, move);

		winner = mainBoard.winCheck();
		if (winner || mainBoard.isFull())
			gameOver(winner);
	}
}

function gameOver(winner) {

	if (winner) {
		window.alert(winner + " won the game");
		noLoop();
	} else {
		window.alert('draw');
		noLoop()
	}
}


function setup() {
	createCanvas(600, 600);
}

function draw() {
	mainBoard.drawBoard();
}