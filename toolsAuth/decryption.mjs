import crypto from 'crypto';
import { Buffer } from 'buffer'; // Import Buffer

const algorithm = 'aes-256-cbc';
const secretKey = crypto.randomBytes(32); // Use environment variable for consistency

// Encrypt Function
export const encryptId = (id) => {
    const iv = crypto.randomBytes(16); // Generate a random IV for every encryption
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    
    let encrypted = cipher.update(id, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Return IV along with encrypted data
    return `${iv.toString('hex')}:${encrypted}`;
};

// Decrypt Function
export const decryptId = (encryptedId) => {
    const [ivHex, encrypted] = encryptedId.split(':'); // Split the IV and the encrypted part
    const ivBuffer = Buffer.from(ivHex, 'hex'); // Convert IV to buffer

    const decipher = crypto.createDecipheriv(algorithm, secretKey, ivBuffer);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted; // Return the decrypted ID
};
