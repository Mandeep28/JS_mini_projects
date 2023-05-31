import React, { useEffect } from 'react'
import './gameplay.css'
import lose from '../../assets/lose.gif'
import win from '../../assets/win.gif'
import draw from '../../assets/draw.gif'
import { Link } from 'react-router-dom'

const Gameplay = ({gameMode}) => {
 



useEffect(()=>{
    if(window !== undefined) {

        // console.log(window)
       
        startGame()
    }

},[])



var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
let result = false;
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]


function startGame() {
    const cells = document.querySelectorAll('.cell');
    // document.querySelector(".endgame").style.display = "none";
	document.querySelector(".endgame").classList.remove("show");
	origBoard = Array.from(Array(9).keys());
    result = false;
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkWin(origBoard, huPlayer) && !checkTie()) {
			setTimeout(() => {
				turn(bestSpot(), aiPlayer)
			}, 10);
			};
	}
}

function turn(squareId, player) {
    if(!result) {
        origBoard[squareId] = player;
        document.getElementById(squareId).innerText = player;
        let gameWon = checkWin(origBoard, player)
        if (gameWon) gameOver(gameWon)
    }

}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
    const cells = document.querySelectorAll('.cell');
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "#0dcaf0" : "#dc3545";

	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	if(gameWon.player === huPlayer) {
		declareWinner("You Win!", win)
	  }
	  else {
		declareWinner("You Lose!", lose)
	  }
    result = true;
}

function declareWinner(who , gif) {
	document.querySelector(".endgame").classList.add("show");
	document.querySelector(".endgame .text").innerText = who;
	document.querySelector(".gif").src = gif;
  }
function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
    if(gameMode === "easy") {
        let max = emptySquares().length;
        let ramdomValue = Math.floor(Math.random() * max) ;
        return emptySquares()[ramdomValue];
    }
    else {

        return minimax(origBoard, aiPlayer).index;
    }


}

function checkTie() {
    const cells = document.querySelectorAll('.cell');
	if (emptySquares().length == 0 && !result) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!" , draw);
		return true;
	}
	return false;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, huPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}






  return (
    <section className="main-gameplay">

    <h1>Game Level: {gameMode}</h1>


    <div className="d-flex">

   
    <table>
        <tbody>
        <tr>
            <td className="cell" id="0"></td>
            <td className="cell" id="1"></td>
            <td className="cell" id="2"></td>
        </tr>
        <tr>
            <td className="cell" id="3"></td>
            <td className="cell" id="4"></td>
            <td className="cell" id="5"></td>
        </tr>
        <tr>
            <td className="cell" id="6"></td>
            <td className="cell" id="7"></td>
            <td className="cell" id="8"></td>
        </tr>
        </tbody>
    </table>
    <div className="endgame show">
        <div className='innerDiv'>
        <div className="text">You lose</div>
        <img className="gif" src="" alt="gif"/>
        <button id="replay" className='btn' onClick={startGame} >Replay</button>
        <Link to="/" id="home" className='btn' >Go to Home</Link>
       
       
        </div>
       
    </div>
</div>

</section>
  )
}

export default Gameplay
