const ITERATIONS = 310000;
const encoder = new TextEncoder();
const toBase64 = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)));
const fromBase64 = text => Uint8Array.from(atob(text), c => c.charCodeAt(0));
async function derive(password, salt, iterations) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({
    name: 'PBKDF2',
    salt,
    iterations,
    hash: 'SHA-256'
  }, key, 256);
  return toBase64(bits);
}
export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return {
    salt: toBase64(salt),
    hash: await derive(password, salt, ITERATIONS),
    iterations: ITERATIONS
  };
}
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
export async function verifyPassword(password, record) {
  const hash = await derive(password, fromBase64(record.salt), record.iterations);
  return safeEqual(hash, record.hash);
}
