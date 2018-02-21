const router = require("express").Router();
const catchRoutes = require("./catch");
const regulationRoutes = require("./regulation");
// catch routes
router.use("/catch", catchRoutes);
router.use("/regulation", regulationRoutes);

module.exports = router;
