const express = require("express");
const router = express.Router();
const {dashboard, create, memberView} = require("../Controller/Member");
const authentication = require("../../Middleware/Authentication");
const upload = require("../../Multer/Multer");
router.get("/dashboard",authentication, dashboard);

router.post("/create",authentication,upload.fields([
    { name: 'repPhoto1', maxCount: 1 },
    { name: 'repPhoto2', maxCount: 1 },
    { name: 'allotmentsLetter', maxCount: 1 },
    { name: 'possessionLetter', maxCount: 1 },
    { name: 'officeOrder', maxCount: 1 },
    { name: 'transferOrder', maxCount: 1 },
    { name: 'document1', maxCount: 1 },
    { name: 'document2', maxCount: 1 },
    { name: 'document3', maxCount: 1 },
]),  create);

router.get("/getdata",authentication, memberView)

module.exports = router;
