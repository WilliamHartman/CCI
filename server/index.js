const express = require('express');
const bodyParser = require('body-parser');
const port = 8082;
const baseURL = `/api/data`;
const dCtrl = require(`./controllers/data_controller.js`);
const cors = require('cors')
require('dotenv').config();
const massive = require('massive');

const app = express();
app.use(bodyParser.json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
.then(db => {
    console.log('Connected to Heroku')
    app.set('db', db)
}).catch(err=>console.log(err))


app.post(`${baseURL}/postgame`, dCtrl.create);
app.get(`${baseURL}/get`, dCtrl.getPlayers);
app.post(`${baseURL}/postplayer/:playerName`, dCtrl.addPlayer)

app.listen(port, () => console.log(`Listening on ${port}`));