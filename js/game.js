/*
game.js
*/

/*Game object constructor
used as the object to store all the data associated with a created 'game' of chess*/
function Game(p1, p2, gametype, pos, pgn) {
	// console.log("Creating game object...");
	this.p1 = p1;
	this.p2 = p2;
	this.gametype = gametype;
	this.fen = pos;
	// console.log("this.fen = "+this.fen);
	this.board_from_FEN = function() {
		/*sets the board array of the Game object to mirror the FEN*/
		var board = [
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null]
		];
		var i = 0;
		var a = 7;
		var b = 0;
		var n = 1;
		while (true) {
			// console.log(this.get_FEN().charAt(i));
			if (this.get_FEN().charAt(i) == 'k') {
				board[a][b] = bKing;
				i++;
				b++;
			} else if (this.get_FEN().charAt(i) == 'q') {
				board[a][b] = bQueen;
				i++;
				b++;
			} else if (this.get_FEN().charAt(i) == 'b') {
				board[a][b] = bBishop;
				i++;
				b++;
			} else if (this.get_FEN().charAt(i) == 'n') {
				board[a][b] = bKnight;
				i++;
				b++;
			} else if (this.get_FEN().charAt(i) == 'r') {
				board[a][b] = bRook;
				i++;
				b++;
			} else if (this.get_FEN().charAt(i) == 'p') {
				board[a][b] = bPawn;
				i++;
				b++;
			} else if (this.get_FEN().charAt(i) == 'K') {
				board[a][b] = wKing;
				i++;
				b++;
			} else if (this.get_FEN().charAt(i) == 'Q') {
				board[a][b] = wQueen;
				i++;
				b++;
			} else if (this.get_FEN().charAt(i) == 'B') {
				board[a][b] = wBishop;
				i++;
				b++;
			} else if (this.get_FEN().charAt(i) == 'N') {
				board[a][b] = wKnight;
				i++;
				b++;
			} else if (this.get_FEN().charAt(i) == 'R') {
				board[a][b] = wRook;
				i++;
				b++;
			} else if (this.get_FEN().charAt(i) == 'P') {
				board[a][b] = wPawn;
				i++;
				b++;
			} else if (this.get_FEN().charAt(i) == '/') {
				a--;
				i++;
				b = 0;
			} else if (this.get_FEN().charAt(i) == ' ') {
				break;
			} else {
				if (n == parseInt(this.get_FEN().charAt(i))) {
					board[a][b] = null;
					b++;
					n = 1;
					i++;
				} else {
					board[a][b] = null;
					b++; n++;
				}
			}
		}
		return board;
	};
	this.board = this.board_from_FEN();
	this.pgn = pgn;
	this.turn = null;
	this.castling = [];
	this.halfmove = null;
	this.move_count = null;
	this.enPassant_allowedAt = null;
	this.load_data_from_FEN = function() {
		/*skips board and loads other data to game*/
		var i = 0;
		while (this.get_FEN().charAt(i) != ' ') {
			i++;
		}
		i++;
		if (this.get_FEN().charAt(i) == 'w') {
			this.turn = "WHITE";
		} else if (this.get_FEN().charAt(i) == 'b') {
			this.turn = "BLACK";
		} else {
			console.log("charAt(i) = "+this.get_FEN().charAt(i));
			throw "ERR :: invalid color";
		}
		i+=2;
		if (this.get_FEN().charAt(i++) == "K") {
			this.castling[0] = true; }
			if (this.get_FEN().charAt(i++) == "Q") {
				this.castling[1] = true; }
				if (this.get_FEN().charAt(i++) == "k") {
					this.castling[2] = true; }
					if (this.get_FEN().charAt(i++) == "q") {
						this.castling[3] = true; }
						i++;
						if (this.get_FEN().charAt(i) == '-') {
							if (this.enPassant_allowedAt)
								this.enPassant_allowedAt = null;
						} else {
							this.enPassant_allowedAt = this.get_FEN().charAt(i);
						}
						i+=2;
						this.halfmove = this.get_FEN().charAt(i);
						i+=2;
						this.move_count = this.get_FEN().charAt(i);
					};
					this.load_data_from_FEN();
				}
/*Piece object constructor
used as the object to store all the data associated with a 'piece' i.e. type, color*/
function Piece(type, color) {
	this.type = type;
	this.color = color;
}
/*Move object constructor
used as the object to store all the data associated with a 'move' calculation i.e. src, dest, piece*/
function Move(src, dest, piece) {
	this.src = src;
	this.dest = dest;
	this.piece = piece;
}








var wPawn = new Piece("PAWN", "WHITE");
var wKnight = new Piece("KNIGHT", "WHITE");
var wBishop = new Piece("BISHOP", "WHITE");
var wRook = new Piece("ROOK", "WHITE");
var wQueen = new Piece("QUEEN", "WHITE");
var wKing = new Piece("KING", "WHITE");
var bPawn = new Piece("PAWN", "BLACK");
var bKnight = new Piece("KNIGHT", "BLACK");
var bBishop = new Piece("BISHOP", "BLACK");
var bRook = new Piece("ROOK", "BLACK");
var bQueen = new Piece("QUEEN", "BLACK");
var bKing = new Piece("KING", "BLACK");


/*var BOARD_STANDARD = [
[wRook,wKnight,wBishop,wQueen,wKing,wBishop,wKnight,wRook],
[wPawn,wPawn,wPawn,wPawn,wPawn,wPawn,wPawn,wPawn],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[bPawn,bPawn,bPawn,bPawn,bPawn,bPawn,bPawn,bPawn],
[bRook,bKnight,bBishop,bQueen,bKing,bBishop,bKnight,bRook]
];
var BOARD_TEST = [
[wKing,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,wPawn,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[bKing,null,null,null,null,null,null,null]
];*/