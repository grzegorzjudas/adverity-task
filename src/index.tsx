/* Libraries */
import React from 'react';
import Renderer from 'react-dom';

/* Application files */
import App from './components/App';
import theme from './lib/theme';
import './style.css';

Renderer.render(<App theme={theme}></App>, document.getElementById('app'));
