import { form } from '@/types';

import { c_min_ascendientes } from './c_min_ascendientes';
import { c_min_minusvalias } from './c_min_minusvalias';
import { c_min_personal } from './c_min_personal';

export const c_min_personal_y_familiar = ({
  edad,
  hijosMenores25Anos,
  hijosEnExclusiva,
  hijosMenores3Anos,
  nPersonasDeduccionAscendientes,
  ascendienteMayor65Menor75,
  ascendienteMayor75,
  menor65ConDiscapacidadCargo,
  descendientesConMinusvalia33Al65,
  descendientesConMinusvaliaSupAl65,
  ascendientesConMinusvalia33al65,
  ascendientesConMinusvaliaSupAl65,
  minusvalia33al65,
  minusvaliaSupAl65,
}: Pick<
  form,
  | "edad"
  | "hijosEnExclusiva"
  | "hijosMenores25Anos"
  | "hijosMenores3Anos"
  | "nPersonasDeduccionAscendientes"
  | "ascendienteMayor65Menor75"
  | "ascendienteMayor75"
  | "menor65ConDiscapacidadCargo"
  | "descendientesConMinusvalia33Al65"
  | "descendientesConMinusvaliaSupAl65"
  | "ascendientesConMinusvalia33al65"
  | "ascendientesConMinusvaliaSupAl65"
  | "minusvalia33al65"
  | "minusvaliaSupAl65"
>) => {
  const minPersonal = c_min_personal(edad);

  const minDescendientes = c_min_descendientes(
    hijosMenores25Anos,
    hijosMenores3Anos,
    hijosEnExclusiva
  );

  const minAscendientes = c_min_ascendientes({
    ascendienteMayor65Menor75,
    ascendienteMayor75,
    menor65ConDiscapacidadCargo,
    nPersonasDeduccionAscendientes,
  });

  const minMinusvalias = c_min_minusvalias({
    descendientesConMinusvalia33Al65,
    descendientesConMinusvaliaSupAl65,
    hijosEnExclusiva,
    nPersonasDeduccionAscendientes,
    ascendientesConMinusvalia33al65,
    ascendientesConMinusvaliaSupAl65,
    minusvalia33al65,
    minusvaliaSupAl65,
  });

  return minPersonal + minDescendientes + minAscendientes + minMinusvalias;
};
