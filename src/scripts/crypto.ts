// @ts-nocheck
import CryptoJS from 'crypto-js';

export function getRandomBytes() {
  return CryptoJS.lib.WordArray.random(34).toString();
}

// Encryption function
export function encryptPrivateKey(privateKey: string, passphrase: string): string {
  const encodedPrivateKey = CryptoJS.enc.Utf8.parse(privateKey);

  // Generate a random IV (Initialization Vector)
  const iv = CryptoJS.lib.WordArray.random(16);

  // Derive a key from the passphrase using PBKDF2
  const derivedKey = CryptoJS.PBKDF2(passphrase, iv, { keySize: 256 / 32, iterations: 10000 });

  // Encrypt the private key using AES-GCM
  const ciphertext = CryptoJS.AES.encrypt(encodedPrivateKey, derivedKey, { iv });

  // Combine the IV and ciphertext into a single string
  const encryptedData = iv.toString() + ciphertext.toString();

  // Return the encrypted private key as a string
  return encryptedData;
}

// Decryption function
export function decryptPrivateKey(encryptedPrivateKey: string, passphrase: string): string {
  // Extract the IV and ciphertext from the encrypted data
  const iv = CryptoJS.enc.Hex.parse(encryptedPrivateKey.substr(0, 32));
  const ciphertext = encryptedPrivateKey.substr(32);

  // Derive a key from the passphrase using PBKDF2
  const derivedKey = CryptoJS.PBKDF2(passphrase, iv, { keySize: 256 / 32, iterations: 10000 });

  // Decrypt the private key using AES-GCM
  const decryptedBytes = CryptoJS.AES.decrypt(ciphertext, derivedKey, { iv });
  const decryptedPrivateKey = decryptedBytes.toString(CryptoJS.enc.Utf8);

  // Return the decrypted private key as a string
  return decryptedPrivateKey;
}
