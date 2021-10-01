const express = require('express')
const app = express()
const methodOverride = require('method-override')

const PORT = 3000
const Film = require('./models/films')

const mongoose = require('mongoose')

app.use(express.static('public'))


//DATABASE CONNECTION - LOCALHOST
// const mongoURI = "mongodb://127.0.0.1:27017/foreignfilms"
const mongoURI = "mongodb+srv://admin:antimony@db-cluster-1.kmayy.mongodb.net/foreignfilms?retryWrites=true&w=majority"
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
app.use(express.json())

//SESSIONS

//CONTROLLERS 
const filmController = require('./controllers/filmController')
app.use('/films', filmController)

app.listen(PORT||5000, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})