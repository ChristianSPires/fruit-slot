const symbols = [
  "bar",
  "cherry",
  "lemon",
  "watermelon",
  "apple",
  "grape",
  "orange",
  "banana",
];

const symbolWeights = [500, 4, 6, 6, 6, 8, 8, 8];

const payTable = {
  bar: 100,
  cherry: 50,
  lemon: 25,
  watermelon: 20,
  apple: 15,
  grape: 10,
  orange: 10,
  banana: 10,
};

const imagePaths = {
  bar: "./assets/symbols/bar.png",
  cherry: "./assets/symbols/cherry.png",
  lemon: "./assets/symbols/lemon.png",
  watermelon: "./assets/symbols/watermelon.png",
  apple: "./assets/symbols/apple.png",
  grape: "./assets/symbols/grape.png",
  orange: "./assets/symbols/orange.png",
  banana: "./assets/symbols/banana.png",
};

const spinDuration = 3000;
const spinInterval = 100;

let spinning = false;

function spinColumns() {
  const columns = document.querySelectorAll(".columnSlotMachine");
  const startButton = document.getElementById("startButton");
  let startTime;
  let currentTime = 0;

  function animate() {
    if (!startTime) {
      startTime = currentTime = performance.now();
    }

    const elapsed = currentTime - startTime;

    if (elapsed < spinDuration) {
      columns.forEach((column) => {
        const randomSymbol = symbols[weightedRandomIndex(symbolWeights)];

        const imagePath = `./assets/symbols/${randomSymbol.toLowerCase()}.png`;
        const imgElement = column.querySelector("img");

        if (imgElement && imagePath) {
          imgElement.src = imagePath;
          imgElement.style.width = "100%";
        } else {
          console.error("Erro ao definir a imagem na coluna.");
        }
      });

      const spinAudio = document.getElementById("spinAudio");
      spinAudio.play();

      currentTime = performance.now();
    } else {
      clearInterval(spinIntervalId);

      document.getElementById("winMessage").textContent = "GOOD LUCK";
 
      updateBalance();
  
      checkWin();

      spinning = false;

      startButton.classList.remove("disabled");
      startButton.onclick = play;
    }
  }

  const spinIntervalId = setInterval(animate, spinInterval);

  spinning = true;

  startButton.classList.add("disabled");
  startButton.onclick = null;
}

function weightedRandomIndex(weights) {
  const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < weights.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return i;
    }
  }

  return weights.length - 1;
}

let balance = 100;
let winnings = 0;

function updateBalance() {
  const balanceElement = document
    .getElementById("titleTop")
    .getElementsByTagName("span")[0];
  balanceElement.textContent = "Balance: " + balance;
}

function updateWinnings() {
  const winningsElement = document
    .getElementById("titleTop")
    .getElementsByTagName("span")[1];
  winningsElement.textContent = "Winnings: " + winnings;
  const winAudio = document.getElementById("winAudio");
  winAudio.play();
}

function checkWin() {
  const symbolsInColumns = [
    document.getElementById("symbol1").src,
    document.getElementById("symbol2").src,
    document.getElementById("symbol3").src,
  ];

  const uniqueSymbols = new Set(symbolsInColumns);

  if (uniqueSymbols.size === 1) {
    const symbol = symbolsInColumns[0]
      .split("/")
      .pop()
      .split(".")[0]
      .toLowerCase()
      .trim();

    const winAmount = payTable[symbol.toLowerCase()];

    balance += winAmount;
    winnings += winAmount;

    updateBalance();
    updateWinnings();

    const winMessage = document.getElementById("winMessage");
    winMessage.textContent = `3 ${
      symbol.charAt(0).toUpperCase() + symbol.slice(1)
    } = ${winAmount}`;

    const winLine = document.getElementById("winline");
    winLine.style.display = "block";
  }
}

function play() {
  if (spinning) {
    return;
  }

  if (balance >= 10) {
    balance -= 10;

    updateBalance()

    document.getElementById("winline").style.display = "none";

    const playAudio = document.getElementById("playAudio");
    playAudio.play();

    spinColumns();
  } else {
    alert("Not enough balance to play. Please add funds.");
  }
}

window.onload = function () {
  updateBalance();
};
