import React, { Component } from 'react'
import './LogGame.css'
import dateCreator from './dateCreator.js'

class LogGame extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            activity: '',            
            player1: '',
            player2: '',
            player1Points: 0,
            player2Points: 0,
            p1Change: [25, 25],
            p2Change: [25, 25]
        }

        this.updateActivity = this.updateActivity.bind(this);
        this.selectPlayer1 = this.selectPlayer1.bind(this);
        this.selectPlayer2 = this.selectPlayer2.bind(this);
        this.updatePlayer1Points = this.updatePlayer1Points.bind(this);
        this.updatePlayer2Points = this.updatePlayer2Points.bind(this);
        this.saveGame = this.saveGame.bind(this);
        this.findPlayerIndex = this.findPlayerIndex.bind(this);
        this.findPlayerID = this.findPlayerID.bind(this);
        this.mmrChange = this.mmrChange.bind(this);
    }

    updateActivity(e){
        this.setState({activity: e.target.value}, () => {
            if(this.state.player1.length !== 0 && this.state.player2.length !== 0)
                this.mmrChange();
        })
    }

    selectPlayer1(e) {
        this.setState({player1:e.target.value}, () => {
            if(this.state.player1.length !== 0 && this.state.player2.length !== 0)
                this.mmrChange();
        })
    }
    
    selectPlayer2(e) {
        this.setState({player2:e.target.value}, () => {
            if(this.state.player1.length !== 0 && this.state.player2.length !== 0){
                this.mmrChange();
            }
        })
    }

    updatePlayer1Points(e){
        this.setState({player1Points: e.target.value})
    }
    
    updatePlayer2Points(e){
        this.setState({player2Points: e.target.value})
    }

    mmrChange(){
        let act = '';
        if(this.state.activity === 'Ping-Pong'){
            act = 'ppmmr';
        } else {
            act = 'fbmmr';
        }
        let potChange = 25
        let player1 = this.findPlayerIndex(this.state.player1);
        let player2 = this.findPlayerIndex(this.state.player2);
        let diff = Math.abs(this.props.players[player1][act]-this.props.players[player2][act]);
      
        potChange = Math.round(25 - (diff/100));
        if(potChange < 5){
          potChange = 5;
        }
        let potChangeSmall =  Math.round(25 + (25-potChange));
        if(this.props.players[player1][act] >= this.props.players[player2][act]){
            this.setState({
                p2Change: [potChangeSmall, potChange],
                p1Change: [potChange, potChangeSmall]
            })
        }else if(this.state.player2Points > this.state.player1Points){
            this.setState({
                p1Change: [potChangeSmall, potChange],
                p2Change: [potChange, potChangeSmall]
            })
        }
    }
    
    saveGame(){
        let player1 = this.findPlayerID(this.state.player1);
        let player2 = this.findPlayerID(this.state.player2);
        let dateAndTime =  dateCreator();
        let game = {
            act:this.state.activity,
            p1: player1,
            p2: player2,
            p1p: this.state.player1Points,
            p2p: this.state.player2Points,
            time: dateAndTime
        }
        this.mmrChange();        
        this.props.postData(game);
    }

    findPlayerID(playerName){
        let tempID = null;
        for(let i=0; i<this.props.players.length; i++){
          if(this.props.players[i].pname === playerName)
            tempID= i;
        }
        return this.props.players[tempID].id;
      }

    findPlayerIndex(playerName){
        let tempID = null;
        for(let i=0; i<this.props.players.length; i++){
          if(this.props.players[i].pname === playerName)
            tempID= i;
        }
        return tempID;
      }

    render() {
        var jsxNames = this.props.players.map((player, i) => {
            return <option key={i}>{player.pname}</option>;
        })
        return (
            <div className='log_game_section'>
                <h2>Log New Game</h2>
                <hr />
                <h4>Activity</h4>
                <select onChange={e => this.updateActivity(e)}>
                    <option disabled selected>Choose Activity</option>
                    <option>Ping-Pong</option>
                    <option>Foosball</option>
                </select>
                <div className='player_div'>
                    <h4 className='player_h4' >Player 1</h4>
                </div>
                <h5> +{this.state.p1Change[0]} | <span className='red'>-{this.state.p1Change[1]} </span></h5>
                <div className="name_points">
                    <select onChange={e => this.selectPlayer1(e)}>
                        <option disabled selected>Choose Player</option>   
                        {jsxNames}
                    </select>
                    <input className='points_input' placeholder='Points' onChange={e => this.updatePlayer1Points(e)} value={this.state.player1Points}></input>
                </div>
                <div className='player_div'>
                    <h4 className='player_h4' >Player 2</h4>
                </div>
                <h5> +{this.state.p2Change[0]} | <span className='red'>-{this.state.p2Change[1]}</span> </h5>
                <div className="name_points">
                    <select onChange={e => this.selectPlayer2(e)}>
                        <option disabled selected>Choose Player</option>   
                        {jsxNames}
                    </select>
                    <input className='points_input' placeholder='Points' onChange={e => this.updatePlayer2Points(e)} value={this.state.player2Points}></input>
                </div>
                <button className='save-game-button' onClick={this.saveGame}>Save Game</button>
            </div>
        )
    }
}

export default LogGame