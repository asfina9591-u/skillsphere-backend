const Payment = require("../models/Payment");
const Contract = require("../models/Contract");

const makePayment = async (req, res) => {
  try {
    const { contractId, amount, method } = req.body;
    const contract = await Contract.findById(contractId);

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    const payment = new Payment({
      contractId,
      clientId: contract.clientId,
      freelancerId: contract.freelancerId,
      amount,
      method,
      status: "Completed"
    });

    await payment.save();
    res.json({ message: "Payment Successful", payment });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { makePayment };
