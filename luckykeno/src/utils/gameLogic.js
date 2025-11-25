/**
 * Calculates a SHA-256 hash of a given string.
 * @param {string} str The string to hash.
 * @returns {Promise<string>} A promise that resolves to the hex-encoded hash.
 */
async function sha256(str) {
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
 * Retrieves the payout table for a given risk level.
 * @param {string} riskLevel The selected risk level ('low', 'medium', 'high').
 * @returns {object} An object mapping the number of hits to the multiplier.
 */
export function getPayouts(riskLevel) {
  const payoutTables = {
    low: {
      10: 50, 9: 15, 8: 5, 7: 3, 6: 2, 5: 1, 4: 1, 3: 0.5, 2: 0, 1: 0, 0: 0,
    },
    medium: {
      10: 100, 9: 25, 8: 10, 7: 5, 6: 3, 5: 2, 4: 1, 3: 0.5, 2: 0, 1: 0, 0: 0,
    },
    high: {
      10: 250, 9: 50, 8: 15, 7: 8, 6: 4, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: 0,
    },
  };

  return payoutTables[riskLevel] || payoutTables.medium;
}
