const { Schema, model } = require('mongoose');

const personSchema = new Schema({
    id: Number,
    first_name: String,
    last_name: String,
    birth_date: Date,
    nationality: String
});

module.exports = model('Person', personSchema);