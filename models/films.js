const mongoose = require('mongoose')
const {Schema, model} = mongoose

const filmSchema = new Schema({
    title: {type: String, required: true}, 
    director: {type: String, required: true}, 
    starring: {type: String, required: true}, 
    country: {type: String, required: true}, 
    plot: {type: String, required: true}, 
    genre: {type: String, required: true}, 
    setting: {type: String, required: true}, 
    runTime: {type: Number, required: true}, 
    languages: {type: String, required: true}, 
    seenTheFilm: {type: Boolean, default: false}, 
    filmPoster: {type: String, required: true}
})

// INITIALIZING collection Film in foreignfilm database created earlier in server.js

const Film = model('Film', filmSchema)
module.exports = Film