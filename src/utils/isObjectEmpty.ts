export function isObjectEmpty(obj: Object) {
  return (
    Object.prototype.toString.call(obj) === '[object Object]' &&
    JSON.stringify(obj) === '{}'
  );
}