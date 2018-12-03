const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const NodeGeocoder = require('node-geocoder');
const key = require('./apikey.js');
const db = require('../database/redis.js');
const app = express();
const port = 3000;

const geocoder = NodeGeocoder(key.map);

app.use(bodyParser.json());

app.use(express.static(path.join('././public')));

app.get('/api/gasprices', (req, res) => {
  geocoder.geocode(req.query.location, function(err, data) {
    console.log(data[0]);
    db.checkRedis(`${data[0].latitude}, ${data[0].longitude}`, (reply, er) => {
      if (reply) {
        res.send(JSON.parse(reply).stations);
      } else {
        request(
          `http://api.mygasfeed.com/stations/radius/${data[0].latitude}/${
            data[0].longitude
          }/1/reg/price/${key.gas}.json`,
          function(error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            db.addToRedis(`${data[0].latitude}, ${data[0].longitude}`, body);
            res.send(JSON.parse(body).stations);
          }
        );
      }
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
