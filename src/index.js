import React from 'react';
import { createRoot } from 'react-dom/client';
import './App.scss';
import App from './App';

const contrainer = document.getElementById('app');
const root = createRoot(contrainer);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
