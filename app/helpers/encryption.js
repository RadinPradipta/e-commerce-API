import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const encrypt = (data, hex) => {
  console.log(data);
  const iv = Buffer.from(process.env.CRYPTO_IV, "hex");
  console.log(iv);
  const key = Buffer.from(hex, "hex");
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  const dataString = JSON.stringify(data);

  const encryptedBody = Buffer.concat([
    cipher.update(dataString),
    cipher.final(),
  ]);

  return encryptedBody.toString("base64");
};

const decrypt = (encryptedData, hex) => {
  const iv = Buffer.from(process.env.CRYPTO_IV, "hex");

  const key = Buffer.from(hex, "hex");

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const decryptedData = Buffer.concat([
    decipher.update(encryptedData, "base64"),
    decipher.final(),
  ]);

  const decryptedString = decryptedData.toString("utf8");

  const decryptedObject = JSON.parse(decryptedString);

  return decryptedObject;
};

export { encrypt, decrypt };
