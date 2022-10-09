import './App.css';
import { GifList } from './components/gifList/gifList';
import { Logo } from './components/logo/logo';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Random } from './components/random/random';
import { NotFoundPage } from './components/notFoundPage/notFoundPage';
import { FavoriteGifs } from './components/favoriteGifs/favoriteGifs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Logo />
        <Routes>
          <Route path="/" element={<GifList />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/random" element={<Random />} />
          <Route path="/favorite" element={<FavoriteGifs />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;

