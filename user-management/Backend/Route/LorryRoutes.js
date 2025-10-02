import express from "express";
import {
  addLorry,
  getLorries,
  getLorryById,
  updateLorry,
  deleteLorry
} from "../Controllers/LorryController.js";

const router = express.Router();

router.post("/", addLorry);
router.get("/", getLorries);
router.get("/:id", getLorryById);
router.put("/:id", updateLorry);
router.delete("/:id", deleteLorry);

export default router;
