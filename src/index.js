import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './styles/style.scss';
import 'semantic-ui-css/semantic.min.css'

render(<App />, document.querySelector('#app'));