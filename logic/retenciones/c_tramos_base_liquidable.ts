import { tramos } from "@/constants";
import { catTramos } from "@/types";

export const c_tramos_base_liquidable = (base: number) => {
  const sumaTramos = tramos.reduce((suma, tramo, i) => {
    const cotizacionTramo = getCotizacionDeTramo(base, i as catTramos);
    return suma + cotizacionTramo;
  }, 0);

  return sumaTramos;
};

const getCotizacionDeTramo = (base: number, tramo: catTramos) => {
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
