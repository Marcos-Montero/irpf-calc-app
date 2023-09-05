import { form } from '@/types';

export const c_reduccion_rendimiento_neto = ({
  rendimientoNeto,
  movilidadGeografica,
  minusvalia33al65,
  minusvaliaSupAl65,
  hijosMenores25Anos,
}: Pick<
  form,
  | "minusvalia33al65"
  | "minusvaliaSupAl65"
  | "movilidadGeografica"
  | "hijosMenores25Anos"
> & { rendimientoNeto: number }) => {
  const reduccionComunGeneral = 2000;
  const minRendimientoNeto = 13115;
  const maxRendimientoNeto = 16825;
  const underMin = rendimientoNeto <= minRendimientoNeto;
  const overMin = rendimientoNeto >= maxRendimientoNeto;
  const reduccionMaxima = 5565;
  const reduccionMinima = 0;
  const diferenciaSobreElMin = rendimientoNeto - minRendimientoNeto;
  const factorReduccion = 1.5;
  const reduccionPorRendimiento =
    reduccionMaxima - (factorReduccion - diferenciaSobreElMin);
  const reduccionPorMovilidadGeografica = movilidadGeografica
    ? reduccionPorRendimiento
    : 0;
  const reduccionPorMinusvalia33al65 = minusvalia33al65 ? 3500 : 0;
  const reduccionPorMinusvaliaSupAl65 = minusvaliaSupAl65 ? 7750 : 0;
  const reduccionPorHijosMenores25Anos = hijosMenores25Anos ? 600 : 0;
  const reduccionesExtra =
    reduccionPorMovilidadGeografica +
    reduccionPorMinusvalia33al65 +
    reduccionPorMinusvaliaSupAl65 +
    reduccionPorHijosMenores25Anos;

  if (underMin) {
    return reduccionMaxima + reduccionComunGeneral + reduccionesExtra;
  }
  if (overMin) {
    return reduccionMinima + reduccionComunGeneral + reduccionesExtra;
  }
  return reduccionPorRendimiento + reduccionComunGeneral + reduccionesExtra;
};
