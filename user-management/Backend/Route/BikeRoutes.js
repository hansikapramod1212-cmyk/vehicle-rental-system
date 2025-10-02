const express = require("express");
const router = express.Router();
const BikeController = require("../Controllers/BikeController");

router.get("/", BikeController.getBikes);
router.post("/", BikeController.addBike);
router.get("/:id", BikeController.getBikeById);
router.put("/:id", BikeController.updateBike);
router.delete("/:id", BikeController.deleteBike);

module.exports = router;
