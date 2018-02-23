// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments')
	require('dotenv').config()
}
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport')
const app = express()
const PORT = process.env.PORT || 8080
const scraper = require("./scraper/scraper.js");
// ===== Middleware ====
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// ===== testing middleware =====
// app.use(function(req, res, next) {
// 	console.log('===== passport user =======')
// 	console.log(req.session)
// 	console.log(req.user)
// 	console.log('===== END =======')
// 	next()
// })
// testing
// app.get(
// 	'/auth/google/callback',
// 	(req, res, next) => {
// 		console.log(`req.user: ${req.user}`)
// 		console.log('======= /auth/google/callback was called! =====')
// 		next()
// 	},
// 	passport.authenticate('google', { failureRedirect: '/login' }),
// 	(req, res) => {
// 		res.redirect('/')
// 	}
// )

// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	console.log('YOU ARE IN THE PRODUCTION ENV')
	app.use('/static', express.static(path.join(__dirname, '../build/static')))
	app.get('/', (req, res) => {
		var build_path = path.join(__dirname, '../build/');

		console.log(build_path);
		res.sendFile(path.join(__dirname, '../build/index.html'))
	})
}

/* Express app ROUTING */
app.use('/auth', require('./routes'))
app.use('/api', require('./routes/api'))
app.use('/users', require('./routes'))

// Scrape data from one site and place it into the mongodb db

  // Make a request for the news section of ycombinator

 

// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})

// ==== Starting Server =====
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})

// scraper("https://www.dec.ny.gov/outdoor/7894.html", [
// 	"fishName",
// 	"length",
// 	"limit",
// 	"season",
// 	"New York", 
// 	"Salt Water",
// 	"tbody tr"]
// );

// scraper("http://www.eregulations.com/newyork/fishing/statewide-angling-regulations/", [
// 	"fishName",
// 	"season",
// 	"length",
// 	"limit",
// 	"New York", 
// 	"Fresh Water",
// 	"tbody tr"]
// );

// scraper("http://www.eregulations.com/newjersey/fishing/saltwater/state-size-possession-limits/", [
// 	"fishName",
// 	"season",
// 	"length",
// 	"limit",
// 	"New Jersey", 
// 	"Salt Water",
// 	"tbody tr"]
// );

// scraper("http://www.eregulations.com/newjersey/fishing/freshwater/size-season-creel-limits/", [
// 	"fishName",
// 	"season",
// 	"length",
// 	"limit",
// 	"New Jersey", 
// 	"Fresg Water",
// 	"tbody tr"]
// );

// scraper("http://pfbc.pa.gov/fishpub/summaryad/inland.html", [
// 	"fishName",
// 	"season",
// 	"length",
// 	"limit",
// 	"Pennsylvania", 
// 	"Fresh Water",
//  	"tbody tr"]
// );