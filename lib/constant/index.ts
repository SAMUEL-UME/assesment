import * as crypto from "crypto";

export function encrypt(text: string): string {
  const algorithm: string = "aes-256-cbc";
  const key: Buffer = crypto.randomBytes(32);
  const iv: Buffer = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decrypt(encrypted: string): string {
  const algorithm: string = "aes-256-cbc";
  const key: Buffer = crypto.randomBytes(32); // Must be 32 bytes for aes-256-cbc
  const iv: Buffer = crypto.randomBytes(16);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}


