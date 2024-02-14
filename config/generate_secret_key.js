import crypto from "crypto";

export default function generateSecretKey() {
    console.log(crypto.randomBytes(64).toString("hex"))
}

generateSecretKey()