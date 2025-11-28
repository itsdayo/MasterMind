var theCanvas;
var theCanvasOffset;
var g2D;
var mX, mY;
var bwidth = 800;
var bheight = 1500;
var backgroundImage = new Image();
var image = new Image();
var Turns = new Image();
var blue = new Image();
var resetButton = new Image();
var undoButton = new Image();
var undoX = 618,
  undoY = 50;
var row1Y = bheight - 720,
  row2Y = bheight - 640,
  row3Y = bheight - 560;
var row4Y = bheight - 480,
  row5Y = bheight - 300,
  row6Y = bheight - 320;
var row7Y = bheight - 240;
(row8Y = bheight - 160), (row9Y = bheight - 80);
var row10Y = bheight - 5;
var game;

function getMouseXY(e) {
  const rect = theCanvas.getBoundingClientRect();
  const scaleX = theCanvas.width / rect.width;
  const scaleY = theCanvas.height / rect.height;

  mX = (e.clientX - rect.left) * scaleX;
  mY = (e.clientY - rect.top) * scaleY;
  if (mX < 0) {
    mX = 0;
  } else if (mX > theCanvas.width) {
    mX = theCanvas.width;
  }
  if (mY < 0) {
    mY = 0;
  } else if (mY > theCanvas.height) {
    mY = theCanvas.height;
  }
} //getMouseXY

function drawDisk(cX, cY, radius) {
  g2D.beginPath();
  g2D.arc(cX, cY, radius, 0, Math.PI * 2);
  g2D.closePath();
  g2D.fill();
} //drawDisk

function plotCircle(row, col, fillColor) {
  g2D.beginPath();
  g2D.arc(col * 19 + 710, row * 45 + 139, 6, 0, Math.PI * 2);
  g2D.fillStyle = fillColor;
  g2D.fill();
  g2D.lineWidth = 5;
  g2D.strokeStyle = "#003300";
} //plotCircle

function setPenColor(color) {
  g2D.strokeStyle = color;
}
function setFillColor(color) {
  g2D.fillStyle = color;
}

function setPenSize(size) {
  g2D.lineWidth = size;
}
function drawSquare(cX, cY, size) {
  g2D.beginPath();
  g2D.rect(cX - size / 2, cY - size / 2, size, size);
  g2D.closePath();
  g2D.stroke();
}

function plotSquare(cX, cY, size) {
  g2D.beginPath();
  g2D.rect(cX - size / 2, cY - size / 2, size, size);
  g2D.closePath();
  g2D.fill();
}

function drawColorButton(cX, cY, size, fillColor) {
  setFillColor(fillColor);
  plotSquare(cX, cY, size);
  setPenColor("black");
  setPenSize(3);
  drawSquare(cX, cY, size);
}

function clearCanvas() {
  g2D.clearRect(0, 0, theCanvas.width, theCanvas.height);
  g2D.drawImage(backgroundImage, 0, 0, theCanvas.width, theCanvas.height);
} //clearCanvas

this.inResetButton = inResetButton;
function inResetButton(a, b) {
  a -= 50;
  b -= 22.5;
  //   var c = document.getElementById('myCanvas');
  //   var ctx = c.getContext('2d');
  //   ctx.beginPath();
  //   ctx.rect(Math.abs(undoX - a), Math.abs(undoY - b), 150, 100);
  //   ctx.stroke();
  return Math.abs(30 - a) < 48 && Math.abs(50 - b) < 24;
} // inResetButton

this.inUndoButton = inUndoButton;
function inUndoButton(x, y) {
  //   if (Math.abs(554 - x) < 48 && Math.abs(undoY + 22 - y) < 24) {
  //     alert('undo');
  //   }
  // Hit test matches g2D.drawImage(undoButton, undoX, undoY, 120, 60);
  return x >= undoX && x <= undoX + 120 && y >= undoY && y <= undoY + 60;
} //inUndoButton

// Get canvas position relative to page
function getCanvasPosition() {
  const canvas = document.getElementById("myCanvas");
  const rect = canvas.getBoundingClientRect();
  return {
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset,
  };
}

// Color button hit detection functions
// Note: Order must match the drawColorButton calls in drawButtons()
function inBlueColorButton(x, y) {
  return Math.abs(x - 240) < 25 && Math.abs(y - 80) < 25;
}

function inRedColorButton(x, y) {
  return Math.abs(x - 300) < 25 && Math.abs(y - 80) < 25;
}

function inGreenColorButton(x, y) {
  return Math.abs(x - 360) < 25 && Math.abs(y - 80) < 25;
}

