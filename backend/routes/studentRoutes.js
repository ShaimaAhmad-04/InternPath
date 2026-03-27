import express from "express"
import authenticate from "../middleware/authenticate.js"
import authorizeRole from "../middleware/authorizeRole.js"
import { getStudentProfile, updateStudentProfile } from "../controllers/studentController.js"

const router = express.Router()



router.get("/profile", authenticate, authorizeRole(1), getStudentProfile)
router.put("/profile", authenticate, authorizeRole(1), updateStudentProfile)

export default router