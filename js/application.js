NUM_SYMBOLS = 6;
NUM_FIELDS = 4;

SYMBOLS = ["A", "B", "C", "D", "E", "F"];

MUTATION_PROBABILITY	= 0.03; // 0.6
PERMUTATION_PROBABILITY	= 0.02; // 0.4
INVERSION_PROBABILITY	= 0.02;

MAXGEN = 100;
POPULATION_SIZE = 150;
SET_SIZE = 60;
FIT_A = 1;
FIT_B = 2;

var allCodes = [];
variations(SYMBOLS, NUM_FIELDS, [], allCodes);

function shouldDo(probability) {
	return (Math.random() <= probability) ? true : false;
}

function getCrossoverPoint(length) {
	return Math.floor(Math.random() * (length - 2) + 1);
}

function check(probability, toRepeat) {
	var total = toRepeat;
	var count = 0;
	while(total--) {
		if(shouldDo(probability)) count++;
	}
	return (count / toRepeat).toFixed(2);
}

function Combination(code) {
	this.code = _.isString(code) ? code.split('') : code;
	this.fitness = 0;
	this.eligible = false;
}

Combination.prototype.crossover = function(other) {
	var crossoverPoint = getCrossoverPoint(this.code.length);
	var firstChild = this.code.slice(0, crossoverPoint).concat(other.code.slice(crossoverPoint));
	var secondChild = other.code.slice(0, crossoverPoint).concat(this.code.slice(crossoverPoint));
	return [new Combination(firstChild), new Combination(secondChild)];
};

Combination.prototype.mutate = function() {
	var position = Math.floor(Math.random() * NUM_FIELDS);
	var newValue = _.sample(_.without(SYMBOLS, this.code[position]));
	this.code[position] = newValue;
};

Combination.prototype.permutate = function() {
	var positions = _.range(NUM_FIELDS);
	var toPermute = _.sample(positions, 2);
	this.code[toPermute[1]] = [
		this.code[toPermute[0]],
		this.code[toPermute[0]] = this.code[toPermute[1]]
	][0];
}

Combination.prototype.inverse = function () {
	this.code.reverse();
}

Combination.prototype.getCodeString = function() {
	return this.code.join('');
};

Combination.prototype.calculateFitness = function(prevGuesses) {
	var xDifference = 0;
	var yDifference = 0;
	var slickValue = 0;
	for(var i in prevGuesses) {
		var testResponse = testCode(this.code, prevGuesses[i].code);
		xDifference	+= Math.abs(testResponse[0] - prevGuesses[i].x);
		yDifference	+= Math.abs(testResponse[1] - prevGuesses[i].y);
		slickValue	+= parseInt(i);
	}
	if(xDifference === 0 && yDifference === 0) {
		this.eligible = true;
	}
	this.fitness = FIT_A * xDifference + yDifference + FIT_B * NUM_FIELDS * slickValue;
};

function variations(symbols, depth, variation, results) {
	if(depth > 0) {
		for(var i = 0; i<symbols.length; i++) {
			var newBranch = variation.slice();
			newBranch.push(symbols[i]);
			variations(symbols, depth-1, newBranch, results)
		}
	} else {
		results.push(variation.join(''));
	}
}

function Mastermind() {
	this.solution = [];
	this.newGame();
}
Mastermind.prototype.newGame = function() {
	for(var i=0; i<NUM_FIELDS; i++) {
		this.solution[i] = SYMBOLS[Math.floor(Math.random() * NUM_SYMBOLS)];
	}
};
Mastermind.prototype.testCombination = function(combination) {
	return testCode(combination, this.solution);
}

var testCode = function(combination, solution) {
	var a = 0;
	var b = 0;
	var marked = [0, 0, 0, 0];
	for(var i = 0; i<NUM_FIELDS; i++) {
		if(combination[i] == solution[i]) {
			a++;
			marked[i] = 1;
		}
	}
	for(var i = 0; i<NUM_FIELDS; i++) {
		if(combination[i] != solution[i]) {
			for(var j = 0; j<NUM_FIELDS; j++) {
				if(i != j && 0 == marked[j] && combination[i] == solution[j]) {
					b++;
					marked[j] = 1;
					break;
				}
			}
		}
	}	
	return [a, b];
}

function Population(size) {
	this.members = [];
	this.size = size;
	this.init();
}

Population.prototype.init = function() {
	this.members = [];
	var randomSample = _.sample(allCodes, this.size);
	for(var i in randomSample) this.members.push(new Combination(randomSample[i]));
};

Population.prototype.sort = function() {
    this.members.sort(function(a, b) {
        return a.fitness - b.fitness;
    });
}

