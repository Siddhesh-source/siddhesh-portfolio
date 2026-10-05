/** Subsequence match with a simple score (consecutive and early matches rank higher). Returns -1 for no match. */
export function score(query, text) {
  const q = query.toLowerCase(), t = text.toLowerCase();
  if (!q) return 0;
  let qi = 0, s = 0, run = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) { qi++; run++; s += 1 + run * 2 - i * 0.01; } else run = 0;
  }
  return qi === q.length ? s : -1;
}

export function rank(query, items, key = (x) => x) {
  return items
    .map((it) => [score(query, key(it)), it])
    .filter(([s]) => s >= 0)
    .sort((a, b) => b[0] - a[0])
    .map(([, it]) => it);
}
