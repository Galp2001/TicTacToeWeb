import React, { useState } from 'react'
import './App.css'
import Board from './components/Board'

type SquareValue = 'X' | 'O' | null

function calculateWinner(squares: SquareValue[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }
    }
  }
  return null
}

function App() {
  const [squares, setSquares] = useState<Array<SquareValue>>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const result = calculateWinner(squares)
  const winner = result?.winner ?? null
  const winningLine = result?.line ?? null

  const handleClick = (i: number) => {
    if (winner || squares[i]) return
    const next = squares.slice()
    next[i] = xIsNext ? 'X' : 'O'
    setSquares(next)
    setXIsNext(!xIsNext)
  }

  const handleRestart = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  let status = ''
  if (winner) status = `Winner: ${winner}`
  else if (squares.every(Boolean)) status = 'Draw!'
  else status = `Next turn: ${xIsNext ? 'X' : 'O'}`

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <div className="game">
        <Board squares={squares} onClick={handleClick} winningLine={winningLine} />
        <div className="controls">
          <div className="status">{status}</div>
          <button className="restart" onClick={handleRestart}>Restart / New Game</button>
        </div>
      </div>
    </div>
  )
}

export default App
