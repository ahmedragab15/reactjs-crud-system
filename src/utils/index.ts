/**
 *
 * @param {string} txt ~ the input text to be sliced
 * @returns ~ the sliced text with on ellipsis (...) less than 100 char
 */
//** Can replace with -webkit-line-clamp: 3; in css

export const txtSlicer = (txt: string) => (txt.length >= 100 ? `${txt.slice(0, 100)}...` : txt);

/**
 *
 * @param {string} x - The numeric string to be formatted.
 * @returns {string} A formatted version of the input numeric string with commas as thousand separators.
 *
 */
export const numberWithCommas = (x: string): string => x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
