// const connect = require("connect");
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());


const movies = require('./routes/movies');
const persons = require('./routes/persons');
const actors = require('./routes/actors');
const logs = require('./routes/logs');

app.use("/movies", movies);
app.use("/persons", persons);
app.use("/actors", actors);
app.use("/logs", logs);

require('dotenv').config();
const dbConnData = {
  port: process.env.PORT || 5000,
  mongo_host: process.env.MONGO_HOST || '127.0.0.1',
  mongo_port: process.env.MONGO_PORT || 27017,
  mongo_database: process.env.MONGO_DATABASE || 'devops',
  // redis_host: process.env.REDIS_HOST || '127.0.0.1',
  // redis_port: process.env.REDIS_PORT || 6379,
};
console.log(dbConnData);
const mongoose = require('mongoose');
const redis = require('ioredis')

//--- Redis ---
// const redisClient = redis.createClient(dbConnData.redis_port, dbConnData.redis_host);
const redisClient = require("./config/redisClient");

redisClient.on("error", (error) => {
    console.log({redisError: error});
});

redisClient.on('connect', () => {
  console.log(`Connected to Redis.`)
  // const port = process.env.REDIS_PORT || 6379
  // app.listen(port, () => {
  //   console.log(`API server listening at http://localhost:${port}`);
  // });
});


mongoose
  .connect(`mongodb://${dbConnData.mongo_host}:${dbConnData.mongo_port}/${dbConnData.mongo_database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(response => {
    console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
    // const port = process.env.PORT || 5000

    // app.listen(port, () => {
    //   console.log(`API server listening at http://localhost:${port}`);
    // });
  })
  .catch(error => console.error('Error connecting to MongoDB', error));

app.listen(dbConnData.port, () => {
    console.log(`TEST - API server listening at http://localhost:${dbConnData.port}`);
});





