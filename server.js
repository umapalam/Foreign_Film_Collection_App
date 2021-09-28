const express = require('express')
const app = express()
const PORT = 3000

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

app.get('/', (req, res) => {
    res.send("This Works!")
})

// NEW
app.get('/films/new', (req, res) => {
    res.render('new.ejs')
})

// INDEX
app.get('/films', (req, res) => {
    res.send("This Route is Working!")
})


app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})