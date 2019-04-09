import React, { Component } from 'react';
import { GlobalStyle } from './style';
import './static/iconfont/iconfont.css';
import store from './store/index';
import Header from './common/header';
import { Provider } from 'react-redux' 
import {BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail/loadable';
import Login from './pages/login';
import Write from './pages/write'
class App extends Component {
  render() {
    return (
		<Provider store={store}>
			{/* <div className="App"> */}
				<GlobalStyle/>
				<BrowserRouter>
					<Header />
					<Route path="/" exact component={ Home }></Route>
					<Route path="/login" exact component={ Login }></Route>
					<Route path="/detail/:id" exact component={ Detail }></Route>
					<Route path="/write" exact component={ Write }></Route>
				</BrowserRouter>
			{/* </div> */}
		</Provider>
    );
  }
}

export default App;
