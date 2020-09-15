const userHandElement = document.getElementById("userHand");
const pcHandElement = document.getElementById("pcHand");
const userPoints = document.getElementById("userPoints");
const pcPoints = document.getElementById("pcPoints");
const btnNewGame = document.getElementById("btnNewGame");
const btnFish = document.getElementById("btnFish");
const btnStay = document.getElementById("btnStay");
const winnerSection = document.getElementById("winnerSection");
const descriptionHeader = document.getElementById("descriptionHeader");
const winnerTitle = document.getElementById("winnerTitle");
const newGameModalBtn = document.getElementById("newGameModalBtn");
const backBtn = document.getElementById("backBtn");
const btnHelp = document.getElementById("btnHelp");
const helpSection = document.getElementById("helpSection");
const inputUserPoints = document.getElementById("inputUserPoints");
const inputPCPoints = document.getElementById("inputPCPoints");
const gamesWonSection = document.getElementById("games");
const aceSection = document.getElementById("aceSection");
const aceBtn1 = document.getElementById("aceBtn1");
const aceBtn11 = document.getElementById("aceBtn11");
const currentScore = document.getElementById("currentScore");
const introSection = document.getElementById("introSection");
const baseDeck = [];
let initialCards = 3, pcScore = 0, userScore = 0, value, gamesWon = 0, userHand = [], pcHand = [], aceCall;

class Card {
    constructor(id, value, bgImage) {
        this._id = id;
        this._value = value;
        this._bgImage = bgImage;
    }
    get id() {
        return this._id;
    }
    get value() {
        return this._value;
    }
    get bgImage() {
        return this._bgImage;
    }
    get state() {
        return this._state;
    }
    createHTML() {
        let cardHTML = `<figure id="${this._id}" class="cardContainer">
        <img class="back" src="${this._bgImage}" alt="${this._id}">
        <img class="front" src="img/back1.jpg" alt="Card">
        </figure>`;
        return cardHTML;
    }
}
class Deck {
    constructor() {
        this._deck = [];
        baseDeck.forEach(element => {
            this._deck.push(element);
        });
        shuffle(this._deck);
    }
    get deck() {
        return this._deck;
    }
    lastCardValue() {
        let lastCardValue = this._deck[(this._deck.length) - 1].value;
        return lastCardValue;
    }
    getLastCard() {
        let lastCard = this._deck.pop();
        return lastCard;
    }
}
function buildBaseDeck() {
    const suit = ["spade", "heart", "diamond", "club"];
    const suitValues = [2, 3, 4, 5, 6, 7, 8, 9, "Jack", "Queen", "King", "Ace"];
    let i = 0, j = 0, value = 0;
    for (i; i < suit.length; i++) {
        for (j = 0; j < suitValues.length; j++) {
            value = j + 2;
            if (j > 7) {
                value = 10;
            }
            if (j === suitValues.length - 1) {
                value = 11;
            }
            let card = new Card(suit[i] + suitValues[j], value, `img/${suit[i] + suitValues[j]}.jpg`);
            baseDeck.push(card);
        }
    }
}
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

buildBaseDeck();


introSection.classList.add("visibleElement");
setTimeout(function(){
    newGame();
    introSection.classList.remove("visibleElement");
}, 3000);


function newGame() {
    pcScore = 0, userScore = 0, value = true, userHand = [], pcHand = [];
    deck = new Deck();
    userHandElement.innerHTML = "";
    pcHandElement.innerHTML = "";
    userPoints.innerText = `Puntos Totales: 0`;
    pcPoints.innerText = `Puntos Totales: ?`;
    gamesWonSection.innerText = `Juegos Ganados: ${gamesWon}`;
    btnNewGame.removeAttribute("disabled");
    btnFish.removeAttribute("disabled");
    btnStay.removeAttribute("disabled");
    service(initialCards);
}

function service(initialCards) {
    for (let i = 0; i < initialCards; i++) {
        var card = deck.getLastCard();
        if (card.value === 11) {
            aceCall = setTimeout(function () {
                currentScore.value = userScore;
                aceSection.classList.add("visibleElement");
            }, 2000);
            btnFish.setAttribute("disabled", "");
            btnStay.setAttribute("disabled", "");
            btnNewGame.setAttribute("disabled", "");
        }
        else {
            userScore += card.value;
        }
        userHand.push(card);
        userHandElement.innerHTML += card.createHTML();
    }
    for (let i = 0; i < initialCards; i++) {
        setTimeout(function () {
            let element = document.getElementById(userHand[i].id);
            element.classList.add("figureReverse");
        }, 1000);
        var card = deck.getLastCard();
        pcHand.push(card);
        pcHandElement.innerHTML += card.createHTML();
        pcScore += card.value;
    }
    userPoints.innerText = `Puntos Totales: ${userScore}`;
    //pcPoints.innerText = `Puntos Totales: ${pcScore}`;
    scoreCounter(value);
}

