import { TCategoriasProfesionales, TTramo } from "@/types";

export const categoriasProfesionales = {
  A: "Ingenieros y Licenciados",
  B: "Ingenieros Técnicos, Peritos y Ayudantes Titulados",
  C: "Jefes Administrativos y de Taller",
  D: "Ayudantes no Titulados",
  E: "Oficiales Administrativos",
  F: "Subalternos",
  G: "Auxiliares Administrativos",
  H: "Oficiales de primera y segunda",
  I: "Oficiales de tercera y Especialistas",
  J: "Peones",
  K: "Trabajadores menores de dieciocho años, cualquiera",
};
export const minMaxPorCategoriaProfesional: Record<
  TCategoriasProfesionales,
  { min: number; max: number }
> = {
  A: { min: 1466.4, max: 4070.1 },
  B: { min: 1215.9, max: 4070.1 },
  C: { min: 1050.0, max: 4070.1 },
  D: { min: 1050.0, max: 4070.1 },
  E: { min: 1050.0, max: 4070.1 },
  F: { min: 1050.0, max: 4070.1 },
  G: { min: 1050.0, max: 4070.1 },
  H: { min: 1050.0, max: 4070.1 },
  I: { min: 1050.0, max: 4070.1 },
  J: { min: 1050.0, max: 4070.1 },
  K: { min: 1050.0, max: 4070.1 },
};
export const tramos: TTramo[] = [
  { q: 12450, f: 0.19 },
  { q: 20200, f: 0.24 },
  { q: 35200, f: 0.3 },
  { q: 60000, f: 0.37 },
  { q: 300000, f: 0.45 },
  { q: Number.MAX_SAFE_INTEGER, f: 0.47 },
];
