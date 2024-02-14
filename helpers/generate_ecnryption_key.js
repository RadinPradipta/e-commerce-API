import crypto from "crypto";

export default function generate() {
  console.log(crypto.randomBytes(32).toString("hex"));
}

generate();
