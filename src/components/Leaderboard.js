import React, { Component } from 'react';
import './Leaderboard.css';
import PPLB from './PPLB.js';
import FBLB from './FBLB.js';


class Leaderboard extends Component {
    constructor(props) {
        super(props);

        this.newPlayer = this.newPlayer.bind(this);
    }

    newPlayer(){
        let name = this.refs.newplayer.value;
        for(let i=0; i<this.props.players.length; i++){
            if(this.props.players[i].pname === name){
                alert('Player already exists. Enter a unique name.');
                this.refs.newplayer.value = '';
                return;
            }
        }
        this.props.addPlayer(this.refs.newplayer.value);
        this.refs.newplayer.value = '';
    }

    render(){
        return (
            <div className="leaderboard_section">
                <header className="leaderboard_header">
                    <h1>Leaderboards</h1>
                    <hr />
                </header>
                <div className="top_ten_cont">
                    <div className="top_ten">
                        <h3>Ping-Pong</h3>
                        <hr />
                        <PPLB players={this.props.players} getPlayers={this.props.getPlayers}/>
                    </div>
                    <div className="top_ten">
                        <h3>Foosball</h3>
                        <hr />
                        <FBLB players={this.props.players} getPlayers={this.props.getPlayers}/>
                    </div>
                </div>
                <div className='create-player'>
                    <input placeholder=' Create Player' ref='newplayer'/>
                    <button className='create-player-button' onClick={this.newPlayer}>Save</button>
                </div>
            </div>
        )
    }
}

export default Leaderboard