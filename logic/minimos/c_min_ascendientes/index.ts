import { form } from '@/types';

export const c_min_ascendientes = ({
  nPersonasDeduccionAscendientes,
  ascendienteMayor65Menor75,
  ascendienteMayor75,
  menor65ConDiscapacidadCargo,
}: Pick<
  form,
  | "nPersonasDeduccionAscendientes"
  | "ascendienteMayor65Menor75"
  | "ascendienteMayor75"
  | "menor65ConDiscapacidadCargo"
>) => {
  if (
    nPersonasDeduccionAscendientes !==
    ascendienteMayor65Menor75 + ascendienteMayor75
  ) {
    throw new Error(
      "Error en c_min_ascendientes: nPersonasDeduccionAscendientes y los ascendientes no coinciden"
    );
  }
  const divisor =
    nPersonasDeduccionAscendientes > 1 ? nPersonasDeduccionAscendientes : 1;
  const minMayor75 = (ascendienteMayor75 * 2550) / divisor;
  const minMayor65 = (ascendienteMayor65Menor75 * 1150) / divisor;
  const minMenor65Discapacidad = (menor65ConDiscapacidadCargo * 1150) / divisor;

  return minMayor75 + minMayor65 + minMenor65Discapacidad;
};
