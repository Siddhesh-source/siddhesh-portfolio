// Pure logic shared by the widgets and the terminal.

export const STOCK = 100;

/**
 * Flash-sale wave model: requests arrive in 10 waves. Naive read-then-write lets a whole wave act on the
 * same stale stock; the atomic path decrements and checks in one step. A simulation of the failure
 * mode, not a benchmark of the real system.
 */
export function simulate(requests, atomic) {
  const wave = Math.max(1, Math.round(requests / 10));
  let stock = STOCK, sold = 0, done = 0;
  const steps = [];
  while (done < requests) {
    const w = Math.min(wave, requests - done);
    done += w;
    if (atomic) { const t = Math.min(stock, w); sold += t; stock -= t; }
    else if (stock > 0) { sold += w; stock = Math.max(0, stock - w); }
    steps.push({ done, sold, stock, oversold: Math.max(0, sold - STOCK) });
  }
  return steps;
}

/** Weighted fusion of signal streams: sum of value x weight. */
export function composite(streams) {
  return streams.reduce((a, x) => a + x.value * x.weight, 0);
}
