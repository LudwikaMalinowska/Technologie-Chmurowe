const { Schema, model } = require('mongoose');

const actorSchema = new Schema({
    id: Number,
    movie_id: Number,
    person_id: Number
});

module.exports = model('Actor', actorSchema);