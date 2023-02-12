const normalizeCharCode = charCode => charCode === 32 ? -1 : charCode / 128 - 1;
const denormalizeCharCode = charCode => charCode === -1 ? 32 : (charCode + 1) * 128;

const getCharCodes = (str, normalize) => {
  const charCodes = [];
  for (let i = 0, len = str.length; i < len; i++) {
    charCodes.push(normalize ? normalizeCharCode(str.charCodeAt(i)) : str.charCodeAt(i));
  }
  return charCodes;
};

const getCharsFromCodes = (charCodes, denormalize) => charCodes.map(charCode => String.fromCharCode(denormalize ? denormalizeCharCode(charCode) : charCode)).join('');

const transformTextToCharBag = (text, normalize, flatten) => {
  if (flatten) return getCharCodes(text, normalize);

  const charIds = getCharCodes(text, normalize);
  const spaceIndexes = [];
  const words = [];

  for (let i = 0, len = charIds.length; i < len; i++) {
    if (normalize ? charIds[i] === -1 : charIds[i] === 32) {
      spaceIndexes.push(i);
    }
  }

  for (let i = 0, len = spaceIndexes.length; i < len; i++) {
    const start = spaceIndexes[i - 1] ? spaceIndexes[i - 1] + 1 : 0;
    const end = spaceIndexes[i];
    words.push(charIds.slice(start, end));
  }
  words.push(charIds.slice(spaceIndexes[spaceIndexes.length - 1] + 1));

  return words;
};

const transformCharBagToText = (charBag, denormalize, flatten) => {
  return flatten ? getCharsFromCodes(charBag, denormalize) : charBag.map(charIds => getCharsFromCodes(charIds, denormalize)).join(' ');
};

module.exports = class Transformer {
  constructor({ normalized = false, flatten = false } = {}) {
    this.normalized = normalized;
    this.flatten = flatten;
  }

  encode(text) {
    return transformTextToCharBag(text, this.normalized, this.flatten);
  }

  decode(charBag) {
    return transformCharBagToText(charBag, this.normalized, this.flatten);
  }
};