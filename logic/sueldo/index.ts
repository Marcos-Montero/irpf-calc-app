import {
  TCategoriasProfesionales,
  TSituacionFamiliar,
} from '@/types';

import { c_cuota_mensual_pagar } from '../base_imponible/c_cuota_mensual_pagar';
import {
  c_tipo_retencion_situacion_contribuyente,
} from './c_tipo_retencion_situacion_contribuyente';

export const c_sueldo = ({
  brutoAnual,
  categoriaProfesional,
  situacionFamiliar,
  hijosMenores25Anos,
  retenciones,
  tipoContratoLaboral,
}: {
  brutoAnual: number;
  categoriaProfesional: TCategoriasProfesionales;
  situacionFamiliar: TSituacionFamiliar;
  hijosMenores25Anos: number;
  retenciones: number;
  tipoContratoLaboral: "1" | undefined;
}) => {
  const seguridadSocial =
    c_cuota_mensual_pagar({
      brutoAnual,
      categoriaProfesional,
    }) * 12;

  const tipoRetencion = c_tipo_retencion_situacion_contribuyente({
    retenciones,
    situacionFamiliar,
    hijosMenores25Anos,
    brutoAnual,
    tipoContratoLaboral,
  });

  const sueldoNeto = brutoAnual - seguridadSocial - retenciones;
  const sueldoNeto12Pagas = sueldoNeto / 12;
  const pagasExtras = (brutoAnual - retenciones) / 14;
  const salarioMensual = pagasExtras - seguridadSocial / 12;

  return { tipoRetencion, salarioMensual, sueldoNeto12Pagas };
};