Population.prototype.generation = function(prevGuesses, eiSet, maxGen, callback) {
	if(maxGen <= 0 || eiSet.size == SET_SIZE) {
		if(!(prevGuesses.length > 1 && eiSet.size < 1)) {
			callback();
			return;
		}
	}
	for(var i in this.members) {
		this.members[i].calculateFitness(prevGuesses);
		if(this.members[i].eligible) {
			eiSet.add(this.members[i].getCodeString());
		}
	}
	this.sort();
	var lastIndex = this.members.length - 1;
	var nextGeneration = this.members[lastIndex].crossover(this.members[lastIndex - 1]);
	for(var i in nextGeneration) {
		if(shouldDo(MUTATION_PROBABILITY)) nextGeneration[i].mutate();
		if(shouldDo(PERMUTATION_PROBABILITY)) nextGeneration[i].permutate();
		if(shouldDo(INVERSION_PROBABILITY)) nextGeneration[i].inverse();
	}	
	this.members.splice(0, 2, nextGeneration[0], nextGeneration[1]);
	var uniqueCodes = _.chain(this.members).map(function(obj) { return obj.code.join('') }).uniq().value()
	var newMembers = _.sample(_.difference(allCodes, uniqueCodes), this.size - uniqueCodes.length);
	uniqueCodes = _.union(uniqueCodes, newMembers);
	this.members = uniqueCodes.map(function(e) {
		return new Combination(e);
	});
	var scope = this;
	var nextGen = maxGen - 1;
	setTimeout(function() {
		scope.generation(prevGuesses, eiSet, nextGen, callback);
	}, 5);
};

function chooseNextGuess(eligible) {
	var max = 0;
	var nextGuess = eligible[0];
	for(var i in eligible) {
		var sum = 0;
		var searchSpace = _.without(eligible, eligible[i]);
		for(var j in searchSpace) {
			var testResponse = testCode(eligible[i].split(''), searchSpace[j].split(''));
			var remainingCodes = _.without(searchSpace, searchSpace[j]);
			for(var k in remainingCodes) {
				var subResponse = testCode(remainingCodes[k].split(''), searchSpace[j].split(''));
				if(testResponse.join('') != subResponse.join('')) {
					sum++;
				}
			}
		}
		if(sum > max) {
			max = sum;
			nextGuess = eligible[i];
		}
	}
	return nextGuess.split('');
}

function diplayGuess(code) {
	var rowSelector = $(".guess-row-" + previousGuesses.length);
    var i = 0;
    var fn = function(){
		rowSelector
			.find(".sym-col:nth-child(" + (i + 1) + ")")
			.find("span")
			.text(code[i])
			.fadeIn(200);
        if( ++i < code.length ){
            setTimeout(fn, 280);
        }
    };
    fn();
    if(aiMode) {
	    setTimeout(function() {
		    var testResponse = game.testCombination(code);
		    var testTableSelector = $(".test-table-" + previousGuesses.length);
		   	var td = 0;
		   	for(; td < testResponse[0]; td++) {
		   		testTableSelector
		   			.find("#tcol-"+td)
		   			.addClass("red-peg");
		   	}
		   	for(; td < testResponse[0] + testResponse[1]; td++) {
		   		testTableSelector
		   			.find("#tcol-"+td)
		   			.addClass("yellow-peg");
		   	}
		}, 1400);
	}
}

var game, aiGuess, population, eligibleSet, aiMode, previousGuesses;

startNewGame();

function startNewGame() {
	initGameVariables();
	cleanUpPlayground();
	diplayGuess(aiGuess);
}

function initGameVariables() {
	game = new Mastermind();
	aiGuess = _.sample(allCodes);
	population = new Population(POPULATION_SIZE);
	eligibleSet = new Set();
	aiMode = document.getElementById("ai-mode").checked;
	previousGuesses = [];
	// ...
	console.log(game.solution);
}

function cleanUpPlayground() {
	$("[class*='go-btn']")
		.addClass('disabled')
		.show();
	$(".go-btn-0")
		.removeClass('disabled');
	$(".sym-col span")
		.text('')
		.hide();
	$(".test-col")
		.removeClass('red-peg')
		.removeClass('yellow-peg');
}

$(".new-game").click(function() {
	startNewGame();
});

function playNextGuess(blackNum, whiteNum) {
	console.log(blackNum, whiteNum);
	previousGuesses.push({code: aiGuess, x : blackNum, y : whiteNum});
	if(blackNum == NUM_FIELDS) { 
		alert("Win!"); 
		return; 
	}
 	eligibleSet = new Set();
 	var genNum = 0;
 	population.generation(previousGuesses, eligibleSet, MAXGEN, function() {
 		var eligible = Array.from(eligibleSet);
		if(eligible.length > 0) {
			aiGuess = chooseNextGuess(eligible);
			diplayGuess(aiGuess);
			$("#loader-" + (previousGuesses.length-1)).hide();
			$(".go-btn-" + previousGuesses.length).removeClass("disabled");
		} else {
			alert("Lose!");
		}
		$("#loader").hide();
 	});
}

$(".test-col").click(function() {
	if($(this).hasClass("red-peg")) {

		$(this).removeClass("red-peg");

	} else if($(this).hasClass("yellow-peg")) {

		$(this).removeClass("yellow-peg");
		$(this).addClass("red-peg");

	} else {

		$(this).addClass("yellow-peg");

	}
});

function countTestResponse() {
	var red = 0, yellow = 0;
	var responseSelector = $(".test-table-" + previousGuesses.length + " td");
	responseSelector.each(function() {
		var that = $(this);
		if(that.hasClass("red-peg")) {
			red++;
		} else if(that.hasClass("yellow-peg")) {
			yellow++;
		}
	});
	return {a:red, b:yellow};
}

$("[class*='go-btn']").click(function() {
	var response = countTestResponse();
	$(this).hide();
	$("#loader-" + previousGuesses.length).show();
	playNextGuess(response.a, response.b);
});