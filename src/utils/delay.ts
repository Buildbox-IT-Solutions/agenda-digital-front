/**
 * Delays execution for a specified amount of time.
 *
 * @param {number} ms - The time to delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 *
 * @example
 * // Wait for 1 second
 * await delay(1000);
 */
export function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
