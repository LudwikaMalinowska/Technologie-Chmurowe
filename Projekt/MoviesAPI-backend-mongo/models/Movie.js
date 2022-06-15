const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    id: Number,
    title: String,
    genre: String,
    release_date: Date,
    description: String,
    image_url: String,
    director_id: Number
});

module.exports = model('Movie', movieSchema);