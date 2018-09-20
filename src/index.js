import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// We must pass in a function reference to onClick as the handler because
// the handler needs to be evaluated bfore it can be called. Passing
// in alert('clicked') would be passing its return value, which is undefined().

// class Square extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: null,
//     };
//   }
//
//   render() {
//     return (
//       <button
//       className="square"
//       onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

// Functional components do not have to deal with accessing the correct
// this. This component is receiving all of its necessary information from
// its parent component. As such, it has no need to have its own state.
function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
    {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    // create a copy of squares, change the space in question to an X.
    // This is to avoid infringing upon immutability.
    const squares = this.state.squares.slice();
    // Prevent clicking if there's a winner or if the square has already
    // been marked.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext, // flip flop X being next.
    });
  }

  renderSquare(i) {
    return (
      // value and onClick are the two named props that we are passing down
      // to square.
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i) }
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = winner + ' wins!';
    } else {
      status = 'Next player ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  // 8 lines to win from.
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    // array destructuring.
    const [a, b, c] = lines[i];
    // if a exists and a === b && a === c, then we've found a winner.
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
