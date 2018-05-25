//set require 
var Word = require("./word.js");
var Letter = require("./letter.js");
var inquirer = require("inquirer");

// Choose random word from list
var wordChoices = ["WADE", "LEBRON", "CURRY", "JORDAN", "KOBE", "MAGIC", "LICHKING", "BATMAN", "ROSE", "THEGODFATHER", "PACINO", "ROCK"];
var wordIndex = Math.floor(Math.random() * wordChoices.length);
var keyWord = new Word(wordChoices[wordIndex]);
var numGuesses = 5;

function playHangman(){

	// Displays word to guess as a string of blanks and letters
	console.log(keyWord.toDisplay() + "\n");

	// Game ends if no more guesses remain
	if (keyWord.incorrectGuess >= numGuesses){
		console.log("\x1b[31m%s\x1b[0m", "Sorry, no more guesses left!");

		// Player can end the game or they get another try
		inquirer.prompt([
			{
				name: "confirm",
				type: "confirm",
				message: "Do you want to end the game?"
			}
		]).then(function(response) {

			if (response.confirm) {
				console.log("\nThanks for playing! Better luck next time...");
				return;
			} else {
				console.log("\nWant to try again? Alright, one more time!!!");
				keyWord.incorrectGuess = 0;
				playHangman();
			} 
		});

	}

	// Prompt to guess letter with input validation
	inquirer.prompt([
		{
			name: "letter",
			type: "input",
			message: "Guess a letter! ",
			validate: function validateGuess(letter){
	        	if (letter.length > 1) {
	        		console.log("\n\x1b[33m%s\x1b[0m", "Enter just one letter..\n");
					return;
					//use regular expression to check input info 
	        	} else if (!letter.match(/^[a-zA-Z]*$/)) {
	        		console.log("\n\x1b[34m%s\x1b[0m", "That's not a letter! Try again..\n");
	        		return;
	        	} else {
	        		return true;
	        	}
			}
		}
	]).then(function(letterInput){ 

		// Changes input to capital letter
		var letter = letterInput.letter.toUpperCase(); 

		// Check for input letter in word and change display
		keyWord.searchLetter(letter);
		keyWord.toDisplay();

		// If the entire word is completed and guesses remain, game ends (player wins)
		if(keyWord.isWordComplete()){ 
			console.log("\n-----------------------------")
			console.log("\n\x1b[35m%s\x1b[0m", "You got it! The word was '" + keyWord.toDisplay() + "'. Let's play again!\n");

			wordIndex = Math.floor(Math.random() * wordChoices.length);
			nextWord = new Word(wordChoices[wordIndex]);
			keyWord = nextWord;
		}

		// If the word is not completed and guesses remain, prompt to guess again (continue)
		console.log("You have " + (numGuesses - keyWord.incorrectGuess) + " guesses remaining\n");
		playHangman();

		}
  );
}

// Starts game
playHangman();