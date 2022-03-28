const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("Hello world");
    console.log("Hello console")
});



app.listen(port, () => {
    console.log(`Aplikacja Express.js działa na portcie ${port}`);
});