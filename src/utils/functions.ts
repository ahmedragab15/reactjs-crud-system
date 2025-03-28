/**
 * 
 * @param {string} txt ~ the input text to be sliced
 * @returns ~ the sliced text with on ellipsis (...) less than 100 char
 */
//** Can replace with -webkit-line-clamp: 3; in css

export const txtSlicer = (txt: string) => txt.length >= 100 ? `${txt.slice(0, 100)}...` : txt;
