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
var undoX = 618, undoY = 50; 
var row1Y = bheight-720, row2Y = bheight-640, row3Y = bheight- 560;
var row4Y =  bheight-480, row5Y =  bheight-300, row6Y = bheight-320;
var row7Y = bheight-240; row8Y = bheight-160, row9Y = bheight-80;
var row10Y = bheight-5;
var game;


function getMouseXY(e){
    mX = e.pageX-theCanvasOffset.left;
    mY = e.pageY-theCanvasOffset.top;
    if (mX<0){ 
        mX = 0;
    }else if (mX>theCanvas.width){
        mX = theCanvas.width;
    }
    if (mY<0) {
        mY = 0;
    } else if (mY > theCanvas.height){
        mY = theCanvas.height;
    }
}//getMouseXY

function drawDisk(cX, cY, radius){
	
	g2D.beginPath();
		g2D.arc(cX,cY, radius, 0, Math.PI*2);
	g2D.closePath();
	g2D.fill();
}//drawDisk

function plotCircle(cX, cY, radius){
	
	g2D.beginPath();
		g2D.arc(cX,cY, radius, 0, Math.PI*2);
	g2D.closePath();
	g2D.stroke();
}//plotCircle

function setPenColor(color){
	g2D.strokeStyle = color;
}
function setFillColor(color){
	g2D.fillStyle = color;
}

function setPenSize(size){
	g2D.lineWidth = size;
}
function drawSquare(cX, cY, size){
	g2D.beginPath();
		g2D.rect(cX-size/2, cY-size/2, size , size);
	g2D.closePath();
	g2D.stroke();
}

function plotSquare(cX, cY, size){
	g2D.beginPath();
		g2D.rect(cX-size/2, cY-size/2, size , size);
	g2D.closePath();
	g2D.fill();
}

function drawColorButton(cX, cY, size, fillColor){
	setFillColor(fillColor);
	plotSquare(cX, cY, size);
	setPenColor("black");
	setPenSize(3);
	drawSquare(cX, cY, size);
	
	
}	
	
function clearCanvas() {
    g2D.clearRect(0, 0, theCanvas.width, theCanvas.height);
    g2D.drawImage(backgroundImage, 0, 0, theCanvas.width, theCanvas.height);
}//clearCanvas

this.inResetButton = inResetButton;
		function inResetButton(x , y){
				x -= 60; y -= 60;
				return (Math.abs(30 - x) < 60) && (Math.abs(50 - y) < 60); 
		}// inResetButton

		this.inUndoButton = inUndoButton;
		function inUndoButton(x , y) {
			x-=60; y-=60;
			return (Math.abs(undoX-x) < 60) && (Math.abs(undoY-y) < 60); 
		};//inUndoButton

function inBlueColorButton(x,y){
   if ( (Math.abs(x-245) < 25) && (Math.abs(y-88) < 25) )
	  return true;
   else 
	  return false;	
}
function inRedColorButton(x,y){
   if ( (Math.abs(x-310) < 25) && (Math.abs(y-88) < 25) )
	  return true;
   else 
	  return false;	
}
function inGreenColorButton(x,y){
   if ( (Math.abs(x-364) < 25) && (Math.abs(y-88) < 25) )
	  return true;
   else 
	  return false;	
}
function inYellowColorButton(x,y){
   if ( (Math.abs(x-429) < 25) && (Math.abs(y-88) < 25) )
	  return true;
   else 
	  return false;	
}
function inPurpleColorButton(x,y){
   if ( (Math.abs(x-483) < 25) && (Math.abs(y-88) < 25) )
	  return true;
   else 
	  return false;	
}
function inWhiteColorButton(x,y){
   if ( (Math.abs(x-542) < 25) && (Math.abs(y-88) < 25) )
	  return true;
   else 
	  return false;	
}


function drawButtons(){  	alert("draw buttons");
    g2D.drawImage(resetButton, 30,50, 120, 60);
    g2D.drawImage(undoButton, undoX, undoY, 120, 60);
   
   drawColorButton(240, 80, 50, "blue");
   drawColorButton(300, 80, 50, "red");
   drawColorButton(360, 80, 50, "green");
   drawColorButton(420, 80, 50, "yellow");
   drawColorButton(480, 80, 50, "purple");
   drawColorButton(540, 80, 50, "white"); 
   game.drawTurns(10);  
}//drawButtons

function doPaintCanvas(){ 
	
    clearCanvas();
    drawButtons(false);
}// doPaintCanvas

