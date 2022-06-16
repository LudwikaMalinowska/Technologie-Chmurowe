const express = require("express");
const router = express.Router({mergeParams: true});

const Actor = require("../models/Actor");

router.get('/', async (req, res) => {
    const query = Actor.find({});
    query.exec(function (err, actors) {
      if (err) console.log(err);
      return res.send(actors);
    })
});


module.exports = router;
