export function pickRandomElement<T>(arr: Array<T>) {
  return arr[Math.floor(Math.random() * arr.length)];
}
