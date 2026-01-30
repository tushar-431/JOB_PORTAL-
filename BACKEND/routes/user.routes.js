import express from "express"
import { login, logout, register, updateProfile } from "../controllers/user.controller.js"
import authenticatedToken from "../middleware/isAuthenticated.js"
import { singleUpload } from "../middleware/multer.js"

const router = express.Router()

router.route("/register").post(singleUpload,register)
router.route("/login").post(singleUpload,login)
router.route("/profile/update").post(authenticatedToken,singleUpload, updateProfile)
router.route("/logout").post(logout)

export default router