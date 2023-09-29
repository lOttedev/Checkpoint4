const express = require("express");

const router = express.Router();

const guitaresControllers = require("../controllers/guitaresControllers");

router.get("/guitares", guitaresControllers.browse);
router.get("/guitares/:id", guitaresControllers.read);

module.exports = router;
