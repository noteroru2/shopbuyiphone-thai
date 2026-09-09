import fs from 'node:fs';

const statePath = new URL('../observations/iphone-i5-production-state.json', import.meta.url);
const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));

function arg(name) {
  const prefix = `--${name}=`;
  return process.argv.find((value) => value.startsWith(prefix))?.slice(prefix.length) ?? null;
}

function utcDay(value) {
  const [y, m, d] = value.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

const latestFinalizedDate = arg('latest-finalized-date') || process.env.LATEST_FINALIZED_DATE || null;

if (!state.observationClockActive || !state.productionPassDate) {
  console.log(
    JSON.stringify(
      {
        gate: 'IPHONE_I5_OBSERVATION',
        verdict: 'WAIT_FOR_PRODUCTION_PASS',
        observationClockActive: false,
        productionPassDate: state.productionPassDate,
        latestFinalizedDate,
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

if (!latestFinalizedDate) {
  console.error('Provide --latest-finalized-date=YYYY-MM-DD or LATEST_FINALIZED_DATE.');
  process.exit(2);
}

const finalizedPostPassDays = Math.max(
  0,
  Math.floor((utcDay(latestFinalizedDate) - utcDay(state.productionPassDate)) / 86400000),
);

const verdict =
  finalizedPostPassDays >= 14
    ? 'READY_FOR_14D_REVIEW'
    : finalizedPostPassDays >= 7
      ? 'READY_FOR_7D_REVIEW'
      : 'WAIT_FOR_MORE_DATA';

console.log(
  JSON.stringify(
    {
      gate: 'IPHONE_I5_OBSERVATION',
      verdict,
      observationClockActive: true,
      productionPassDate: state.productionPassDate,
      latestFinalizedDate,
      finalizedPostPassDays,
      baseline: state.baseline,
    },
    null,
    2,
  ),
);
