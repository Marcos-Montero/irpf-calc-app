import { form } from "@/types";

export const c_min_minusvalias = ({
  descendientesConMinusvalia33Al65,
  descendientesConMinusvaliaSupAl65,
  hijosEnExclusiva,
  nPersonasDeduccionAscendientes,
  ascendientesConMinusvalia33al65,
  ascendientesConMinusvaliaSupAl65,
  minusvalia33al65,
  minusvaliaSupAl65,
}: Pick<
  form,
  | "descendientesConMinusvalia33Al65"
  | "descendientesConMinusvaliaSupAl65"
  | "hijosEnExclusiva"
  | "nPersonasDeduccionAscendientes"
  | "ascendientesConMinusvalia33al65"
  | "ascendientesConMinusvaliaSupAl65"
  | "minusvalia33al65"
  | "minusvaliaSupAl65"
>) => {
  // Descendientes
  const cuotaPorDescendientesConMinusvalia33Al65 =
    descendientesConMinusvalia33Al65 * 3000;
  const minDescendientesConMinusvalia33Al65 = hijosEnExclusiva
    ? cuotaPorDescendientesConMinusvalia33Al65
    : cuotaPorDescendientesConMinusvalia33Al65 / 2;

  const cuotaDescendientesConMinusvaliaSupAl65 =
    descendientesConMinusvaliaSupAl65 * 12000;
  const minDescendientesConMinusvaliaSupAl65 = hijosEnExclusiva
    ? cuotaDescendientesConMinusvaliaSupAl65
    : cuotaDescendientesConMinusvaliaSupAl65 / 2;

  const minDescendientes =
    minDescendientesConMinusvalia33Al65 + minDescendientesConMinusvaliaSupAl65;

  // Ascendientes
  const divisor =
    nPersonasDeduccionAscendientes > 1 ? nPersonasDeduccionAscendientes : 1;
  const cuotaPorAscendientesConMinusvaliaSupAl65 =
    ascendientesConMinusvaliaSupAl65
      ? (ascendientesConMinusvaliaSupAl65 * 12000) / divisor
      : 0;
  const cuotaPorAscendientesConMinusvalia33Al65 =
    ascendientesConMinusvalia33al65
      ? (ascendientesConMinusvalia33al65 * 3000) / divisor
      : 0;

  const minAscendientes =
    cuotaPorAscendientesConMinusvaliaSupAl65 +
    cuotaPorAscendientesConMinusvalia33Al65;

  // Minusvalia personal
  const getMinPorMinusvaliaPersonal = () => {
    if (minusvaliaSupAl65) {
      return 12000;
    }
    if (minusvalia33al65) {
      return 3000;
    }
    return 0;
  };
  const minPersonal = getMinPorMinusvaliaPersonal();

  return minDescendientes + minAscendientes + minPersonal;
};
