import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Todo from './components/Todo';
import Auth from './components/Auth';

function App() {
	return (
		<Router>
			<Route path='/auth' component={Auth} />
			<Route path='/todo' component={Todo} />
		</Router>
	);
}

export default App;
