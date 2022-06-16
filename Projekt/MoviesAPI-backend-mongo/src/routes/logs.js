const express = require("express");
const router = express.Router({mergeParams: true});
const client = require("../config/redisClient");


router.get("/", async (req, res) => {
    console.log("AAA")
    const logs = await client.lrange("movieapp:logs", 0, -1)
    console.log("logs: ", logs);
    return res.send(logs);
});


module.exports = router;
