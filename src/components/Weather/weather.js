const router = require("express").Router();

router.route("/api/weather")
	.get(weatherSearch.searchWeather);