import { useState } from 'react';
import Square from './Square';

export default function Board() {
  // 컴포넌트는 자신이 정의한 state에만 접근할 수 있다.
  // Square에서 Board의 state를 직접 변경 불가함
  //  => 그래서 Board에서 state를 변경하는 함수를 만들어서
  // props로 Square에 전달해준다.
  const [state, setState] = useState({
    isNext: true,
    // count: 1,
    squares: Array(9).fill(null),
  });
  // Array(9) => [ , , , , , , , , ] 의도적으로 빈값을 준거를 알려주려고 fill(null)을 쓴 것(소통면에서)
  // Array(9).fill(null) => [null,null,null,null,null,null,null,null,null]

  // const { isNext, count, squares } = state;
  const { isNext, squares } = state;

  function calculateWinner(item) {
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
    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];
      if (item[a] && item[a] === item[b] && item[a] === item[c]) {
        return item[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);

  let status;

  if (winner) status = `Winner is ${winner}`;
  else status = `Next player : ${isNext ? 'X' : 'O'}`;

  // 함수 이름 짓는 법(컨벤션) : 이벤트를 처리하는 함수는 앞에 handle을 붙여주기
  // ex. click 이벤트 => handleClick

  function handleClick(i) {
    // if (count === 10) return;
    // if (squares[i] !== null) return;
    if (squares[i]) return; // squares[i]에 값이 있으면 멈춰!
    if (winner) return;
    // if(winner || squares[i]) return;

    const newSquares = [...squares]; // 새로운 주소를 만들어주기 위해 전개연산자 사용 !
    // const newSquares = squares.slice() ** slice()는 얕은 복사(메모리주소 복사 ㄴㄴ)
    // 불변성 ?? -> 객체나 배열에 내부값을 직접 변경하면, 참조값(메모리주소)이 그대로여서 변화가 없음!
    // 그래서 배열이나 객체를 복제(spread문법 사용)[얕은 복사]해서 참조값을 바꿔줘야 한다.

    newSquares[i] = isNext ? 'X' : 'O';
    // if (count % 2 !== 0) 1이면 true, 0이면 false
    // if (count % 2) {
    //   newSquares[i] = 'X';
    // } else {
    //   newSquares[i] = 'O';
    // }
    // console.log(newSquares);
    setState({
      // count: count + 1,
      squares: newSquares,
      isNext: !isNext, // true false 반복의 향연
    });
  }

  // i 는 매개변수 (임의로 만들어준 것), 여기서의 onClick은 props임.(이벤트아님!)왜냐면 우리가 만든 컴포넌트이니까!
  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => handleClick(i)}
      />
    );
  }

  // count % 2 가 1(true)일 때 : 'X', 0(false)일 때 : 'O'
  // const status = `Next player : ${count % 2 ? 'X' : 'O'}`;
  // const status = `Next player : ${isNext ? 'X' : 'O'}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
