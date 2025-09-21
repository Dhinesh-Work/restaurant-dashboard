export const sum = (arr) => arr.reduce((a, b) => a + b, 0)

export function getTopN(mapObj, n = 5) {
  return Object.entries(mapObj)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name, value]) => ({ name, value }))
}
