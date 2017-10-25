import React, { Component } from 'react';
import LogGame from './components/LogGame';
import Leaderboard from './components/Leaderboard';
import './App.css';
import PPImg from "./images/pingpong8bit.png"
import FBImg from "./images/foosballman8bit.png"
import axios from 'axios';
const port = 8082;


class App extends Component {
  constructor(){
    super();

    this.state = {
      players:[]
    }

    this.postData = this.postData.bind(this);
    this.getPlayers = this.getPlayers.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
  }

  componentWillMount = () => {
    this.getPlayers();
  }
  
  getPlayers(){
    axios.get(`http://localhost:${port}/api/data/get`)
      .then(response => {
        this.setState({players:response.data})
      })
  }

  postData(game){
    axios.post(`http://localhost:${port}/api/data/postgame`, game)
      .then(() => {
        setTimeout( () => {
          axios.get(`http://localhost:${port}/api/data/get`)
            .then(response => {
            this.setState({players:response.data})
          })
      }, 500)
    })
  }
  

  addPlayer(newPlayer){
    axios.post(`http://localhost:${port}/api/data/postplayer/${newPlayer}`)
      .then(() => {
        axios.get(`http://localhost:${port}/api/data/get`)
          .then(response => {
            this.setState({players:response.data})
      })
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
            <LogGame players={this.state.players} getPlayers={this.getPlayers} postData={this.postData}/>
            <Leaderboard players={this.state.players} getPlayers={this.getPlayers} addPlayer={this.addPlayer}/>
        </div>
      </div>
    );
  }
}

export default App;
