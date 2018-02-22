const router = require("express").Router();
const catchRoutes = require("./catch");
const regulationRoutes = require("./regulation");
const usersRoutes = require("./users");
// catch routes
router.use("/catch", catchRoutes);
router.use("/regulation", regulationRoutes);
router.use("/users", usersRoutes);

module.exports = router;
