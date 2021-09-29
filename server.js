const express = require('express')
const app = express()
const methodOverride = require('method-override')

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
app.use(methodOverride('_method'))

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

// SEED DATA
app.get('/films/seed', (req, res) => {
    Film.create([
        {
            title: "Okuribito", 
            director: "Yōjirō Takita" , 
            starring: "Masahiro Motoki" , 
            country: "Japan", 
            plot: "The film follows a young man who returns to his hometown after a failed career as a cellist and stumbles across work as a nōkanshi—a traditional Japanese ritual mortician. " , 
            genre: "Drama" , 
            setting: "Yamagata" , 
            runTime: 130 , 
            languages: "Japanese", 
            seenTheFilm: false , 
            filmPoster: "https://flxt.tmsimg.com/assets/p194201_p_v10_af.jpg" 
        },
        {
            title:"Gwasok Seukaendeul", 
            director: "Kang Hyeong-cheol", 
            starring: "Park Bo-young", 
            country: "South Korea", 
            plot: "This is an intergenerational drama about finding family and learning how to deal with unexpected situations. ", 
            genre: "Comedy Drama", 
            setting: "Seoul", 
            runTime: 108, 
            languages: "Korean", 
            seenTheFilm: false, 
            filmPoster: "https://photos.hancinema.net/photos/fullsizephoto73186.jpg"
        }, 
    ], (err, data)=>{
        if (err){
            console.log(err)
        }
        res.redirect('/films')
    })
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

// DELETE 
app.delete('/films/:id', (req, res) => {
    Film.findByIdAndDelete(req.params.id, (error, deletedFilm) => {
        if(error) {
            console.log(error)
            res.send(error)
        } else {
            res.redirect('/films')
        }
    })
})


app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})