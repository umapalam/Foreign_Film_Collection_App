const express = require('express')

const router = express.Router()

const Film = require('../models/films')

const authRequired = (req, res, next) => {
	if (req.session.currentUser) {
		next()
	} else {
		res.send('You must be signed in!')
	}
}

//INDEX
router.get('/', (req, res)=>{
    Film.find({}, (err, allFilms) =>{
        res.render('index.ejs', {
            films: allFilms
        })
    })
})

// NEW
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

// SEED DATA
router.get('/seed', (req, res) => {
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
router.get('/:id', (req, res) => {
    Film.findById(req.params.id, (error, foundFilm) => {
        console.log(foundFilm)
        res.render('show.ejs', {
            films: foundFilm
        })
    })
})

// CREATE 
router.post('/', (req, res) => {
    if (req.session.currentUser) {
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
    } else {
        res.send("You must be signed in!")
    }
})

// DESTROY 
router.delete('/:id', (req, res) => {
    Film.findByIdAndDelete(req.params.id, (error, deletedFilm) => {
        if(error) {
            console.log(error)
            res.send(error)
        } else {
            res.redirect('/films')
        }
    })
})

// EDIT 
router.get('/:id/edit', authRequired, (req, res) => {
    Film.findById(req.params.id, (error, foundFilm) => {
        if (error) {
            console.log(error)
            res.send(error)
        } else {
            res.render('edit.ejs', {
                films: foundFilm
            })
        }
    })
})

// UPDATE
router.put('/:id', (req, res) => {
    // res.send(req.body)
    req.body.seenTheFilm = req.body.seenTheFilm === 'on'
    Film.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {
            new: true, 
        }, 

        (error, updatedFilm) => {
            if (error) {
                console.log(error)
                res.send(error)
            } else {
                res.redirect('/films')
            }
        })
})

module.exports = router