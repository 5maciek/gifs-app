import './App.css';
import { GifList } from './components/GifList/gifList';
import { Logo } from './components/Logo/logo';

function App() {
  return (
    <div className="App">
      <Logo />
      <GifList />
    </div >
  );
}

export default App;
