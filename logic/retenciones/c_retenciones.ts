import { c_tramos_base_liquidable } from "./c_tramos_base_liquidable";

export const c_retenciones = ({
  baseImponible,
  brutoAnual,
  sumaMinimos,
}: {
  baseImponible: number;
  sumaMinimos: number;
  brutoAnual: number;
}) => {
  const r = (x: number): number => parseFloat(x.toFixed(2));
  const cuotaMinimos = c_tramos_base_liquidable(sumaMinimos);
  const cuotaBaseImponible = c_tramos_base_liquidable(baseImponible);
  const cuotaRetencion = r(cuotaBaseImponible - cuotaMinimos);

  const tipoPrevio = (cuotaRetencion / brutoAnual) * 100;
  const importePrevioRetencion = r((tipoPrevio / 100) * brutoAnual);

  const tipoFinalRetencionTruncado =
    Math.trunc((importePrevioRetencion / brutoAnual) * 100) > 0
      ? Math.trunc((importePrevioRetencion / brutoAnual) * 100)
      : 0;

  const importeFinalRetencion = (tipoFinalRetencionTruncado / 100) * brutoAnual;
  return importeFinalRetencion;
};
