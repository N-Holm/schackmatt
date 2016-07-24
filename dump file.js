/*
game.js
*/

function Game(p1, p2, gametype) {
	this.p1 = p1;
	this.p2 = p2;
	this.gametype = gametype;
	this.fen = null;
	if (gametype == "STANDARD") {
		this.board = BOARD_STANDARD;
		this.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
	} else if (gametype == "TEST") {
		this.board = BOARD_TEST;
	}
	this.turn = "WHITE";
	this.pgn = [];
	this.castling = [];
	for (var i = 0; i < 4; i++) {
		this.castling[i] = true;
	}
	this.halfmove = 0;
	this.move_count = 1;
	this.enPassant_allowedAt = null;
}




Game.prototype.print_PGN = function() {
	var out = "";
	for (var i = 0; i < this.pgn.length; i++) {
		out += this.pgn[i].notation+" ";
	}
	console.log("\tPGN :: "+out);
};




Game.prototype.get_PGN = function() {
	/*returns the PGN [] of the Game*/
	return this.pgn;
};
Game.prototype.add_move_to_PGN = function(move) {
	/*adds move to pgn of Game*/
	
	this.pgn[this.pgn.length] = move;
};


























