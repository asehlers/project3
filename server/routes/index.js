const express = require('express')
const router = express.Router()
const path = require ('path');
const User = require('../db/models/user')
const passport = require('../passport')
const apiRoutes = require('./api')
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

// API and users Routes
router.use("/api", apiRoutes);

//authenticates user using google strategy
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))
router.get('/google/callback',
passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login'
	})
)

// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
	console.log('===== user!!======')
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

router.post(
	'/login',
	function(req, res, next) {
		console.log(req.body)
		console.log('================')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = Object.assign({}, user)
		if (cleanUser.local) {
			console.log(`Deleting ${cleanUser.local.password}`)
			delete cleanUser.local.password
		}
		res.json({ user: cleanUser })
	}
)

//handles log out route
router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

//handles user signup
router.post('/signup', [
	//validates and trims email
	check('username')
    .isEmail().withMessage('must be an email')
    .trim()
		.normalizeEmail()
		//checks to see if this email already exists in database
    .custom(value => {
			console.log(value)
      return User.findOne({'local.username': value}).then(user => {
				console.log(user)
				if(user){
					throw new Error('this email is already in use');
				}
      })
    }),

	//Checks password to see if it is a min of 5 characters and has at least one number
	check('password', 'passwords must be at least 5 chars long and contain one number')
    .isLength({ min: 5 })
    .matches(/\d/),

  // No special validation required? Just check if data exists:
  // check('addresses.*.street').exists(),

  // Wildcards * are accepted!
  // check('addresses.*.postalCode').isPostalCode(),

  // Sanitize the number of each address, making it arrive as an integer
  // sanitize('addresses.*.number').toInt()
],
(req, res, next) => {

	//returns errors as 422 error/JSON object
	const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
	}

	//grabs username and password from reqest body
	const { username, password } = req.body

	//second validation piece from MERN-PASSPORT. If no user exists with that email creates new user and returns new user object.
	User.findOne({ 'local.username': username }, (err, userMatch) => {
		// if (userMatch) {
		// 	return res.json({
		// 		error: `Sorry, already a user with the username: ${username}`
		// 	})
		// }
		const newUser = new User({
			'local.username': username,
			'local.password': password
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			return res.json(savedUser)
		})
	})
})

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../build/index.html"));
});

module.exports = router
