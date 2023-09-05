import { form } from '@/types';

import { c_cuota_mensual_pagar } from './c_cuota_mensual_pagar';
import { c_reduccion_rendimiento_neto } from './c_reduccion_rendimiento_neto';

export const c_base_imponible = ({
  brutoAnual,
  categoriaProfesional,
  hijosMenores25Anos,
  movilidadGeografica,
  minusvalia33al65,
  minusvaliaSupAl65,
}: Pick<
  form,
  | "brutoAnual"
  | "categoriaProfesional"
  | "hijosMenores25Anos"
  | "movilidadGeografica"
  | "minusvalia33al65"
  | "minusvaliaSupAl65"
>) => {
  const cuotaMensualPagar = c_cuota_mensual_pagar({
    brutoAnual,
    categoriaProfesional,
  });
  const cuotaAcumuladoAno = cuotaMensualPagar * 12;
  const rendimientoNeto = brutoAnual - cuotaAcumuladoAno;
  const reduccionRendimientoNeto = c_reduccion_rendimiento_neto({
    rendimientoNeto,
    movilidadGeografica,
    minusvalia33al65,
    minusvaliaSupAl65,
    hijosMenores25Anos,
  });

  const baseImponible =
    brutoAnual - cuotaAcumuladoAno - reduccionRendimientoNeto;
  return baseImponible > 0 ? baseImponible : 0;
};
