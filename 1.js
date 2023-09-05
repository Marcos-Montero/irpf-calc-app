const tramos = [
  { q: 12450, f: 0.19 },
  { q: 20200, f: 0.24 },
  { q: 35200, f: 0.3 },
  { q: 60000, f: 0.37 },
  { q: 300000, f: 0.45 },
  { q: Number.MAX_SAFE_INTEGER, f: 0.47 },
];
const getCotizacionDeTramo = (base, tramo) => {
  tramo--;
  const { q, f } = tramos[tramo];
  const prevQ = tramo > 0 ? tramos[tramo - 1].q : 0;
  const inTramo = base < q && base > prevQ;
  const isLastTramo = tramo === 5;

  if (inTramo) {
    const diffBaseVSQ = !isLastTramo ? base - prevQ : base - 300000;
    return diffBaseVSQ * f;
  }
  const overTramo = base > q;
  console.log(overTramo);
  if (overTramo) {
    const maxQDeTramo = q - prevQ;
    return maxQDeTramo * f;
  }
  return 0;
};
const base = 24000;
const t1 = getCotizacionDeTramo(base, 1);
const t2 = getCotizacionDeTramo(base, 2);
const t3 = getCotizacionDeTramo(base, 3);
const t4 = getCotizacionDeTramo(base, 4);
const t5 = getCotizacionDeTramo(base, 5);
const t6 = getCotizacionDeTramo(base, 6);

console.log({
  t1,
  x: 12450 * 0.19,
  t2,
  y: (20200 - 12450) * 0.24,
  t3,
  z: (35200 - 20200) * 0.3,
  t4,
  a: (60000 - 35200) * 0.37,
  t5,
  b: (65000 - 60000) * 0.45,
  t6,
  c: 0,
});
