import React, {Component} from 'react';
import './App.css';

import Header from './pages/header';
import Footer from './pages/footer';
import Content from './pages/Content';


class App extends Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <Content/>
                <Footer/>
            </div>
        );
    }
}

export default App;
