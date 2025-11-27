export async function sendMessageToPatient(envelopeId: string, ciphertext: string) {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ envelopeId, ciphertext })
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return await res.json();
}
