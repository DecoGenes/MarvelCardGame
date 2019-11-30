const cardsArray = [
    {
        name: 'Iron Man',
        img: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/3/35/IronMan-EndgameProfile.jpg/revision/latest/top-crop/width/200/height/150?cb=20190423175213',
    },
    {
        name: 'Captain America',
        img: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/d/d7/CapAmerica-EndgameProfile.jpg/revision/latest/scale-to-width-down/180?cb=20190423175339',
    },
    {
        name: 'Black Widow',
        img: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/9/9a/BlackWidow-EndgameProfile.jpg/revision/latest/top-crop/width/200/height/150?cb=20190423174842',
    },
    {
        name: 'Spider-Man',
        img: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/c/cf/Spider-Man_AIW_Profile.jpg/revision/latest/scale-to-width-down/180?cb=20180518212133',
    },
    {
        name: 'Thor',
        img: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/1/13/Thor-EndgameProfile.jpg/revision/latest/scale-to-width-down/180?cb=20190423174911',
    },
    {
        name: 'Hulk',
        img: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/a/a4/ProfHulkAvengersEndgamelicensingart001.jpg/revision/latest/scale-to-width-down/180?cb=20190506122658',
    },

    {
        name: 'Hawkeye',
        img: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/0/08/HawkeyeRonin-EndgameProfile.jpg/revision/latest/scale-to-width-down/180?cb=20190423175147',
    },
    {
        name: 'Capitain Marvel',
        img: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/f/fe/CapMarvel-EndgameProfile.jpeg/revision/latest/scale-to-width-down/180?cb=20190423175247',
    },
    {
        name: 'Ant-Man',
        img: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/e/ea/AntMan-EndgameProfile.jpg/revision/latest/scale-to-width-down/180?cb=20190423175007',
    },
    {
        name: 'Scarlet Witch',
        img: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/3/39/Scarlet_Witch_AIW_Profile.jpg/revision/latest/scale-to-width-down/180?cb=20180518212455',
    },
    {
        name: 'Rocket Racoon',
        img: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/3/34/Rocket-EndgameProfile.jpg/revision/latest/scale-to-width-down/180?cb=20190423175032',
    },
    {
        name: 'Vision',
        img: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/2/2f/Vision_AIW_Profile.jpg/revision/latest/scale-to-width-down/180?cb=20180518212532',
    },
]

var gameGrid = [];
var gameGridLevel = [];

// This function selects the cards, create the array according to the level of game and duplicate the cards and 
// them to be appended on the HTML.
function levelSelection() {
    if (document.getElementById('easy').checked == true) {
        for (var i = 0; i < 6; i++) {
            gameGrid.push(cardsArray[i])
        }
        gameGridLevel = gameGrid.concat(gameGrid).sort(function () {
            return 0.5 - Math.random();
        })
        grid.setAttribute('class', 'gridEasy');
        game.appendChild(grid);
    } else if (document.getElementById('medium').checked == true) {
        for (var i = 0; i < 9; i++) {
            gameGrid.push(cardsArray[i])
        }
        gameGridLevel = gameGrid.concat(gameGrid).sort(function () {
            return 0.5 - Math.random();
        })
        grid.setAttribute('class', 'gridMedium');
        game.appendChild(grid);
    } else if (document.getElementById('endGame').checked == true) {
        for (var i = 0; i < 12; i++) {
            gameGrid.push(cardsArray[i])
        }
        gameGridLevel = gameGrid.concat(gameGrid).sort(function () {
            return 0.5 - Math.random();
        })
        grid.setAttribute('class', 'gridEndGame');
        game.appendChild(grid);
    } else {
        for (var i = 0; i < 6; i++) {
            gameGrid.push(cardsArray[i])
        }
        gameGridLevel = gameGrid.concat(gameGrid).sort(function () {
            return 0.5 - Math.random();
        })
        grid.setAttribute('class', 'gridEasy');
        game.appendChild(grid);
    }
}


var count = 0
var counter = 0
var counterMisses = 0
var firstGuess = ''
var secondGuess = ''
var delay = 1000
var previousTarget = null
var levelBtn = document.getElementById('levelBtn')
var newGame = document.getElementById('newGame')
var newGameModal = document.getElementById('newGameModal')
var firstPage = document.getElementById('firstPage')
var easy = document.getElementById('easy')
var medium = document.getElementById('medium')
var endGame = document.getElementById('endGame')
var missedMoves = document.querySelector('.misses')
var missesTotal = document.getElementById('missesTotal')
var gameGrid = [];
var gameGridLevel = [];
var level;
var game = document.getElementById('game');
var grid = document.createElement('section');



function changePage() {
    firstPage.classList.add('hidePage');
    game.classList.remove('hidePage');
}


function newGameStart() {
    createGrid();
    changePage();
}

function restartGame() {
    window.location.reload();
}


levelBtn.addEventListener('click', newGameStart)
newGame.addEventListener('click', restartGame)
newGameModal.addEventListener('click', restartGame)

function createGrid() {
    levelSelection();
    gameGridLevel.forEach(item => {

        var name = item.name,
            img = item.img;

        var card = document.createElement('div')
        card.classList.add('card')
        card.dataset.name = name

        var front = document.createElement('div')
        front.classList.add('front')

        var back = document.createElement('div')
        back.classList.add('back')
        back.style.backgroundImage = `url(${img})`

        grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
    })
}

// This function works adding the match class to the cards that match in a round. With this the cards will change to
// display none and not appear on the page anymore.
const match = () => {
    var selected = document.querySelectorAll('.selected')
    selected.forEach(function (card) {
        card.classList.add('match');
    });
};

// A function to reset the guesses, so would validate correctly round by round only being possible to click in two cards
// and remove the selected class, so the cards will return to facedown.
var resetGuesses = function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    selected.forEach(function (card) {
        card.classList.remove('selected');
    });
};


//This event listeners will catch the clicks on each carda and inside of the dunction will validate the matching of cards
// and count how many misses the user has.

grid.addEventListener('click', function (event) {

    var clicked = event.target;

    if (clicked.nodeName === 'SECTION'
        || clicked === previousTarget
        || clicked.parentNode.classList.contains('selected')
        || clicked.parentNode.classList.contains('match')
    ) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            console.log(firstGuess);
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            console.log(secondGuess);
            clicked.parentNode.classList.add('selected');
        }

        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
                counter += 1;
                modalWin()
            } else {
                counterMisses += 1
                missedMoves.innerHTML = counterMisses;
                missesTotal.innerHTML = counterMisses;
                setTimeout(resetGuesses, delay);
            }
        }
        previousTarget = clicked;
    }
});



var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];



function modalWin() {
    if (document.getElementById('easy').checked == true) {
        if (counter === 6) {
            modal.style.display = "block";
        }
    } else if (document.getElementById('medium').checked == true) {
        if (counter === 9) {
            modal.style.display = "block";
        }
    } else if (document.getElementById('endGame').checked == true) {
        if (counter === 12) {
            modal.style.display = "block";
        }
    } else {
        if (counter === 6) {
            modal.style.display = "block";
        }
    }
}


span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}