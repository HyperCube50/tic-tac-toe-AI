class AI {
	constructor() {
		this.marker = 'X';
		this.opponent = 'O';
		this.max = Infinity;
		this.min = -Infinity;
	}

	minimax(board, player) {
		let moves = board.getAvailableMoves();

		//leaf nodes
		if (board.turnCnt >= 9 || board.winCheck() || moves.length == 0) {
			return this.evaluate(board);
		}

		//max
		if (player === this.marker) {
			let value = this.min;
			
			for (let i = 0; i < moves.length; i++) {
				let newBoard = board.clone();
				newBoard.makeMove(this.marker, moves[i]);

				value = max(value, this.minimax(newBoard, this.opponent));
			}

			return value;
		}

		//min
		if (player === this.opponent) {
			let value = this.max;
			for (let i = 0; i < moves.length; i++) {
				let newBoard = board.clone();
				newBoard.makeMove(this.opponent, moves[i]);
				
				value = min(value, this.minimax(newBoard, this.marker));
			}

			return value;
		}
	};

	getBestMove(board) {
		let score = this.min;
		let currScore;
		let bestMove;
		let moves = board.getAvailableMoves();
		let corners = [[0, 0], [0, 2], [2, 0], [2, 2]];

		//some optimizations
		//also adds some randomization since going against the same moves kinda gets boring real quickly
		if (board.turnNum == 0)
			return [1, 1];
		else if (board.turnNum == 1 && board.board[1][1] == '')
			return [1, 1];
		else if (board.turnNum == 1)
			return corners[Math.floor(Math.random() * 4)];

		for (let move = 0; move < moves.length; move++) {
			let newBoard = board.clone();
			newBoard.makeMove(this.marker, moves[move]);
			currScore = this.minimax(newBoard, this.opponent);

			if (currScore > score) {
				score = currScore;
				bestMove = moves[move];
			}
		}

		return bestMove;
	}

	//evaluates board
	evaluate = function (board) {
		let score = 0;

		score += this.evaluateLine(board, 0, 0, 0, 1, 0, 2);
		score += this.evaluateLine(board, 1, 0, 1, 1, 1, 2);
		score += this.evaluateLine(board, 2, 0, 2, 1, 2, 2);
		score += this.evaluateLine(board, 0, 0, 1, 0, 2, 0);
		score += this.evaluateLine(board, 0, 1, 1, 1, 2, 1);
		score += this.evaluateLine(board, 0, 2, 1, 2, 2, 2);
		score += this.evaluateLine(board, 0, 0, 1, 1, 2, 2);
		score += this.evaluateLine(board, 0, 2, 1, 1, 2, 0);

		return score;
	}

    //evaulates 3 sets of coordinates
	evaluateLine(board, r1, c1, r2, c2, r3, c3) {
		let score = 0;

		if (board.board[r1][c1] === this.marker)
			score = 1;
		else if (board.board[r1][c1] === this.opponent)
			score = -1;

		if (board.board[r2][c2] === this.marker) {
			if (score == 1)
				score = 10;
			else if (score === -1)
				return 0;
			else
				score = 1;
		} else if (board.board[r2][c2] === this.opponent) {
			if (score == -1)
				score = -10;
			else if (score === 1)
				return 0;
			else
				score = -1;
		}

		if (board.board[r3][c3] === this.marker) {
			if (score > 1)
				score *= 10;
			else if (score < 0)
				return 0;
			else
				score = 1;
		} else if (board.board[r3][c3] === this.opponent) {
			if (score < 0)
				score *= 10;
			else if (score > 1)
				return 0;
			else
				score = -1;
		}

		return score;
	};
}