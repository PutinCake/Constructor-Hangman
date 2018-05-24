function Letter(letter) {
	this.letter = letter;
	this.showLetter = false;
}

//Show the letter has been guessed or to show blank
Letter.prototype.render = function() {
	if (this.showLetter) {
		return this.letter;
	} else {
		return "_ ";
	}
}

module.exports = Letter;