const express = require("express");
const client = require('../config/psqlClient');
const router = express.Router({mergeParams: true});

router.get('/', async (req, res) => {
    const query = Actor.find({});
    query.exec(function (err, actors) {
      if (err) console.log(err);
      return res.send({
        allActors: actors
      });
    })
});


module.exports = router;
