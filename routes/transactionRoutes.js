const express = require("express");
const {
  buyCrypto,
  sellCrypto,
} = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/buy", authMiddleware, buyCrypto);
router.post("/sell", authMiddleware, sellCrypto);

module.exports = router;
