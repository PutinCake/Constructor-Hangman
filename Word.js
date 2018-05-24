// require letter.js 
var Letter = require("./letter.js");

function Word(word) {
	this.word = word;
	this.letters = [];
	//collect the letter which user guessed
	// this.guessedLetters = [];
	this.incorrectGuess = 0;

	for (var i = 0; i < this.word.length; i++) {
		this.letters.push(new Letter(this.word[i]));
	}
}

// Checks showLetter variable to render either letter or blank space
Word.prototype.toDisplay = function() {
	var string = "";
	for (var i = 0; i < this.letters.length; i++) {
		string += this.letters[i].render();
	}
	return string;
}

// Checks the letters array 
Word.prototype.searchLetter = function(letter) {

	// If letter is guessed correctly, change showLetter to true to render letter
	for (var i = 0; i < this.letters.length; i++) {
		if (this.letters[i].letter === letter) {
			this.letters[i].showLetter = true;
		}
	}

	// Checks if the guessed letter is in the word and if not, records the incorrect guess
	if (this.word.indexOf(letter) > -1) {
		var letterIndex = this.word.indexOf(letter);
		if (!this.letters[letterIndex].showLetter) {
			return;
		}
		//Use ANSI Colors in Terminal
		console.log("\n\x1b[32m%s\x1b[0m", "CORRECT!");
	} else {
		this.incorrectGuess++;
		console.log("\n\x1b[31m%s\x1b[0m", "INCORRECT!");
		return;
	}
}

// Checks to see if the entire word has been guessed correctly
Word.prototype.isWordComplete = function() {

	for (var i = 0; i < this.letters.length; i++) {
		if (!this.letters[i].showLetter) {
			return false;
		}
	}

	return true;
}

module.exports = Word;