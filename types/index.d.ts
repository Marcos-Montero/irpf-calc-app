export type form = {
  nPagas: "12" | "14";
  categoriaProfesional: TCategoriasProfesionales;
  hijosEnExclusiva: boolean;
  movilidadGeografica: boolean;
  minusvalia33al65: boolean;
  minusvaliaSupAl65: boolean;
  situacionFamiliar: TSituacionFamiliar;
  tipoContratoLaboral: TTipoContratoLaboral;
  brutoAnual: number;
  edad: number;
  hijosMenores3Anos: number;
  hijosMenores25Anos: number;
  ascendienteMayor65Menor75: number;
  ascendienteMayor75: number;
  menor65ConDiscapacidadCargo: number;
  descendientesConMinusvalia33Al65: number;
  descendientesConMinusvaliaSupAl65: number;
  ascendientesConMinusvalia33al65: number;
  ascendientesConMinusvaliaSupAl65: number;
  nPersonasDeduccionAscendientes: number;
};
export type TTipoContratoLaboral = "1" | undefined;
export type TSituacionFamiliar = "A" | "B" | "C";
export type TCategoriasProfesionales =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K";
export type catTramos = 0 | 1 | 2 | 3 | 4 | 5;
export type TTramo = { q: number; f: number };
