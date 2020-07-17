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
  mX = e.pageX - theCanvasOffset.left;
  mY = e.pageY - theCanvasOffset.top;
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
  g2D.strokeStyle = '#003300';
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
  setPenColor('black');
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
  x -= 50;
  y -= 22.5;

  //   if (Math.abs(554 - x) < 48 && Math.abs(undoY + 22 - y) < 24) {
  //     alert('undo');
  //   }
  return Math.abs(554 - x) < 47 && Math.abs(undoY + 22 - y) < 25;
} //inUndoButton

function inBlueColorButton(x, y) {
  if (Math.abs(x - 218) < 23 && Math.abs(y - 80) < 25) {
    return true;
  } else {
    return false;
  }
}
function inRedColorButton(x, y) {
  if (Math.abs(x - 273) < 23 && Math.abs(y - 80) < 25) {
    return true;
  } else {
    return false;
  }
}
function inGreenColorButton(x, y) {
  if (Math.abs(x - 327) < 23 && Math.abs(y - 80) < 25) {
    return true;
  } else {
    return false;
  }
}
function inYellowColorButton(x, y) {
  if (Math.abs(x - 382) < 23 && Math.abs(y - 80) < 25) {
    return true;
  } else {
    return false;
  }
}
function inPurpleColorButton(x, y) {
  if (Math.abs(x - 437) < 23 && Math.abs(y - 80) < 25) {
    return true;
  } else {
    return false;
  }
}
function inWhiteColorButton(x, y) {
  if (Math.abs(x - 492) < 23 && Math.abs(y - 80) < 20) {
    return true;
  } else {
    return false;
  }
}

function drawButtons() {
  g2D.drawImage(resetButton, 30, 50, 120, 60);
  g2D.drawImage(undoButton, undoX, undoY, 120, 60);

  drawColorButton(240, 80, 50, 'blue');
  drawColorButton(300, 80, 50, 'red');
  drawColorButton(360, 80, 50, 'green');
  drawColorButton(420, 80, 50, 'yellow');
  drawColorButton(480, 80, 50, 'purple');
  drawColorButton(540, 80, 50, 'white');
  game.drawTurns(10);
} //drawButtons

function doPaintCanvas() {
  clearCanvas();
  drawButtons(false);
} // doPaintCanvas

