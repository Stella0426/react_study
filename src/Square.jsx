// 협업할 때, jsx문법이 들어간 것을 알려주기 위해 jsx파일을 사용
// import { useState } from 'react';

export default function Square({ value, onClick }) {
  // 각각 state를 선언해줘도 되지만 객체로 묶어서 선언하는 경우도 있다.(선택사항)
  // const [value, setValue] = useState('');
  // const [name, setName] = useState('');
  // const [state, setState] = useState({
  //   value: null,
  //   name: '',
  // });
  // const [state, setState] = useState({ value: null });
  // const [value, setValue] = useState(null); 이렇게 해도 됨!

  // const { value } = state;

  // function handleClick() {
  // value = number
  // console.log('X');
  // setState({ value: 'X' });
  // }
  return (
  // 중괄호{ } 안에 쓰인 명령어가 자바스크립트를 실행함
  // {console.log("click")} 은 그냥 console.log를 실행시킴
  // 그래서 이벤트 발생시에 로직을 실행시키고 싶으면 { }안에 함수를 넣어줘야함!

    <button onClick={() => onClick(value)} className="square" type="button">
      {value}
    </button>
  );
}

// 함수에 매개변수가 없는 경우
// function handleClick() {
//   console.log('Click!');
// }
// => onClick{handleClick}

// 함수에 매개변수가 있어서 인자를 넣어줘야하는 경우
// function handleClick(number) {
//   console.log(number);
// }
// => onClick{() => handleClick(value)}
// 다른 예시 : onClick = {() => console.log('Click!')} (O)
// onClick = {console.log('Click!')} (X)
