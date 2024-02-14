import crypto from "crypto";

export default function generateIV() {
  console.log(crypto.randomBytes(16).toString("hex"));
}

generateIV();
