import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Random } from './components/Random/random';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      {/* <Route path="/404" element={<NotFoundPage />} /> */}
      <Route path="/random" element={<Random />}>
        {/* <Route path="/" /> */}
        {/* <Route path="*" element={<Navigate replace to="/apple" />} /> */}
      </Route>
      {/* <Route path="*" element={<Navigate replace to="/404" />} /> */}
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
