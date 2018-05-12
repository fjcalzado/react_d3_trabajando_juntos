export const getRandomArray = (n, min, max) => () => {
  return Array.from({length: n}, () => Math.random() * (max - min) + min);
}
