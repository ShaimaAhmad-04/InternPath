import express from "express"
import authenticate from "../middleware/authenticate.js"
import authorizeRole from "../middleware/authorizeRole.js"
import { getStudentProfile, updateStudentProfile,getStudentCV } from "../controllers/studentController.js"

const router = express.Router()



router.get("/profile", authenticate, authorizeRole(0), getStudentProfile)
router.put("/profile", authenticate, authorizeRole(0), updateStudentProfile)
router.get("/cv", authenticate, authorizeRole(0), getStudentCV)

export default router