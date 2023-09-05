import { c_min_ascendientes } from './';

const fn = c_min_ascendientes;
const mock = (a75: number, a65: number, m: number, n: number) =>
  fn({
    nPersonasDeduccionAscendientes: n,
    ascendienteMayor75: a75,
    ascendienteMayor65Menor75: a65,
    menor65ConDiscapacidadCargo: m,
  });
/* const divisor =
  nPersonasDeduccionAscendientes > 1 ? nPersonasDeduccionAscendientes : 1;
const minMayor75 = (ascendienteMayor75 * 2550) / divisor;
const minMayor65 = (ascendienteMayor65Menor75 * 1150) / divisor;
const minMenor65Discapacidad = (menor65ConDiscapacidadCargo * 1150) / divisor; */
describe("calculate min ascendientes", () => {
  it("1 de cada = 2425 ", () => {
    const returnValue = mock(1, 1, 1, 2);
    expect(returnValue).toBe(2425);
  });
  it("1 menorCargo = 1150", () => {
    const returnValue = mock(0, 0, 1, 0);
    expect(returnValue).toBe(1150);
  });
  it("1 asc75 = 2550", () => {
    const returnValue = mock(1, 0, 0, 1);
    expect(returnValue).toBe(2550);
  });
  it("1 asc65 = 1150", () => {
    const returnValue = mock(0, 1, 0, 1);
    expect(returnValue).toBe(1150);
  });
  it("2 asc65 + 2 asc75 + 1mC = 1150", () => {
    const returnValue = mock(2, 2, 1, 4);
    expect(returnValue).toBe(2137.5);
  });
  it("should throw if the sum of asc is diff from nPersonasDeduccionAscendientes", () => {
    expect(() => mock(2, 1, 1, 0)).toThrow(
      "Error en c_min_ascendientes: nPersonasDeduccionAscendientes y los ascendientes no coinciden"
    );
  });
});
