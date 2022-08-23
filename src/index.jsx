import ReactDOM from 'react-dom/client';
import Game from './Game';
import './index.css';

// ReactDOM에서 진입점(root)를 만들어주는 createRoot메서드 사용
// 진입점에 render 메서드로 Game 컴포넌트를 그려준다.
ReactDOM.createRoot(document.getElementById('root')).render(<Game />);