function doStart(){
	alert("doStart");
    backgroundImage.src = "images/woodback.png";
    undoButton.src  = "images/undo.png";
    resetButton.src = "images/reset.png";
	Turns.src = "images/turnRec.png";		
    alert("before master mind game");
 
  function MasterMindGame(maxTurns){
 	this.currentRow = 0; 
 	this.currentRowColors = ["","","",""];
 	this.currentColumn = 0;
 	this.maxTurns = maxTurns;
 	this.board = new Array();
 	this.colors = ["red", "green","blue","yellow","purple", "white"];
 	this.hiddenList = [0, 0, 0, 0];
 	this.currentPegs = ["black","black","black","black"];
 	this.boardPegs = new Array();
 	alert("generateHiddenlist");
 	
 	 	
 	
 	this.generateHiddenList = generateHiddenList;
 	function generateHiddenList(){
 		   var i;
 		   for( i=0; i < 4; i++){
 			   var c = Math.round (Math.random()*1000);
 			   this.hiddenList[i] = c%6;	
 		    }
 		alert(this.hiddenList);
 	}// generateHiddenList

	this.drawTurns = drawTurns;
	function drawTurns(n){
		var i;
		for(i=0; i<n; i++){
			g2D.drawImage(Turns, 50 ,150+45*i, 1000, 100);
			
		}
		for(r=0; r<= this.currentRow; r++){
		   this.drawRow(r);
		}
	}//drawTurns
	
	this.setCellColor = setCellColor;
function setCellColor(color){
	this.board[this.currentRow] = this.currentRowColors;
	this.currentRowColors[this.currentColumn] = color;
	this.currentColumn = this.currentColumn+1;
	if (this.currentColumn === 4){
		this.checkGuess();
		this.currentColumn = 0;
		this.currentRow = this.currentRow + 1;
		this.currentRowColors = ["", "", "", ""];
		 
	}
}//setCellColor

this.drawRow = drawRow;
function drawRow(row){
	var rowColors = this.board[row];
		for(var i = 0; i < 4; i++){
			var c = rowColors[i];
			if ( c != ""){
				setFillColor(c);
				drawDisk(140+167*i,185+62*row,10);	
			}	
		}
		var pegColors = this.boardPegs[row];
		for(var i = 0; i < 4; i++){
			var c = pegColors[i];
			alert("Peg: "+ c);
			if ( c != ""){
				setFillColor(c);
				drawDisk(750+130*i,150+65*row,6);	
			}
		}
		
}//drawRow

this.resetColors = resetColors;
		function resetColors(){ 
			this.board[this.currentRow] = this.currentRowColors;
			for(var r = 0; r < this.board.length; r++){
				var row = this.board[r];
				for ( var c = 0; c < row.length; c++){
					   row[c].visible =  true;
					   row[c].selected = false;
				}
			}
			this.currentRow = 0;
			this.currentColumn = 0;
			this.currentRowColors = ["", "", "", ""];
		}//resetStones stone

this.checkGuess = checkGuess;
	function checkGuess(){		
		for (var  i= 0; i < 4; i++){
		    var c = this.currentRowColors[i];
		    if (c === this.colors[this.hiddenColors[i]]){
		     this.currentPegs[i] = "red";
		    } else { //Check for one of the hidden colors
		 			for (var j = 0; j < 4; j++){
		 				var c = this.currentRowColors[j];
		 				if (c ===this.colors[this.hiddenColors[j]]){
		 						this.currentPegs[j] = "white";	   
		    		} else {//Check for incorrect
		    			for (var k = 0; k < 4; k++){
		    				var c = this.currentRowColors[k];
		    				if (c ===! this.colors[this.hiddenColors[k]]){
		 						this.currentPegs[k] = "black";	
		    		        }
		
					      }
				       }
                     }
		         }
		    }  
		this.boardPegs[currentRow] = this.currentPegs;
}//checkGuess

this.Pegs = drawPegs;
	function drawPegs(n){
		var i;
		for(i=0; i<n; i++){
			g2D.drawImage(Cpeg, 70 ,100+110*i, 50, 50);
		
		}
		
	}//drawPegs

 }// MasterMindGame

game = new MasterMindGame(10);
game.generateHiddenList();
 

  
alert("before canvas");
    theCanvas = document.getElementById('myCanvas');
    theCanvasOffset = $('#myCanvas').offset();
    g2D = theCanvas.getContext("2d");
    $('#myCanvas').attr('style', "border: 7px solid;" );
alert("after canvas");
    
       
    $('#myCanvas').mouseenter( function(e) { getMouseXY(e); });
     
    $('#myCanvas').mousedown( function(e) {
   	    
        getMouseXY(e);
        
        if (inBlueColorButton(mX,mY)){
        alert("blueButton");	
        game.setCellColor("blue");
      }else if (inRedColorButton(mX,mY)){
        alert("redButton");	
        game.setCellColor("red");
      }else if (inGreenColorButton(mX,mY)){
        alert("greenButton");
        game.setCellColor("green");	
      }else if (inYellowColorButton(mX,mY)){
        alert("yellowButton");	
        game.setCellColor("yellow");
      }else if (inPurpleColorButton(mX,mY)){
        alert("purpleButton");
        game.setCellColor("purple");
      }else if (inWhiteColorButton(mX,mY)){
        alert("whiteButton");	
        game.setCellColor("white");	
        game.checkGuess();
      }else if (inUndoButton(mX,mY)){
        alert("undoButton");	
       //game.
       }else if (inResetButton(mX,mY)){
        alert("resetButton");	
        game.resetColors();
        doPaintCanvas();
        //game.	
       }
      drawButtons();
      checkGuess();        
    });//mousedown
     
 
    $('#myCanvas').mousemove( function(e) { getMouseXY(e); });
     
    $('#myCanvas').mouseup( function(e) { }); 
     
    backgroundImage.onload = function(){ doPaintCanvas(); };
   doPaintCanvas();  
   alert("onload");   
  }//doStart
 
 $(document).ready(function(){ doStart(); });