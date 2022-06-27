const express = require("express");
const router = express.Router({mergeParams: true});

const redisClient = require("../config/redisClient");
const Actor = require("../models/Actor");

router.get('/', async (req, res) => {
    const query = Actor.find({});
    query.exec(async function (err, actors) {
      const data = new Date();
      const m = data.toLocaleDateString();
      const time = data.toLocaleTimeString();
      const dateTime = m + " " + time;
      
      let message = dateTime + " GET Actors: ";
      if (err) {
        message += "Error."
        await redisClient.rpush("movieapp:logs", message);
        // console.log(err);
        console.log(err);
      }
      else {
        message += "Success."
        await redisClient.rpush("movieapp:logs", message);

        return res.send(actors);
      }
    })
});


module.exports = router;
