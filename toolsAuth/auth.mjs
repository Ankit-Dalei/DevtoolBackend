import { User } from "../Services/userService.mjs";
import { decryptId } from "../toolsAuth/decryption.mjs";

const auth = async (req, res, next) => {
  try {
    // Retrieve encrypted user ID from params, body, or headers
    const encryptedUserId = req.params.userId || req.body.userId || req.headers['user-id'];
    
    if (!encryptedUserId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    let decryptedUserId;

    try {
      // Decrypt the user ID (no need for await since decryption is synchronous)
      decryptedUserId = decryptId(encryptedUserId);
    } catch (error) {
      // Handle decryption error
      return res.status(400).json({ error: 'Invalid encrypted User ID', details: error.message });
    }

    // Find the user by the decrypted ID
    const user = await User.findById(decryptedUserId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Attach the user object to the request for future middleware/route handlers
    req.user = user;
    next();
  } catch (error) {
    // Handle any errors during the process
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

export default auth;
