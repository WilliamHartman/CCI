import React, { Component } from 'react';
import './PPLB.css';

class PPLB extends Component {
    constructor(props){
        super(props);

        this.state = {
            topTen: [
                ["", 0],
                ["", 0],
                ["", 0],
                ["", 0],
                ["", 0],
                ["", 0],
                ["", 0],
                ["", 0],
                ["", 0],
                ["", 0]
            ]
        }
        this.addToTopTen = this.addToTopTen.bind(this);
        this.resetState = this.resetState.bind(this);
        this.iteratePlayers = this.iteratePlayers.bind(this);
    }

    componentWillReceiveProps = (newProps) => {
        this.resetState(newProps.players);
    }

    iteratePlayers(players){
        players.forEach(player => {
            this.addToTopTen(player.pname, player.ppmmr);
        })   
    }

    resetState(players){
        this.setState({topTen: [
            ["", 0],
            ["", 0],
            ["", 0],
            ["", 0],
            ["", 0],
            ["", 0],
            ["", 0],
            ["", 0],
            ["", 0],
            ["", 0]
        ]}, () => this.iteratePlayers(players)); 
    }

    addToTopTen(player, score) {
        let tempTopTen = this.state.topTen;
        for (let i = 0; i < 10; i++) {
          if (score > tempTopTen[i][1]) {
            tempTopTen.splice(i, 0, [player, score]);
            tempTopTen.splice(-1, 1);
            this.setState({topTen:tempTopTen})
            return;
          }
        }
      }

    render() {
        var jsxTopTen = [];
        for(let i=0; i<this.state.topTen.length; i++){
            jsxTopTen.push(<li key={i}>{this.state.topTen[i][0]} - {this.state.topTen[i][1]} </li>)
        }

        return (
            <div>
                <div className="lb_name">
                    <h4>Name - MMR</h4>
                </div>
                <ol>
                    {jsxTopTen}
                </ol>
            </div>
        )
    }
}

export default PPLB