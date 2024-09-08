const Transaction = require("../models/Transaction");

// Buy Cryptocurrency
exports.buyCrypto = async (req, res) => {
  const { cryptoType, amount } = req.body;
  const userId = req.user.id; // Extracted from token in middleware
  try {
    const transaction = new Transaction({
      userId,
      cryptoType,
      amount,
      type: "buy",
      date: new Date(),
    });
    await transaction.save();
    res.status(201).json({ message: "Purchase successful", transaction });
  } catch (error) {
    res.status(500).json({ message: "Transaction failed" });
  }
};

// Sell Cryptocurrency
exports.sellCrypto = async (req, res) => {
  const { cryptoType, amount } = req.body;
  const userId = req.user.id;
  try {
    const transaction = new Transaction({
      userId,
      cryptoType,
      amount,
      type: "sell",
      date: new Date(),
    });
    await transaction.save();
    res.status(201).json({ message: "Sale successful", transaction });
  } catch (error) {
    res.status(500).json({ message: "Transaction failed" });
  }
};
