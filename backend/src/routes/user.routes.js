const express = require("express");

const router = express.Router();

const userController = require("../controllers/userControllers");
const checkUserUpdate = require("../Validator/userValidatorUpdate");
const hashedPasswordUpdate = require("../middleware/hashPasswordUpdate");

router.get("/users", userController.browse);
router.get("/users/:id", userController.read);

router.put(
  "/users-password/:id",
  checkUserUpdate,
  hashedPasswordUpdate,
  userController.editPassword
);

router.post("/users", userController.add);
router.delete("/users/:id", userController.destroy);

module.exports = router;
