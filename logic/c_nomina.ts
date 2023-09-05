import { form } from '@/types';

import { c_base_imponible } from './base_imponible/c_base_imponible';
import { c_min_personal_y_familiar } from './minimos/c_min_personal_y_familiar';
import { c_retenciones } from './retenciones/c_retenciones';
import { c_sueldo } from './sueldo';

export const f_calcular_nomina = ({
  nPagas,
  categoriaProfesional,
  hijosEnExclusiva,
  hijosMenores3Anos,
  minusvalia33al65,
  minusvaliaSupAl65,
  situacionFamiliar,
  tipoContratoLaboral,
  brutoAnual,
  edad,
  movilidadGeografica,
  hijosMenores25Anos,
  ascendienteMayor65Menor75,
  ascendienteMayor75,
  menor65ConDiscapacidadCargo,
  nPersonasDeduccionAscendientes,
  descendientesConMinusvalia33Al65,
  descendientesConMinusvaliaSupAl65,
  ascendientesConMinusvalia33al65,
  ascendientesConMinusvaliaSupAl65,
}: form) => {
  // 1
  const baseImponible = c_base_imponible({
    brutoAnual,
    categoriaProfesional,
    hijosMenores25Anos,
    movilidadGeografica,
    minusvalia33al65,
    minusvaliaSupAl65,
  });

  // 2
  const sumaMinimos = c_min_personal_y_familiar({
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
  });

  // 3
  const retenciones = c_retenciones({
    baseImponible,
    brutoAnual,
    sumaMinimos,
  });

  /* paso4: calcular sueldo */
  const { sueldoNeto12Pagas, salarioMensual, tipoRetencion } = c_sueldo({
    brutoAnual,
    categoriaProfesional,
    situacionFamiliar,
    hijosMenores25Anos,
    retenciones,
    tipoContratoLaboral,
  });
  return {
    baseImponible,
    retenciones,
    sumaMinimos,
    sueldoNeto12Pagas,
    salarioMensual,
    tipoRetencion,
  };
};
