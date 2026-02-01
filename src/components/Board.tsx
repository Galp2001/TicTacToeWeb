import React from 'react';

type SquareValue = 'X' | 'O' | null;

interface BoardProps {
  squares: SquareValue[];
  onClick: (i: number) => void;
  winningLine: number[] | null;
}

const Square: React.FC<{ value: SquareValue; onClick: () => void; highlight?: boolean }> = ({ value, onClick, highlight }) => {
  return (
    <button className={"square" + (highlight ? ' winning' : '')} onClick={onClick}>
      {value}
    </button>
  );
};

export const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine }) => {
  const renderSquare = (i: number) => {
    const highlight = !!(winningLine && winningLine.includes(i));
    return <Square key={i} value={squares[i]} onClick={() => onClick(i)} highlight={highlight} />;
  };

  return (
    <div className="board">
      <div className="board-row">{[0, 1, 2].map(renderSquare)}</div>
      <div className="board-row">{[3, 4, 5].map(renderSquare)}</div>
      <div className="board-row">{[6, 7, 8].map(renderSquare)}</div>
    </div>
  );
};

export default Board;
