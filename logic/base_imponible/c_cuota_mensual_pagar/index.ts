import { minMaxPorCategoriaProfesional } from '@/constants';
import {
  form,
  TCategoriasProfesionales,
} from '@/types';

export const c_cuota_mensual_pagar = ({
  brutoAnual,
  categoriaProfesional,
}: {
  brutoAnual: form["brutoAnual"];
  categoriaProfesional: TCategoriasProfesionales;
}) => {
  const brutoMensual = brutoAnual / 12;
  const minProfesional =
    minMaxPorCategoriaProfesional[categoriaProfesional].min;
  const maxProfesional =
    minMaxPorCategoriaProfesional[categoriaProfesional].max;
  const underMin = brutoMensual < minProfesional;
  const overMax = brutoMensual > maxProfesional;

  if (underMin) {
    return minProfesional * 0.0635;
  }
  if (overMax) {
    return maxProfesional * 0.0635;
  }
  return brutoMensual * 0.0635;
};
