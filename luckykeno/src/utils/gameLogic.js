/**
 * Calculates a SHA-256 hash of a given string.
 * @param {string} str The string to hash.
 * @returns {Promise<string>} A promise that resolves to the hex-encoded hash.
 */
export async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Generates the keno game outcome based on seeds and nonce.
 * @param {string} serverSeed The server seed.
 * @param {string} clientSeed The client seed.
 * @param {number} nonce The nonce for this bet.
 * @returns {Promise<number[]>} A promise that resolves to an array of 10 unique numbers (1-40).
 */
export async function getKenoOutcome(serverSeed, clientSeed, nonce) {
  const combinedSeed = `${serverSeed}-${clientSeed}-${nonce}`;
  let currentHash = await sha256(combinedSeed);
  
  const pickedNumbers = new Set();
  let i = 0;

  while (pickedNumbers.size < 10) {
    // If we've exhausted the hash, re-hash it to get more pseudo-randomness
    if (i + 2 > currentHash.length) {
      currentHash = await sha256(currentHash);
      i = 0;
    }

    const hexChunk = currentHash.substring(i, i + 2);
    const decimal = parseInt(hexChunk, 16);
    
    // Map the 0-255 value to our 1-40 range
    const number = (decimal % 40) + 1;
    
    if (!pickedNumbers.has(number)) {
      pickedNumbers.add(number);
    }

    i += 2; // Move to the next 2-character chunk
  }

  return Array.from(pickedNumbers);
}

/**
 * Payout multipliers based on the number of selected spots and the number of hits.
 * The key is the number of spots selected (e.g., 1 to 10).
 * The value is an array of multipliers, where the index corresponds to the number of hits.
 * E.g., PAYOUTS[3] = [0, 1, 3.1, 10.4] means for 3 picks:
 * - 0 hits: 0x
 * - 1 hit: 1x
 * - 2 hits: 3.1x
 * - 3 hits: 10.4x
 */
export const PAYOUTS = {
  1: [0, 3.96],
  2: [0, 1.9, 4.5],
  3: [0, 1, 3.1, 10.4],
  4: [0, 0.8, 1.8, 5, 22.5],
  5: [0, 0.25, 1.4, 4.1, 16.5, 36],
  6: [0, 0, 1, 3.68, 7, 16.5, 40],
  7: [0, 0, 0.47, 3, 4.5, 14, 31, 60],
  8: [0, 0, 0, 2.2, 4, 13, 22, 55, 70],
  9: [0, 0, 0, 1.55, 3, 8, 15, 44, 60, 85],
  10: [0, 0, 0, 1.4, 2.25, 4.5, 8, 17, 50, 80, 100],
};


/**
 * Retrieves the payout table for a given number of picks.
 * @param {number} picks The number of spots selected by the player.
 * @returns {number[]} An array of multipliers for the given number of picks.
 */
export function getPayouts(picks) {
  return PAYOUTS[picks] || [];
}
