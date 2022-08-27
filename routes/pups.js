import express from "express";
import {
  createPup,
  getAllPups,
  getPupById,
  editPup,
  destroyPupById,
  addABone,
} from "../controllers/PupControllers.js";
const router = express.Router();

router.post("/", createPup);
router.get("/all", getAllPups);
router.get("/:pupId", getPupById);
router.put("/:pupId", editPup);
router.put("/:pupId/bone", addABone);
router.delete("/:pupId", destroyPupById);

export { router as pupsRoutes };
