import './App.css';
import { GifList } from './components/GifList/gifList';
import { Logo } from './components/Logo/logo';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Random } from './components/Random/random';
import { NotFoundPage } from './components/NotFoundPage/notFoundPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Logo />
        <Routes>
          <Route path="/" element={<GifList />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/random" element={<Random />}>
          </Route>
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
