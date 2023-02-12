const normalizeCharCode = (charCode) => {
  // normalize the full range of charCodes (normalize between -1 and 1) for utf-8
  if (charCode === 32) return -1;
  return charCode / 128 - 1;
};

const denormalizeCharCode = (charCode) => {
  // denormalize the full range of charCodes (denormalize between -1 and 1) for utf-8
  if (charCode === -1) return 32;
  return (charCode + 1) * 128;
};

const getCharCodes = (str, n) => {
  const charCodes = [];
  for (let i = 0; i < str.length; i += 1) {
    charCodes.push(
      n ? normalizeCharCode(str.charCodeAt(i)) : str.charCodeAt(i)
    );
  }
  return charCodes;
};

const getCharsFromCodes = (charCodes, n) => {
  const chars = [];
  for (let i = 0; i < charCodes.length; i += 1) {
    chars.push(
      String.fromCharCode(n ? denormalizeCharCode(charCodes[i]) : charCodes[i])
    );
  }
  return chars.join('');
};

const transformTextToCharBag = (text, n) => {
  const charIds = getCharCodes(text, n);

  const spaceIndexes = charIds.reduce((acc, charId, index) => {
    if (n ? charId === -1 : charId === 32) {
      acc.push(index);
    }
    return acc;
  }, []);

  // split charIds into words by spaceIndexes
  const words = [];

  for (let i = 0; i < spaceIndexes.length; i += 1) {
    const start = spaceIndexes[i - 1] ? spaceIndexes[i - 1] + 1 : 0;
    const end = spaceIndexes[i];
    words.push(charIds.slice(start, end));
  }

  // add last word
  const start = spaceIndexes[spaceIndexes.length - 1] + 1;

  words.push(charIds.slice(start));

  return words;
};

const transformCharBagToText = (charBag, n) => {
  const charCodes = charBag.reduce((acc, charIds) => {
    acc.push(...charIds);

    // add space if not last word
    if (charBag.indexOf(charIds) !== charBag.length - 1) acc.push(n ? -1 : 32);

    return acc;
  }, []);

  return getCharsFromCodes(charCodes, n);
};

module.exports = class Transformer {
  constructor(options = {}) {
    this.normalized = options.normalized || false;
  }

  encode(text) {
    return transformTextToCharBag(text, this.normalized);
  }

  decode(charBag) {
    return transformCharBagToText(charBag, this.normalized);
  }
};
