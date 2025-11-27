const ALG: AesKeyGenParams = { name: "AES-GCM", length: 256 };

export async function ensureDemoKey(): Promise<CryptoKey> {
  const existing = sessionStorage.getItem("demo_secret_key_jwk");
  if (existing) {
    const jwk = JSON.parse(existing);
    return await crypto.subtle.importKey("jwk", jwk, ALG, true, ["encrypt", "decrypt"]);
  }
  const key = await crypto.subtle.generateKey(ALG, true, ["encrypt", "decrypt"]);
  const jwk = await crypto.subtle.exportKey("jwk", key);
  sessionStorage.setItem("demo_secret_key_jwk", JSON.stringify(jwk));
  sessionStorage.setItem("demo_public_key", "present");
  sessionStorage.setItem("demo_private_key", "present");
  return key;
}

export async function encryptJson(obj: unknown): Promise<{ ivB64: string; cipherB64: string }> {
  const key = await ensureDemoKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plain = new TextEncoder().encode(JSON.stringify(obj));
  const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plain);
  return {
    ivB64: btoa(String.fromCharCode(...iv)),
    cipherB64: btoa(String.fromCharCode(...new Uint8Array(cipher)))
  };
}
