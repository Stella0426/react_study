import { useState } from 'react';
import Square from './Square';

export default function Board({ status }) {
  // 컴포넌트는 자신이 정의한 state에만 접근할 수 있다.
  // Square에서 Board의 state를 직접 변경 불가함
  //  => 그래서 Board에서 state를 변경하는 함수를 만들어서
  // props로 Square에 전달해준다.
  const [state, setState] = useState({
    count: 1,
    squares: Array(9).fill(null),
  });
  // Array(9) => [ , , , , , , , , ] 의도적으로 빈값을 준거를 알려주려고 fill(null)을 쓴 것(소통면에서)
  // Array(9).fill(null) => [null,null,null,null,null,null,null,null,null]

  const { count, squares } = state;

  // 함수 이름 짓는 법(컨벤션) : 이벤트를 처리하는 함수는 앞에 handle을 붙여주기
  // ex. click 이벤트 => handleClick

  function handleClick(i) {
    // if (count === 10) return;
    if (squares[i] !== null) return;

    const newSquares = [...squares];

    if (count % 2 !== 0) {
      newSquares[i] = 'X';
    } else {
      newSquares[i] = 'O';
    }
    console.log(newSquares);
    setState({
      count: count + 1,
      squares: newSquares,
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
