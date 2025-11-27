import {
  createHotContext
} from "/build/_shared/chunk-6NRNWOF2.js";

// app/utils/crypto.client.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\utils\\crypto.client.ts"
  );
  import.meta.hot.lastModified = "1764285760370.684";
}
var ALG = { name: "AES-GCM", length: 256 };
async function ensureDemoKey() {
  const existing = sessionStorage.getItem("demo_secret_key_jwk");
  if (existing) {
    const jwk2 = JSON.parse(existing);
    return await crypto.subtle.importKey("jwk", jwk2, ALG, true, ["encrypt", "decrypt"]);
  }
  const key = await crypto.subtle.generateKey(ALG, true, ["encrypt", "decrypt"]);
  const jwk = await crypto.subtle.exportKey("jwk", key);
  sessionStorage.setItem("demo_secret_key_jwk", JSON.stringify(jwk));
  sessionStorage.setItem("demo_public_key", "present");
  sessionStorage.setItem("demo_private_key", "present");
  return key;
}
async function encryptJson(obj) {
  const key = await ensureDemoKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plain = new TextEncoder().encode(JSON.stringify(obj));
  const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plain);
  return {
    ivB64: btoa(String.fromCharCode(...iv)),
    cipherB64: btoa(String.fromCharCode(...new Uint8Array(cipher)))
  };
}

export {
  ensureDemoKey,
  encryptJson
};
//# sourceMappingURL=/build/_shared/chunk-QWSHXX2U.js.map
