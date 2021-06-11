//utility function for drawing crosses
function cross(x, y) {
	line(x - width / 10, y - height / 10, x + width / 10, y + height / 10);
	line(x - width / 10, y + height / 10, x + width / 10, y - height / 10);
}

class Board {
	constructor() {
		this.turnNum = 0;
		this.board = [['', '', ''], ['', '', ''], ['', '', '']];
	}

	getAvailableMoves() {
		let moves = [];

		for (let i = 0; i < 3; i++)
			for (let j = 0; j < 3; j++)
				if (this.board[i][j] == '')
					moves.push([i, j]);

		return moves;
	};

	//deep copy
	clone() {
		let newBoard = new Board();

		for (let row = 0; row < 3; row++)
			for (let col = 0; col < 3; col++)
				newBoard.board[row][col] = this.board[row][col];

		newBoard.turnNum = this.turnNum;

		return newBoard;
	};

	makeMove(player, move) {
		this.board[move[0]][move[1]] = player;
		this.turnNum++;
	};

	isFull() {
		return this.turnNum == 9;
	};

	winCheck() {
		let boardState = this.board;
		let winner;

		//checking ai diagonals
		if (boardState[1][1] !== '' &&
			((boardState[0][0] == boardState[1][1]
				&& boardState[2][2] == boardState[1][1])
				|| (boardState[0][2] == boardState[1][1]
					&& boardState[2][0] == boardState[1][1]))) {
			winner = boardState[1][1];
			return winner;
		}
		else {
			//Checking the horizontals
			for (let row in boardState) {
				if (boardState[row][0] !== '' &&
					boardState[row][0] == boardState[row][1]
					&& boardState[row][2] == boardState[row][1]) {
					winner = boardState[row][0];
					return winner;
				}
			}
			//Verticals
			for (let col in boardState) {
				if (boardState[0][col] !== '' &&
					boardState[0][col] == boardState[1][col]
					&& boardState[1][col] == boardState[2][col]) {
					winner = boardState[0][col];
					return winner;
				}
			}
		}
	};

	drawBoard() {
		line(width / 3, 0, width / 3, height);
		line(width / 1.5, 0, width / 1.5, height);
		line(0, height / 3, width, height / 3);
		line(0, height / 1.5, width, height / 1.5);

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				let x = i * width / 3 + width / 6;
				let y = j * height / 3 + height / 6;

				switch (this.board[i][j]) {
					case 'O':
						circle(x, y, width / 5);
						break;
					case 'X':
						cross(x, y);
						break;
				}
			}
		}
	}
}