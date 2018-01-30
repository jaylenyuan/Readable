import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Category from './Components/Category'
import { Route } from 'react-router-dom';

class App extends Component {
  
  render() {
    let cats = []
    if (this.props.categories) {
      cats = this.props.categories
    }
    
    return (
      <div className="App">
        
        <Route exact path='/' render = {() =>(
          <Category display='root' categories={cats}/>
        )}/>
        <Route exact path='/react' render = {() =>(
          <Category display='react' categories={cats}/>
        )}/>
        <Route exact path='/redux' render = {() =>(
          <Category display='redux' categories={cats}/>
        )}/>
        <Route exact path='/udacity' render = {() =>(
          <Category display='udacity' categories={cats}/>
        )}/>

        
        {/* <Category display={this.state.display}/> */}
      </div>
    )
  }
}

export default App;
