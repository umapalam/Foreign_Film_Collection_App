const express = require('express')
const bcrypt = require('bcrypt'); 

const router = express.Router()

const User = require('../models/user')

router.get('/register', (req, res) => {
    res.render('users/register.ejs')
})

router.post('/register', (req, res) => {
	const salt = bcrypt.genSaltSync(10)
	req.body.password = bcrypt.hashSync(req.body.password, salt)
	console.log(req.body)
	User.findOne({username: req.body.username}, (error, userExists) => {
		if (userExists) {
			res.send('That username is taken!')
		} else {
			User.create(req.body, (error, createdUser) => {
				req.session.currentUser = createdUser
				res.redirect('/')
			})
		}
	})
})

router.get('/signin', (req, res) => {
    res.render('users/signin.ejs')
})

router.post('/signin', (req, res) => {
	User.findOne({ username: req.body.username}, (error, foundUser) => {
		if (foundUser) {
			const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
			if (validLogin) {
				req.session.currentUser = foundUser
				res.redirect('/films')
			} else {
				res.send('Invalid username or password')
			}
		} else {
			res.send('Invalid username or password')
		}
	})					
})

//DESTROY 
router.get('/signout', (req, res) => {
	req.session.destroy()
	res.redirect('/users/signin')
})

module.exports = router