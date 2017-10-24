const data = require(`./data.js`);

function mmrChange(player1, player2){
    let potChange = 25
    let diff = Math.abs(player1-player2);
  
    potChange = 25 - (diff/100);
    if(potChange < 5){
      potChange = 5;
    }
    return Math.round(potChange);
}

function findPlayer(players, playerid){
    for(let i=0; i<players.length; i++){
        if(players[i].id === playerid)
            return i;
    }
}


module.exports = {
    create: (req, res) => {
        let {act, p1, p2, p1p, p2p, time } = req.body;
        const db = req.app.get('db');
        db.read_players()
            .then( players => {
                let p1Temp = findPlayer(players, p1);
                let p2Temp = findPlayer(players, p2);
                p1p *= 1;
                p2p *= 1;
                if(act === 'Ping-Pong'){
                    let p1mmr = players[p1Temp].ppmmr;
                    let p2mmr = players[p2Temp].ppmmr;
                    let change = mmrChange(p1mmr, p2mmr);
                    db.create_ppgame([time, p1, p2, p1p, p2p, p1mmr, p2mmr ])
                        .then( (game) => {
                            res.status(200).send(game) })                            
                        .catch( () => res.status(500).send() );
                    if(p1p > p2p){
                        if(p1mmr >= p2mmr){
                            db.update_ppmmrs([(p1mmr + change), p1, (p2mmr - change), p2])
                                .then( () => {res.status(200).send(update) })
                                .catch( () => res.status(500).send() );
                        } else {
                            db.update_ppmmrs([(p1mmr + (25+(25-change))), p1, (p2mmr - (25+(25-change))), p2])
                                .then( (update) => {res.status(200).send(update) })
                                .catch( () => res.status(500).send() );
                        }
                    } else if(p2p > p1p){
                        if(p2mmr >= p1mmr){
                            db.update_ppmmrs([(p2mmr + change), p2, (p1mmr - change), p1])
                                .then( (update) => {res.status(200).send(update) })
                                .catch( () => res.status(500).send() );
                        } else {
                            db.update_ppmmrs([(p2mmr + (25+(25-change))), p2, (p1mmr - (25+(25-change))), p1])
                                .then( (update) => {res.status(200).send(update) })
                                .catch( () => res.status(500).send() );
                        }
                    }
                 } else if(act === 'Foosball'){
                    let p1mmr = players[p1Temp].fbmmr;
                    let p2mmr = players[p2Temp].fbmmr;
                    let change = mmrChange(p1mmr, p2mmr);
                    db.create_fbgame([time, p1, p2, p1p, p2p, p1mmr, p2mmr ])
                        .then( (game) => {
                            res.status(200).send(game) })                            
                        .catch( () => res.status(500).send() );
                    if(p1p > p2p){
                        if(p1mmr >= p2mmr){
                            db.update_fbmmrs([(p1mmr + change), p1, (p2mmr - change), p2])
                                .then( (update) => {res.status(200).send(update) })
                                .catch( () => res.status(500).send() );
                        } else {
                            db.update_fbmmrs([(p1mmr + (25+(25-change))), p1, (p2mmr - (25+(25-change))), p2])
                                .then( (update) => {res.status(200).send(update) })
                                .catch( () => res.status(500).send() );
                        }
                    } else if(p2p > p1p){
                        if(p2mmr >= p1mmr){
                            db.update_fbmmrs([(p2mmr + change), p2, (p1mmr - change), p1])
                                .then( (update) => {res.status(200).send(update) })
                                .catch( () => res.status(500).send() );
                        } else {
                            db.update_fbmmrs([(p2mmr + (25+(25-change))), p2, (p1mmr - (25+(25-change))), p1])
                                .then( (update) => {res.status(200).send(update) })
                                .catch( () => res.status(500).send() );
                        }
                    }
                 }
            })
    },
    getPlayers: (req, res) => {
        const db = req.app.get('db');
        db.read_players()
            .then(players => res.status(200).send(players))
            .catch(() => res.status(500).send());
    },
    addPlayer: (req, res) => {
        const db = req.app.get('db');
        db.add_player([req.params.playerName])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    }
}