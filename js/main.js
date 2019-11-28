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
]




var gameGrid = cardsArray.concat(cardsArray).sort(function () {
    return 0.5 - Math.random();
});

var count = 0
var counter = 0
var counterMisses = 0
var firstGuess = ''
var secondGuess = ''
var delay = 1000
var previousTarget = null

var game = document.getElementById('game')
var grid = document.createElement('section')
grid.setAttribute('class', 'grid')
game.appendChild(grid)


var newGame = document.getElementById('newGame')
var newGameModal = document.getElementById('newGameModal')

gameGrid.forEach(item => {

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
});

const match = () => {
    var selected = document.querySelectorAll('.selected')
    selected.forEach(function (card) {
        card.classList.add('match');
    });
};

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
                counter += 1;
                modalWin();
            }
            setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
    }
});

function newGameStart() {
    window.location.reload()
}

newGame.addEventListener('click', newGameStart)
newGameModal.addEventListener('click', newGameStart)

var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];


function modalWin() {
    if (counter === 6) {
        modal.style.display = "block";
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

