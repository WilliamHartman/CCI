import React, { Component } from 'react';
import LogGame from './components/LogGame';
import Leaderboard from './components/Leaderboard';
import './App.css';
import PPImg from "./images/pingpong8bit.png"
import FBImg from "./images/foosballman8bit.png"
import axios from 'axios';
const port = 8080;


class App extends Component {
  constructor(){
    super();

    this.state = {
      data: {players:[]}
    }

    this.postData = this.postData.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentWillMount = () => {
    this.getData();
  }
  
  getData(){
    axios.get(`http://localhost:${port}/api/data/get`)
      .then(response => {
        this.setState({data:response.data})
      })
  }

  postData(game){
    axios.post(`http://localhost:${port}/api/data/post`, game)
      .then(response => {
        this.setState({data:response.data})
      })
  }


  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="title_container">
            <img src={FBImg} alt="" className="fb_img"/>
            <div>
              <h1 className="title">CCI</h1>
              <h5>Competative Cohort Intramurals</h5>
            </div>
            <img src={PPImg} alt="" className="pp_img"/>
          </div>
        </header>
        <div className="main_content">
            <LogGame data={this.state.data} getData={this.getData} postData={this.postData}/>
            <Leaderboard data={this.state.data} getData={this.getData}/>
        </div>
      </div>
    );
  }
}

export default App;
