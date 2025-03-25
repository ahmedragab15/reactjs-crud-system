/**
 * 
 * @param {string} txt ~ the input text to be sliced
 * @returns ~ the sliced text with on ellipsis (...) less than 100 char
 */

export const txtSlicer = (txt: string) => txt.length >= 100 ? `${txt.slice(0, 100)}...` : txt;
