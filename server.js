const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send("This Works!")
})

//CONTROLLERS 

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