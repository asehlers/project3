const router = require("express").Router();
const catchRoutes = require("./catch");
const regulationRoutes = require("./regulation");
const usersRoutes = require("./users");

// catch and regulation routes
router.use("/catch", catchRoutes);
router.use("/regulation", regulationRoutes);

module.exports = router;
