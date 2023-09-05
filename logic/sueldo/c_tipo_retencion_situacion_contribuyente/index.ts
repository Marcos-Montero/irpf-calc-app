import { TSituacionFamiliar } from '@/types';

export const c_tipo_retencion_situacion_contribuyente = ({
  retenciones,
  situacionFamiliar,
  hijosMenores25Anos,
  brutoAnual,
  tipoContratoLaboral,
}: {
  retenciones: number;
  situacionFamiliar: TSituacionFamiliar;
  hijosMenores25Anos: number;
  brutoAnual: number;
  tipoContratoLaboral: "1" | undefined;
}) => {
  if (
    //A
    (situacionFamiliar == "A" &&
      hijosMenores25Anos == 1 &&
      brutoAnual <= 14266) ||
    (situacionFamiliar == "A" &&
      hijosMenores25Anos > 1 &&
      brutoAnual <= 15803) ||
    //B
    (situacionFamiliar == "B" &&
      hijosMenores25Anos == 0 &&
      brutoAnual <= 13696) ||
    (situacionFamiliar == "B" &&
      hijosMenores25Anos == 1 &&
      brutoAnual <= 14985) ||
    (situacionFamiliar == "B" &&
      hijosMenores25Anos > 1 &&
      brutoAnual <= 17138) ||
    //C
    (situacionFamiliar == "C" &&
      hijosMenores25Anos == 0 &&
      brutoAnual <= 12000) ||
    (situacionFamiliar == "C" &&
      hijosMenores25Anos == 1 &&
      brutoAnual <= 12607) ||
    (situacionFamiliar == "C" && hijosMenores25Anos > 1 && brutoAnual <= 13275)
  ) {
    return tipoContratoLaboral == "1" ? 2 : 0;
  }
  return retenciones;
};
