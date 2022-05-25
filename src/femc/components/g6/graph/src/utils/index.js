function uniqueId() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return S4() + S4() + '' + S4() + '' + S4() + '' + S4() + '' + S4() + S4() + S4();
}
const getBox = (x, y, width, height) => {
  const x1 = x + width < x ? x + width : x;
  const x2 = x + width > x ? x + width : x;
  const y1 = y + height < y ? y + height : y;
  const y2 = y + height > y ? y + height : y;
  return {
    x1,
    x2,
    y1,
    y2,
  };
};
export { uniqueId, getBox };
