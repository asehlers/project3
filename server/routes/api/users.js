const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router
  .route("/")
  .get(usersController.findAll)
  .post(usersController.create); //not used here. used through passport

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(usersController.findById)
  .put(usersController.update) //not used here. used through passport
  .delete(usersController.remove); //not used here. used through passport

module.exports = router;