//Buttons
btnFish.addEventListener("click", function () {
    var card = deck.getLastCard();

    if (card.value === 11) {
        setTimeout(function () {
            currentScore.value = userScore;
            aceSection.classList.add("visibleElement");
        }, 2000);
        btnFish.setAttribute("disabled", "");
        btnStay.setAttribute("disabled", "");
        btnNewGame.setAttribute("disabled", "");
    } else {
        userScore += card.value;
    }
    userHand.push(card);
    userHandElement.innerHTML += card.createHTML();
    setTimeout(function () {
        let element = document.getElementById(userHand[userHand.length - 1].id);
        element.classList.add("figureReverse");
        userPoints.innerText = `Puntos Totales: ${userScore}`;
        scoreCounter(value);
    }, 500);
});
btnStay.addEventListener("click", function () {
    btnFish.setAttribute("disabled", "");
    value = false;
    do {
        if (deck.lastCardValue() + pcScore > 31) {
            break;
        }
        else {
            var card = deck.getLastCard();
            pcHand.push(card);
            pcHandElement.innerHTML += card.createHTML();
            pcScore += card.value;
        }
    } while (1);

    scoreCounter(value);
});
btnNewGame.addEventListener("click", function () {
    setTimeout(function () {
        newGame();
    }, 1000);
});
newGameModalBtn.addEventListener("click", function () {
    winnerSection.classList.remove("visibleElement");
    setTimeout(function () {
        newGame();
    }, 1000);
});
btnHelp.addEventListener("click", function () {
    helpSection.classList.add("visibleElement");
});
backBtn.addEventListener("click", function () {
    helpSection.classList.remove("visibleElement");
});
aceBtn1.addEventListener("click", function () {
    userScore++;
    userPoints.innerText = `Puntos Totales: ${userScore}`;
    btnNewGame.removeAttribute("disabled");
    btnFish.removeAttribute("disabled");
    btnStay.removeAttribute("disabled");
    aceSection.classList.remove("visibleElement");
    scoreCounter(value);
});
aceBtn11.addEventListener("click", function () {
    userScore += 11;
    userPoints.innerText = `Puntos Totales: ${userScore}`;
    btnNewGame.removeAttribute("disabled");
    btnFish.removeAttribute("disabled");
    btnStay.removeAttribute("disabled");
    aceSection.classList.remove("visibleElement");
    scoreCounter(value);
});


function scoreCounter(value) {
    do {
        if (userScore === 31 && pcScore === 31) {
            printResult("¡Imposible!", "¡¡Es un Empate de 31!!");
        }
        else if (userScore > 31 && pcScore > 31) {
            printResult("¡Vaya!", "Parece que nadie tuvo suerte");
        }
        else if (userScore >= 31) {
            if (userScore === 31) {
                printResult("Cuanta Suerte", "¡Has Ganado!");
                gamesWon++;
            } else {
                printResult("Vaya, Sobrepasaste 31", "¡Has Perdido!");
            }
        }
        else if (pcScore >= 31) {
            clearTimeout(aceCall);
            if (pcScore === 31) {
                printResult("Mira esa suerte", "¡PC ha Ganado!");
            } else {
                printResult("¡Vaya! PC Sobrepasó 31 puntos y perdió", "¡Has Ganado!");
                gamesWon++;
            }
        }
        else if (userScore > pcScore) {
            if (value) {
                break;
            }
            printResult("Por Mayoria de puntos", "¡Has Ganado!");
            gamesWon++;
        }
        else if (userScore < pcScore) {
            if (value) {
                break;
            }
            printResult("Por Mayoria de puntos", "¡PC ha Ganado!");
        }
        else {
            if (value) {
                break;
            }
            printResult("¡Increible!", "Es un empate");
        }
    } while (0);
}

function printResult(text1, text2) {
    pcPoints.innerText = `Puntos Totales: ${pcScore}`;
    btnNewGame.setAttribute("disabled", "");
    btnFish.setAttribute("disabled", "");
    btnStay.setAttribute("disabled", "");
    setTimeout(function () {
        for (let i = 0; i < pcHand.length; i++) {
            let element = document.getElementById(pcHand[i].id);
            element.classList.add("figureReverse");
        }
    }, 1000);
    setTimeout(function () {
        descriptionHeader.innerText = text1;
        winnerTitle.innerText = text2;
        inputUserPoints.value = userScore;
        inputPCPoints.value = pcScore;
        winnerSection.classList.add("visibleElement");
    }, 4000);
}