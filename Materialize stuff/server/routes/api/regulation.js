const router = require("express").Router();
const regulationController = require("../../controllers/regulationController");

// Matches with "/api/regulation"
router.route("/")
  .get(regulationController.findAll)
  .post(regulationController.create);

// Matches with "/api/regulation/:id"
router
  .route("/:id")
  .get(regulationController.findById)
  .put(regulationController.update)
  .delete(regulationController.remove);

module.exports = router;
