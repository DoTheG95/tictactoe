import react, {useState} from 'react';

function Square({value, onSquareClick}){
    return (
        <button 
            className='square'
            onClick={onSquareClick}
        >
            {value}
        </button>
    )
}

function Board({ xisNext, squares, onPlay }) {
    function handleClick(i){
        if (squares[i] || CalculateWinner(squares)){
            return;
        }
        const nextSquares = squares.slice();
        if (xisNext){
           (nextSquares[i] = 'X')
        }
        else{
        (nextSquares[i] = 'O')
        }
        onPlay(nextSquares);
    }

    const winner = CalculateWinner(squares);
    let gameProgression;
    //if winner is decided gameProgression = winner side
    if (winner){
        gameProgression = "Winner: " + winner;
    }

    else{
        gameProgression = "Next Player: " + (xisNext ? "X" : "O");
    }

    return (
        <>
        <div className="gameProgression">{gameProgression}</div>
        <div className='board-row'>
            <Square value={squares[0]} onSquareClick = {() => handleClick(0)}/>
            <Square value={squares[1]} onSquareClick = {() => handleClick(1)}/>
            <Square value={squares[2]} onSquareClick = {() => handleClick(2)}/>
        </div>
        <div className='board-row'>
            <Square value={squares[3]} onSquareClick = {() => handleClick(3)}/>
            <Square value={squares[4]} onSquareClick = {() => handleClick(4)}/>
            <Square value={squares[5]} onSquareClick = {() => handleClick(5)}/>
        </div>
        <div className='board-row'>
            <Square value={squares[6]} onSquareClick = {() => handleClick(6)}/>
            <Square value={squares[7]} onSquareClick = {() => handleClick(7)}/>
            <Square value={squares[8]} onSquareClick = {() => handleClick(8)}/>
        </div>
        </>
    )
}

function CalculateWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    //while i is less than length of lines run ... then increment i
    for (let i=0; i < lines.length; i++){
        //split the line to squares 
        const [a, b, c] = lines[i];
        //if value in square a/b/c exists return value of a/b/c when all 3 are the same value return true
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[c]){
            return squares[a];
        }
    }
    return null;
}

export default function Game () {
    //moved hooks to parent so that it can be used in both parent and lower levels
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xisNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    
    function handlePlay(nextSquares){
        const nextHistory = [...history.slice(0,currentMove+1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length -1);
    }

    function jumpTo(nextMove){
        setCurrentMove(nextMove);
    }

    //returns a button which has the text to Go to a certain point in the game
    const moves = history.map((squares, move)=> {
        console.log(move, squares);
        console.log(currentMove);
        let description;
        let moveIsCurrentMove;
        //if the move is the current move use this text and don't append text to the button 
        if(move === currentMove){
            moveIsCurrentMove = 'You are on move#' + move;
        }

        //if this is not the first nor current move return below
        else if(move >0){
            description = 'Go to move#'+ move;
        }

        //if this is the first which is not the current move then set below
        else{
            description = 'Go to game start';
        }

        //return either button or text - button is hidden if array is the current Move 
        return (
            <li key={move}>
                
                <button onClick={() => jumpTo(move)} hidden={moveIsCurrentMove}>
                    {description}
                </button>
                {moveIsCurrentMove}
            </li>
        )
    }
        
    )

    return(
        <div className='game'>
            <div className='game-board'>
                <Board xisNext={xisNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className='game-info'>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}