function doStart() {
  backgroundImage.src = 'images/woodback.png';
  undoButton.src = 'images/undo.png';
  resetButton.src = 'images/reset.png';
  Turns.src = 'images/turnRec.png';

  function MasterMindGame(maxTurns) {
    this.currentRow = 0;
    this.currentRowColors = ['', '', '', ''];
    this.currentColumn = 0;
    this.maxTurns = maxTurns;
    this.board = new Array();
    this.rowBoard = new Array();
    this.colors = ['red', 'green', 'blue', 'yellow', 'purple', 'white'];
    this.hiddenList = [0, 0, 0, 0];
    this.currentPegs = ['black', 'black', 'black', 'black'];
    this.boardPegs = new Array();
    this.drawnRow = 0;
    this.rowColors = ['', '', '', ''];

    this.generateHiddenList = generateHiddenList;
    function generateHiddenList() {
      var i;
      for (i = 0; i < 4; i++) {
        var c = Math.round(Math.random() * 1000);
        this.hiddenList[i] = c % 6;
      }
      this.hiddenList = [1, 2, 3, 4];
      for (i = 0; i < 4; i++) {
        if (this.hiddenList[i] === 0) {
          this.hiddenList[i] = 'blue';
        }
        if (this.hiddenList[i] === 1) {
          this.hiddenList[i] = 'red';
        }
        if (this.hiddenList[i] === 2) {
          this.hiddenList[i] = 'green';
        }
        if (this.hiddenList[i] === 3) {
          this.hiddenList[i] = 'yellow';
        }
        if (this.hiddenList[i] === 4) {
          this.hiddenList[i] = 'purple';
        }
        if (this.hiddenList[i] === 5) {
          this.hiddenList[i] = 'white';
        }
      }
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
        this.currentRowColors = ['', '', '', ''];
        this.board[this.currentRow] = this.currentRowColors;
      }
    } //setCellColor

    this.drawRow = drawRow;
    function drawRow(row) {
      this.rowColors = this.board[row];

      for (var i = 0; i < 4; i++) {
        var c = this.rowColors[i];
        if (c != '') {
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
      var newRowColors = this.rowColors;
      newRowColors[this.currentColumn - 1] = '';
      if ((this.currentColumn = 0)) {
        return;
      }
      for (var i = 0; i < 4; i++) {
        var c = newRowColors[i];
        if (c != '') {
          setFillColor(c);
          drawDisk(140 + 167 * i, 185 + 62 * this.drawnRow, 10);
        }
      }
    } //drawUndoRow
    this.resetColors = resetColors;
    function resetColors() {
      this.board[this.currentRow] = this.currentRowColors;
      this.currentRow = 0;
      this.currentColumn = 0;
      this.currentRowColors = ['', '', '', ''];
      this.board = [];
      // this.drawRow(0);
    } //resetBoard

    this.checkGuess = checkGuess;
    function checkGuess() {
      var counter = 1;
      //   for (var i = 0; i < 4; i++) {
      //     var c = this.currentRowColors[i];
      //     if (c === this.hiddenList[i]) {
      //       console.log('found a match', c, this.hiddenList[i]);
      //       this.currentPegs[i] = 'red';
      //     } else if (
      //       c != this.hiddenList[i] &&
      //       this.hiddenList.includes(c) &&
      //       this.currentPegs[0] != 'red' &&
      //       this.currentPegs[1] != 'red' &&
      //       this.currentPegs[2] != 'red' &&
      //       this.currentPegs[3] != 'red'
      //     ) {
      //       var counter;
      //       if (i === 3) {
      //         for (var k = 2; k > 0; k--) {
      //           if (c === this.hiddenList[k]) {
      //             counter += 1;
      //           }
      //         }
      //       } else if (i === 2) {
      //         for (var k = 0; k < 2; k++) {
      //           if (c === this.hiddenList[k]) {
      //             counter += 1;
      //           }
      //         }
      //         for (var k = 2; k < 3; k++) {
      //           if (c === this.hiddenList[k]) {
      //             counter += 1;
      //           }
      //         }
      //       } else if (i === 1) {
      //         for (var k = 2; k < 4; k++) {
      //           if (c === this.hiddenList[k]) {
      //             counter += 1;
      //           }
      //         }
      //       } else if (i === 0) {
      //         var counter = 0;
      //         for (var k = 1; k < 4; k++) {
      //           if (c === this.hiddenList[k]) {
      //             counter += 1;
      //           }
      //         }
      //       }
      //       if (counter >= 1 || i != 0 || i != 1) {
      //         this.currentPegs[i] = 'white';
      //         counter = 0;
      //       } else {
      //         this.currentPegs[i] = 'black';
      //         counter = 0;
      //       }
      //     } else {
      //       this.currentPegs[i] = 'orange';
      //     }

      for (var i = 0; i < 4; i++) {
        var c = this.currentRowColors[i];
        if (c === this.hiddenList[i]) {
          this.currentPegs[i] = 'red';
        } else {
          console.log(c, this.hiddenList[i], 'making it black');
          this.currentPegs[i] = 'black';
        }
        console.log(this.currentPegs, this.hiddenList);
        if (this.hiddenList.includes(c) && this.currentPegs[i] != 'red') {
          //Check for one of the hidden colors
          // if (this.hiddenList[k] === c && k < i + 2)
          if ((i = 0)) {
            for (var k = 1; k < 4; k++) {
              if (this.hiddenList[k] === c) {
                counter += 1;
              }
            }
          }

          if ((i = 1)) {
            for (var k = 2; k < 4; k++) {
              if (this.hiddenList[k] === c) {
                counter += 1;
              }
            }
          }
          if ((i = 2)) {
            for (var k = 3; k < 4; k++) {
              if (this.hiddenList[k] === c) {
                counter += 1;
              }
            }
          }

          // if (this.hiddenList[k] === c && k > i) {
          //   counter += 1;
          // }
          if (
            counter > 0 &&
            this.currentPegs[0] != 'red' &&
            this.currentPegs[1] != 'red'
          ) {
            this.currentPegs[i] = 'white';
          } else if (counter === 0 && this.currentPegs[i] != 'red') {
            this.currentPegs[i] = 'black';
          } else {
            //Check for incorrect

            for (var k = 0; k < 4; k++) {
              var c = this.currentRowColors[k];
              if (c != this.hiddenList[k] && !this.hiddenList.includes(c)) {
                this.currentPegs[k] = 'black';
              }
            }
          }
          if (this.currentPegs[i] === 'white' && !this.hiddenList.includes(c)) {
            this.currentPegs[i] = 'black';
          }
          if (this.currentPegs[i] === 'black' && this.hiddenList.includes(c)) {
            this.currentPegs[i] = 'white';
          }
        }
        for (var k = 0; k < 4; k++) {
          var c = this.currentRowColors[k];
          console.log(c, c != this.hiddenList[k], this.hiddenList[k]);
          if (c != this.hiddenList[k] && !this.hiddenList.includes(c)) {
            this.currentPegs[k] = 'black';
          }
        }
        //   for (var k = 0; k < 4; k++) {
        //     var c = this.currentRowColors[k];
        //     if (this.currentPegs[k] === 'black' && this.hiddenList[k].includes(c)) {
        //       this.currentPegs[k] = 'white';
        //     }
        //   }

        for (var i = 0; i < this.currentPegs.length; i++) {
          // if (this.currentPegs[i] === 'red') {
          //   this.currentPegs.unshift('red');
          //   this.currentPegs.splice(i, 1);
          // } else if (this.currentPegs[i] === 'white') {
          //   this.currentPegs.unshift('white');
          //   this.currentPegs.splice(i, 1);
          // }
        }
      }
      this.boardPegs[this.currentRow] = this.currentPegs;

      drawPegs(this.boardPegs, this.currentRow + 1, this.currentRowColors);

      //   if (this.boardPegs[this.currentRow] === ['red', 'red', 'red', 'red']) {
      //     alert('You win!');
      //     this.resetColors();
      //   }
      //   if (this.currentRow === 10) {
      //     alert('Sorry you lose! The colors were', this.currentRowColors);
      //     this.resetColors();
      //   }
    } //checkGuess

    this.Pegs = drawPegs;
    function drawPegs(pegs, n, currentRowColors) {
      var pegColors = pegs[0];
      var counter = 0;
      for (var i = 0; i < currentRowColors.length; i++) {
        if (currentRowColors[0] === currentRowColors[i]) {
          counter += 1;
        }
      }
      if (
        pegColors[0] === 'white' &&
        pegColors[1] === 'white' &&
        pegColors[2] === 'red' &&
        pegColors[3] === 'red' &&
        counter === 4
      ) {
        pegColors = ['black', 'black', 'red', 'red'];
      }

      //   for (var i = 0; i < pegColors.length; i++) {
      //     if (pegColors[i] === 'red') {
      //       pegColors.unshift(pegColors[i]);
      //       pegColors.splice(i, 1);
      //       console.log('moving red');
      //     } else if (pegColors[i] === 'black') {
      //       pegColors.push(pegColors[i]);
      //       pegColors.splice(i, 1);
      //       console.log('moving black');
      //     }
      //   }

      var i;
      for (i = 1; i < pegs[0].length + 1; i++) {
        plotCircle(n, i, pegColors[i - 1]);
      }

      if (
        pegColors[0] === 'red' &&
        pegColors[1] === 'red' &&
        pegColors[2] === 'red' &&
        pegColors[3] === 'red'
      ) {
        alert('You win! The colors were ' + currentRowColors);
        this.resetColors();
      }
      if (n - 1 === 9) {
        alert('You lose! The colors were ' + currentRowColors);
        this.resetColors();
      }
    } //drawPegs
  } // MasterMindGame

  game = new MasterMindGame(10);
  game.generateHiddenList();

  theCanvas = document.getElementById('myCanvas');
  theCanvasOffset = $('#myCanvas').offset();
  g2D = theCanvas.getContext('2d');
  $('#myCanvas').attr('style', 'border: 7px solid;');

  $('#myCanvas').mouseenter(function (e) {
    getMouseXY(e);
  });

  $('#myCanvas').mousedown(function (e) {
    getMouseXY(e);

    if (inBlueColorButton(mX, mY)) {
      game.setCellColor('blue');
    } else if (inRedColorButton(mX, mY)) {
      game.setCellColor('red');
    } else if (inGreenColorButton(mX, mY)) {
      game.setCellColor('green');
    } else if (inYellowColorButton(mX, mY)) {
      game.setCellColor('yellow');
    } else if (inPurpleColorButton(mX, mY)) {
      game.setCellColor('purple');
    } else if (inWhiteColorButton(mX, mY)) {
      game.setCellColor('white');
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

  $('#myCanvas').mousemove(function (e) {
    getMouseXY(e);
  });

  $('#myCanvas').mouseup(function (e) {});

  backgroundImage.onload = function () {
    doPaintCanvas();
  };
  doPaintCanvas();
} //doStart

$(document).ready(function () {
  doStart();
});
