// 협업할 때, jsx문법이 들어간 것을 알려주기 위해 jsx파일을 사용

export default function Square({ value }) {
  function handleClick() {
    console.log('click');
  }
  return (
  // 중괄호{ } 안에 쓰인 명령어가 자바스크립트를 실행함
  // {console.log("click")} 은 그냥 console.log를 실행시킴
  // 그래서 이벤트 발생시에 로직을 실행시키고 싶으면 { }안에 함수를 넣어줘야함!

    <button onClick={() => console.log('click')} className="square" type="button">
      {value}
    </button>
  );
}
