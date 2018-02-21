const router = require("express").Router();
const catchController = require("../../controllers/catchController");

// Matches with "/api/catch"
router.route("/")
  .get(catchController.findAll)
  .post(catchController.create);

// Matches with "/api/catch/:id"
router
  .route("/:id")
  .get(catchController.findById)
  .put(catchController.update)
  .delete(catchController.remove);

module.exports = router;
