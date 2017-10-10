const express = require('express');
const bodyParser = require('body-parser');
const port = 8080;
const baseURL = `/api/data`;
const dCtrl = require(`./controllers/data_controller.js`);
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post(`${baseURL}/post`, dCtrl.create);
app.get(`${baseURL}/get`, dCtrl.read);

app.listen(port, () => console.log(`Listening on ${port}`));