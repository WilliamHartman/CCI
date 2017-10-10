import React, { Component } from 'react';
import './Leaderboard.css';
import PPLB from './PPLB.js';
import FBLB from './FBLB.js';


class Leaderboard extends Component {
    constructor(props) {
        super(props);

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
                        <PPLB data={this.props.data} getData={this.props.getData}/>
                    </div>
                    <div className="top_ten">
                        <h3>Foosball</h3>
                        <hr />
                        <FBLB data={this.props.data} getData={this.props.getData}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Leaderboard