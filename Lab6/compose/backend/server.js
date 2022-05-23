'use strict';

const express = require('express');

const app = express();
const PORT = process.env.PGPORT;

require('dotenv').config();
app.use(express.json());

const client = require('./redisClient');

client.on('error', err => {
  console.error('Error connecting to Redis', err);
});

client.on('connect', () => {
    console.log(`Connected to Redis.`)
    const port = PORT || 5000

    app.get("/", (req, res)=>{
      res.send("Hello world!");
    });


    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
});
