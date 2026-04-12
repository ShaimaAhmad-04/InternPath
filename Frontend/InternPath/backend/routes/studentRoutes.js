import express from "express"
import authenticate from "../middleware/authenticate.js"
import authorizeRole from "../middleware/authorizeRole.js"
import { getStudentProfile, updateStudentProfile,getStudentCV } from "../controllers/studentController.js"

const router = express.Router()

// Change authorizeRole(0) to authorizeRole(1)
router.get("/profile", authenticate, authorizeRole(1), getStudentProfile)
router.put("/profile", authenticate, authorizeRole(1), updateStudentProfile)
router.get("/cv", authenticate, authorizeRole(1), getStudentCV)
export default router