function inYellowColorButton(x, y) {
  return Math.abs(x - 420) < 25 && Math.abs(y - 80) < 25;
}

function inPurpleColorButton(x, y) {
  return Math.abs(x - 480) < 25 && Math.abs(y - 80) < 25;
}

function inWhiteColorButton(x, y) {
  return Math.abs(x - 540) < 25 && Math.abs(y - 80) < 25;
}

function drawButtons() {
  g2D.drawImage(resetButton, 30, 50, 120, 60);
  g2D.drawImage(undoButton, undoX, undoY, 120, 60);

  drawColorButton(240, 80, 50, "blue");
  drawColorButton(300, 80, 50, "red");
  drawColorButton(360, 80, 50, "green");
  drawColorButton(420, 80, 50, "yellow");
  drawColorButton(480, 80, 50, "purple");
  drawColorButton(540, 80, 50, "white");
  game.drawTurns(10);
} //drawButtons

function doPaintCanvas() {
  clearCanvas();
  drawButtons(false);
} // doPaintCanvas

function doStart() {
  backgroundImage.src = "images/woodback.png";
  undoButton.src = "images/undo.png";
  resetButton.src = "images/reset.png";
  Turns.src = "images/turnRec.png";

  function MasterMindGame(maxTurns) {
    this.currentRow = 0;
    this.currentRowColors = ["", "", "", ""];
    this.currentColumn = 0;
    this.maxTurns = maxTurns;
    this.board = new Array();

    this.rowBoard = new Array();
    this.colors = ["red", "green", "blue", "yellow", "purple", "white"];
    this.hiddenList = [0, 0, 0, 0];
    this.currentPegs = ["black", "black", "black", "black"];
    this.boardPegs = new Array();
    this.drawnRow = 0;
    this.rowColors = ["", "", "", ""];

    this.generateHiddenList = generateHiddenList;
    function generateHiddenList() {
      var i;
      for (i = 0; i < 4; i++) {
        var c = Math.round(Math.random() * 1000);
        this.hiddenList[i] = c % 6;
      }

      for (i = 0; i < 4; i++) {
        if (this.hiddenList[i] === 0) {
          this.hiddenList[i] = "blue";
        }
        if (this.hiddenList[i] === 1) {
          this.hiddenList[i] = "red";
        }
        if (this.hiddenList[i] === 2) {
          this.hiddenList[i] = "green";
        }
        if (this.hiddenList[i] === 3) {
          this.hiddenList[i] = "yellow";
        }
        if (this.hiddenList[i] === 4) {
          this.hiddenList[i] = "purple";
        }
        if (this.hiddenList[i] === 5) {
          this.hiddenList[i] = "white";
        }
      }

      // this.hiddenList = ['yellow', 'purple', 'yellow', 'purple'];
      console.log(this.hiddenList);
    } // generateHiddenList

    this.drawTurns = drawTurns;
    function drawTurns(n) {
      var i;
      for (i = 0; i < n; i++) {
        g2D.drawImage(Turns, 50, 150 + 45 * i, 1000, 100);
      }
      for (r = 0; r <= this.currentRow; r++) {
        this.drawnRow = r;
        this.drawRow(r);
      }
    } //drawTurns

    this.setCellColor = setCellColor;
    function setCellColor(color) {
      this.board[this.currentRow] = this.currentRowColors;
      this.currentRowColors[this.currentColumn] = color;
      this.currentColumn = this.currentColumn + 1;

      if (this.currentColumn === 4) {
        this.checkGuess();

        this.currentColumn = 0;
        this.currentRow = this.currentRow + 1;
        this.currentRowColors = ["", "", "", ""];
        this.board[this.currentRow] = this.currentRowColors;
      }
    } //setCellColor

    this.drawRow = drawRow;
    function drawRow(row) {
      if (this.board[row] != undefined) {
        this.rowColors = this.board[row];
      }

      for (var i = 0; i < 4; i++) {
        var c = this.rowColors[i];
        if (c != "") {
          setFillColor(c);
          drawDisk(140 + 167 * i, 185 + 45 * row, 10);
        }
      }

      //   var pegColors = this.boardPegs[row];
      //   for (var i = 0; i < 4; i++) {
      //     var c = pegColors[i];
      //     alert('Peg: ' + c);
      //     if (c != '') {
      //       setFillColor(c);
      //       drawDisk(750 + 130 * i, 150 + 65 * row, 6);
      //     }
      //   }
    } //drawRow

    this.drawUndoRow = drawUndoRow;
    function drawUndoRow() {
      if (this.currentColumn === 0) {
        return;
      }

      this.currentColumn = this.currentColumn - 1;
      this.currentRowColors[this.currentColumn] = "";
      this.board[this.currentRow] = this.currentRowColors;
    } //drawUndoRow
    this.resetColors = resetColors;
    function resetColors() {
      this.board[this.currentRow] = this.currentRowColors;
      this.currentRow = 0;
      this.currentColumn = 0;
      this.currentRowColors = ["", "", "", ""];
      this.rowColors = ["", "", "", ""];
      this.board = [];
      this.boardPegs = [];
      this.generateHiddenList();
      // this.drawRow(0);
    } //resetBoard

    this.checkGuess = checkGuess;
    function checkGuess() {
      // Standard MasterMind feedback:
      // - red: correct color in correct position
      // - white: correct color in wrong position (no double-counting)
      // - black: color not in solution

      var solution = this.hiddenList;
      var guess = this.currentRowColors;

      var solutionCopy = solution.slice();
      var guessCopy = guess.slice();
      var pegs = [];

      // First pass: reds (exact matches)
      for (var i = 0; i < 4; i++) {
        if (guessCopy[i] === solutionCopy[i]) {
          pegs.push("red");
          guessCopy[i] = null;
          solutionCopy[i] = null;
        }
      }

      // Second pass: whites (right color, wrong position), with duplicate handling
      for (var i = 0; i < 4; i++) {
        if (guessCopy[i] != null) {
          for (var j = 0; j < 4; j++) {
            if (solutionCopy[j] != null && guessCopy[i] === solutionCopy[j]) {
              pegs.push("white");
              solutionCopy[j] = null;
              break;
            }
          }
        }
      }

      // Fill remaining with black
      while (pegs.length < 4) {
        pegs.push("black");
      }

      // Sort so reds first, then whites, then blacks
      pegs.sort(function (a, b) {
        function pegValue(c) {
          if (c === "red") return 0;
          if (c === "white") return 1;
          return 2;
        }
        return pegValue(a) - pegValue(b);
      });

      this.currentPegs = pegs;
      this.boardPegs[this.currentRow] = this.currentPegs;

      drawPegs(this.boardPegs, this.currentRow + 1, this.hiddenList);
    } //checkGuess

    this.Pegs = drawPegs;
    function drawPegs(pegs, n, solution) {
      var pegColors = pegs[n - 1];

      var i;
      for (i = 1; i < pegColors.length + 1; i++) {
        plotCircle(n, i, pegColors[i - 1]);
      }

      if (
        pegColors[0] === "red" &&
        pegColors[1] === "red" &&
        pegColors[2] === "red" &&
        pegColors[3] === "red"
      ) {
        console.log("won");
        alert("You win! the colors were" + " " + solution);
        return;
      }
      if (n === 10) {
        console.log("lost");
        alert("Sorry you lose! The colors were" + " " + solution);
      }
    } //drawPegs
  } // MasterMindGame

  game = new MasterMindGame(10);
  game.generateHiddenList();

  theCanvas = document.getElementById("myCanvas");
  theCanvasOffset = $("#myCanvas").offset();
  g2D = theCanvas.getContext("2d");
  $("#myCanvas").attr("style", "border: 7px solid;");

  $("#myCanvas").mouseenter(function (e) {
    getMouseXY(e);
  });

  $("#myCanvas").mousedown(function (e) {
    getMouseXY(e);

    if (inBlueColorButton(mX, mY)) {
      game.setCellColor("blue");
    } else if (inRedColorButton(mX, mY)) {
      game.setCellColor("red");
    } else if (inGreenColorButton(mX, mY)) {
      game.setCellColor("green");
    } else if (inYellowColorButton(mX, mY)) {
      game.setCellColor("yellow");
    } else if (inPurpleColorButton(mX, mY)) {
      game.setCellColor("purple");
    } else if (inWhiteColorButton(mX, mY)) {
      game.setCellColor("white");
      // game.checkGuess();
    } else if (inUndoButton(mX, mY)) {
      game.drawUndoRow();

      //game.
    } else if (inResetButton(mX, mY)) {
      game.resetColors();
      doPaintCanvas();
      //game.
    }
    drawButtons();
    //checkGuess();
  }); //mousedown

  $("#myCanvas").mousemove(function (e) {
    getMouseXY(e);
  });

  $("#myCanvas").mouseup(function (e) {});

  backgroundImage.onload = function () {
    doPaintCanvas();
  };
  doPaintCanvas();
} //doStart

$(document).ready(function () {
  doStart();
});
