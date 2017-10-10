const data = require(`./data.js`);

var ppID = 1;
var fbID = 1;

function mmrChange(player1, player2){
    let potChange = 25
    let diff = Math.abs(player1-player2);
  
    potChange = 25 - (diff/100);
    if(potChange < 5){
      potChange = 5;
    }
    return Math.round(potChange);
}

module.exports = {
    create: (req, res) => {
        let {act, p1, p2, p1p, p2p, time } = req.body;
        p1p *= 1;
        p2p *= 1;
        if(act === 'Ping-Pong'){
            let change = mmrChange(data.players[p1].ppMMR, data.players[p2].ppMMR);
            data.ppGames.push({
                id:ppID,
                time: time,
                player1: p1,
                player2: p2,
                player1Points: p1p,
                player2Points: p2p,
                player1MMR: data.players[p1].ppMMR,
                player2MMR: data.players[p2].ppMMR
            });
            data.players[p1].ppGames.push(ppID);
            data.players[p2].ppGames.push(ppID);
            if(p1p > p2p){
                if(data.players[p1].ppMMR >= data.players[p2].ppMMR){
                    data.players[p1].ppMMR += change;
                    data.players[p2].ppMMR -= change;
                } else {
                    data.players[p1].ppMMR += 25 + (25-change);
                    data.players[p2].ppMMR -= 25 + (25-change);
                }
            } else if(p2p > p1p){
                if(data.players[p2].ppMMR >= data.players[p1].ppMMR){
                    data.players[p2].ppMMR += change;
                    data.players[p1].ppMMR -= change;
                } else {
                    data.players[p2].ppMMR += 25 + (25-change);
                    data.players[p1].ppMMR -= 25 + (25-change);
                }
            }
            ppID++
        } else if (act === 'Foosball'){
            let change = mmrChange(data.players[p1].fbMMR, data.players[p2].fbMMR);
            data.fbGames.push({
                id:fbID,
                time: time,
                player1: p1,
                player2: p2,
                player1Points: p1p,
                player2Points: p2p,
                player1MMR: data.players[p1].fbMMR,
                player2MMR: data.players[p2].fbMMR
            });
            data.players[p1].fbGames.push(fbID);
            data.players[p2].fbGames.push(fbID);
            if(p1p > p2p){
                if(data.players[p1].fbMMR >= data.players[p2].fbMMR){
                    data.players[p1].fbMMR += change;
                    data.players[p2].fbMMR -= change;
                } else {
                    data.players[p1].fbMMR += (25 + (25-change));
                    data.players[p2].fbMMR -= (25 + (25-change));
                }
            } else {
                if(data.players[p2].fbMMR >= data.players[p1].fbMMR){
                    data.players[p2].fbMMR += change;
                    data.players[p1].fbMMR -= change;
                } else {
                    data.players[p2].fbMMR += (25 + (25-change));
                    data.players[p1].fbMMR -= (25 + (25-change));
                }
            }
            fbID++
        }
        res.status(200).send(data);
    },    
    read: (req, res) => {
        res.status(200).send(data);
    }
}