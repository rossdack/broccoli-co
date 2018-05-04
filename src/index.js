import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap-css-only/css/bootstrap.css';
import 'typeface-fira-sans';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
