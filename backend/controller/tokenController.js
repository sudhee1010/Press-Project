import Token from "../model/tokenSchema.js";

// Create a token and assign to a customer
const generateToken = async (req, res) => {
  const { customerName } = req.body;

  try {
    if (!customerName) {
      return res.status(400).json({ message: "Customer name is required" });
    }

    // Get last token number
    const lastToken = await Token.findOne().sort({ tokenNumber: -1 });
    const nextTokenNumber = lastToken ? lastToken.tokenNumber + 1 : 1;

    const newToken = await Token.create({
      tokenNumber: nextTokenNumber,
      customerName,
    });

    return res.status(200).json({
      message: "Token generated",
      token: `TKN-${newToken.tokenNumber.toString().padStart(4, "0")}`,
      tokenNumber: newToken.tokenNumber,
    });

  } catch (error) {
    console.error("Token generation error:", error);
    return res.status(500).json({
      message: "Error occurred during token generation",
      data: error.message
    });
  }
};
 
export { generateToken }