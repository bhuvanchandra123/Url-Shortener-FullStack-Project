const express = require("express");
const { createShortURL, redirectOriginalUrl } = require("../controller/url");
const router = express.Router();

router.post("/shorten", createShortURL)
router.get("/:urlCode", redirectOriginalUrl)


module.exports = router