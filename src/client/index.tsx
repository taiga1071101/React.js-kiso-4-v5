import { hydrateRoot } from 'react-dom/client';
import { App } from '../App.tsx';

hydrateRoot(
  document.getElementById('root')!,
    <App />
);