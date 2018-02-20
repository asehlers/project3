const router = require("express").Router();
const catchRoutes = require("./catch");

// catch routes
router.use("/catch", catchRoutes);

module.exports = router;
