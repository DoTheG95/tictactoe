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

export default function Board() {
    const [xisNext, setXisNext] = useState(true)
    const [squares, setSquares] = useState(Array(9).fill(null));

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
        setXisNext(!xisNext);
        setSquares(nextSquares);
        }

        const winner = CalculateWinner(squares);
    let status;
    //if winner is decided status = winner side
    if (winner){
        status = "Winner: " + winner;
    }

    else{
        status = "Next Player: " + (xisNext ? "X" : "O");
    }

    return (
    <>
    <div className="status">{status}</div>
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