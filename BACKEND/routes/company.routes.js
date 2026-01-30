import express from "express"
import authenticatedToken from "../middleware/isAuthenticated.js"
import { getAllCompanies, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controllers.js"
import { singleUpload } from "../middleware/multer.js"


const router = express.Router()

router.route("/register").post(authenticatedToken,registerCompany)
router.route("/get/:id").get(authenticatedToken ,getCompanyById)
router.route("/get").get(authenticatedToken, getAllCompanies)
router.route("/update/:id").put(authenticatedToken,singleUpload, updateCompany)

export default router