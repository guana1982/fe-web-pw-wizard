export const sliceFnc = function (text, sliceTo) {

  const slice = text.slice(0, sliceTo);
  const result = slice + '*'.repeat(text.length - slice.length);
  return result;
};