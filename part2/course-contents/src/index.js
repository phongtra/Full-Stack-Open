import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { courses } from './data';

ReactDOM.render(<App courses={courses} />, document.getElementById('root'));
