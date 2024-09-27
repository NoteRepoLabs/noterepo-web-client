/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import { AES, enc } from 'crypto-ts';

const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY ?? '';

/**
 * Encrypts any valid JSON object before caching to local storage.
 * @param data data to encrypt
 * @returns the encrypted data
 */
export const encrypt = (data: any): string => {
  if (!key) console.error("missing key"); // fail silently
  const encryptedData = AES.encrypt(JSON.stringify(data), key).toString();
  return encryptedData;
};

/**
 * Decrypts ciphered texts and returns the resulting object.
 * @param cipherText the encrypted text to decipher.
 * @returns any valid object resulting from the decryption.
 */
export const decrypt = (cipherText: any): any => {
  if (!key) console.error("missing key") // fail silently;
  const bytes = AES.decrypt(cipherText, key);
  const decryptedData = JSON.parse(bytes.toString(enc.Utf8));
  return decryptedData;
};

