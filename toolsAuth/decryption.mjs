import crypto from 'crypto';
import { Buffer } from 'buffer'; // Import Buffer

const algorithm = 'aes-256-cbc'; // AES encryption algorithm
const secretKey = crypto.randomBytes(32); // 256-bit key
const iv = crypto.randomBytes(16); // Initialization vector

// Encrypt Function
export const encryptId = (id) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(id, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
};

// Decrypt Function
export const decryptId = (encryptedId) => {
    const [ivHex, encrypted] = encryptedId.split(':');
    const ivBuffer = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, ivBuffer);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
