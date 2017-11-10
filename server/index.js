const express = require('express');
const bodyParser = require('body-parser');
const port = 8080;
const baseURL = `/api/data`;
const dCtrl = require(`./controllers/data_controller.js`);
const cors = require('cors')
require('dotenv').config();
const massive = require('massive');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + './../build'));

massive(process.env.CONNECTION_STRING)
.then(db => {
    console.log('Connected to Heroku')
    app.set('db', db)
}).catch(err=>console.log(err))

app.get('/', function(req, res){
    res.send('CCI');
  });

app.post(`${baseURL}/postgame`, dCtrl.create);
app.get(`${baseURL}/get`, dCtrl.getPlayers);
app.post(`${baseURL}/postplayer/:playerName`, dCtrl.addPlayer);

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.listen(port, () => console.log(`Listening on ${port}`));