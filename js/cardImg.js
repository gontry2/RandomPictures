const cardsView = document.getElementById("js-cards__view");
const goBeforePage = document.getElementById("js-goBeforePage");
const goAfterPage = document.getElementById("js-goAfterPage");

const IMG_NUMBER = 12;
const num = getParameterByName("num");
var cards = [];
var totalCards = new Array();
var numberOfpages = 0;
var seriesNum = 0;
var imgOrText = false;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/words/${imgNumber + 1}.jpg`;
    console.log(image.src);
    image.classList.add("cardImage");
    cardsView.appendChild(image);
}

function paintImageMeaning(imgNumber) {
    const image = new Image();
    image.src = `images/words/${imgNumber + 1}_m.jpg`;
    console.log(image.src);
    image.classList.add("cardImage");
    cardsView.appendChild(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function sameNum(n) {
    var i = 0;
    while (i <= numberOfpages) {
        for (var j = 0; j <= totalCards[i].length; j++) {
            if (parseInt(totalCards[i][j]) === n) {
                return true;
            }
        }
        i++;
    }
    return false;
}

function removeChildren() {
    cards = [];
    var len = cardsView.children.length;
    while (len !== 0) {
        cardsView.removeChild(document.getElementsByClassName("cardImage")[--len]);
    }
}

function showCards() {
    totalCards[numberOfpages] = new Array();
    if (num == 0) {
        paintImage(seriesNum);
    } else {
        while (totalCards[numberOfpages].length < num) {
            const randomNumber = genRandom();
            if (!sameNum(randomNumber)) {
                paintImage(randomNumber);
                totalCards[numberOfpages].push(randomNumber);
            }
        }
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

goAfterPage.onclick = function() {
    numberOfpages++;
    if (numberOfpages === IMG_NUMBER / num || seriesNum == IMG_NUMBER - 1) {
        numberOfpages--;
        alert("마지막장 입니다.");
    } else {
        removeChildren();
        if (num == 0) {
            numberOfpages++;
            paintImage(++seriesNum);
        } else if (totalCards[numberOfpages] === undefined) {
            showCards();
        } else {
            var i = 0;
            while (i < totalCards[numberOfpages].length) {
                paintImage(parseInt(totalCards[numberOfpages][i]));
                i++;
            }
        }
    }
};

goBeforePage.onclick = function() {
    numberOfpages--;
    if (numberOfpages <= 0) {
        alert("제일 첫번째 장입니다.");
        numberOfpages++;
    } else {
        removeChildren();
        if (num == 0) {
            numberOfpages--;
            paintImage(--seriesNum);
        } else {
            var i = 0;
            while (i < totalCards[numberOfpages].length) {
                paintImage(parseInt(totalCards[numberOfpages][i]));
                i++;
            }
        }
    }
};

cardsView.onclick = function() {
    removeChildren();
    if (!imgOrText) {
        if (totalCards[numberOfpages] !== undefined) {
            paintImageMeaning(parseInt(totalCards[numberOfpages]));
        } else {
            paintImageMeaning(seriesNum);
        }
        imgOrText = true;
    } else {
        if (totalCards[numberOfpages] !== undefined) {
            paintImage(parseInt(totalCards[numberOfpages]));
        } else {
            paintImage(seriesNum);
        }
        imgOrText = false;
    }
};

function init() {
    showCards();
}

init();