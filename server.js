const express = require('express')
const app = express()
const methodOverride = require('method-override')
const session = require('express-session')
require('dotenv').config(); 

const PORT = process.env.PORT
const Film = require('./models/films')

const mongoose = require('mongoose')

app.use(express.static('public'))


//DATABASE CONNECTION - LOCALHOST
// const mongoURI = "mongodb://127.0.0.1:27017/foreignfilms"
// const mongoURI = "mongodb+srv://admin:antimony@db-cluster-1.kmayy.mongodb.net/foreignfilms?retryWrites=true&w=majority"
const mongoURI = process.env.MONGODB_URI
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
const SESSION_SECRET = process.env.SESSION_SECRET
console.log(SESSION_SECRET)

app.use(
  session({
    secret: SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false,
  })
)

app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser
  next()
})

app.get('/', (req, res) =>{
  res.redirect('/users/signin')
})

//CONTROLLERS 
const filmController = require('./controllers/filmController')
app.use('/films', filmController)

const userController = require('./controllers/userController')
app.use('/users', userController)

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})