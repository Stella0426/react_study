import { useState } from 'react';

import Board from './Board';
import Square from './Square';

export default function Game() {
// 컴포넌트는 자신이 정의한 state에만 접근할 수 있다.
  // Square에서 Board의 state를 직접 변경 불가함
  //  => 그래서 Board에서 state를 변경하는 함수를 만들어서
  // props로 Square에 전달해준다.
  const [state, setState] = useState({
    isNext: true,
    count: 0,
    history: [
      // 게임이 시작했을 때, 전체가 null로 채워진다.
      Array(9).fill(null),
    ],
  });
  // Array(9) => [ , , , , , , , , ] 의도적으로 빈값을 준거를 알려주려고 fill(null)을 쓴 것(소통면에서)
  // Array(9).fill(null) => [null,null,null,null,null,null,null,null,null]

  // const { isNext, count, squares } = state;
  const { isNext, count, history } = state;
  const current = history.length - 1;

  // 승자가 있는지 확인해주는 함수
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

  // caculateWinner는 가장 최신의 순서에서 winner가 있는지 check해서 알려줌!
  // 승자가 있으면 O나 X가 winner에 들어가고, 승자가 없으면 null이 winner에 들어감!!
  const winner = calculateWinner(history[current]);

  let status;

  if (winner) status = `Winner is ${winner}`;
  else status = `Next player : ${isNext ? 'X' : 'O'}`;

  // 함수 이름 짓는 법(컨벤션) : 이벤트를 처리하는 함수는 앞에 handle을 붙여주기
  // ex. click 이벤트 => handleClick

  function handleClick(i) {
    // if (count === 10) return;
    // if (squares[i] !== null) return;
    if (history[current][i]) return; // squares[i]에 값이 있으면 멈춰!
    if (winner) return;
    // if(winner || squares[i]) return;

    // const newHistory = [...history];

    const newSquares = [...history[current]]; // 새로운 주소를 만들어주기 위해 전개연산자 사용 !
    // setState가 바뀐걸 인지 못함 (메모리 주소값이 같으니까..) 다만, 값은 바뀌긴함.
    // const newSquares = squares.slice() ** slice()는 얕은 복사(메모리주소 복사 ㄴㄴ)
    // 불변성 ?? -> 객체나 배열에 내부값을 직접 변경하면, 참조값(메모리주소)이 그대로여서 변화가 없음!(원본은 안바뀌고 다른 곳에 복사하는 것)
    // 그래서 배열이나 객체를 복제(spread문법 사용)[얕은 복사]해서 참조값을 바꿔줘야 한다.

    newSquares[i] = isNext ? 'X' : 'O';
    // if (count % 2 !== 0) 1이면 true, 0이면 false
    // if (count % 2) {
    //   newSquares[i] = 'X';
    // } else {
    //   newSquares[i] = 'O';
    // }
    // console.log(newSquares);

    // newHistory.push(newSquares);

    setState({
      count: count + 1,
      // history: newHistory,
      history: history.concat([newSquares]),
      // concat 메서드는 합쳐준 후, 새로운 메모리에 저장해줌 그래서 위에 newHistory하고 push한 것을 concat은 한방에 해줌
      isNext: !isNext, // true false 반복의 향연
    });
  }

  // i 는 매개변수 (임의로 만들어준 것), 여기서의 onClick은 props임.(이벤트아님!)왜냐면 우리가 만든 컴포넌트이니까!
  function renderSquare(i) {
    return (
      <Square
        value={history[current][i]}
        onClick={() => handleClick(i)}
      />
    );
  }console.log(history);

  // count % 2 가 1(true)일 때 : 'X', 0(false)일 때 : 'O'
  // const status = `Next player : ${count % 2 ? 'X' : 'O'}`;
  // const status = `Next player : ${isNext ? 'X' : 'O'}`;
  return (
    <div className="game">
      <div className="game-board">
        <Board status={status} renderSquare={renderSquare} />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}
