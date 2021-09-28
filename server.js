const express = require('express')
const app = express()
const PORT = 3000
const Film = require('./models/films')


const mongoose = require('mongoose')


//DATABASE CONNECTION - LOCALHOST
const mongoURI = "mongodb://127.0.0.1:27017/foreignfilms"
const db = mongoose.connection

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=> {
      console.log('database connected')
})

db.on('error', (err) => {console.log('ERROR: ', err) })
db.on('connected', () => {console.log('mongo connected')})
db.on('disconnected', () =>{console.log('mongo disconnected')})

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }))

//CONTROLLERS 

//INDEX
app.get('/films', (req, res)=>{
    Film.find({}, (err, allFilms) =>{
        res.render('index.ejs', {
            films: allFilms
        })
    })
})

// NEW
app.get('/films/new', (req, res) => {
    res.render('new.ejs')
})

// SHOW 
app.get('/films/:id', (req, res) => {
    Film.findById(req.params.id, (error, foundFilm) => {
        console.log(foundFilm)
        res.render('show.ejs', {
            films: foundFilm
        })
    })
})

// CREATE 
app.post('/films', (req, res) => {
    if (req.body.seenTheFilm === "on") {
        req.body.seenTheFilm = true
    } else {
        req.body.seenTheFilm = false
    }
    //res.send(req.body)
    Film.create(req.body, (error, createdFilm) => {
        if (error){
          console.log(error)
          res.send(error)
        } else {
          //res.send(createdFilm)
          console.log(createdFilm)
          res.redirect('/films')
        }
    })
})


app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})