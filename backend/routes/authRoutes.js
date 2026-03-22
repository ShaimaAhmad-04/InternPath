import express from "express"
import { register, login, me } from '../controllers/authController.js'
import authenticate from '../middleware/authenticate.js'

const router = express.Router()
router.post("/register", register)
router.post("/login", login)

// Called by the frontend to get the current logged in user's info.
// Requires a valid JWT token in the Authorization header.
// Used on app load, page refresh, or when displaying user profile.
router.get("/me", authenticate, me) // protected route

export default router