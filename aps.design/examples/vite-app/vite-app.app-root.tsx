import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ViteAppApp } from './app.js';
import './styles.css';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <BrowserRouter>
    <ViteAppApp />
  </BrowserRouter>
);
