import { minMaxPorCategoriaProfesional } from '@/constants';
import { TCategoriasProfesionales } from '@/types';

import { c_cuota_mensual_pagar } from './';

const mock = (b: number, c: TCategoriasProfesionales) =>
  fn({
    brutoAnual: b,
    categoriaProfesional: c,
  });
const fn = c_cuota_mensual_pagar;
const { A, B, C, D, E, F, G, H, I, J, K } = minMaxPorCategoriaProfesional;
describe("Calcular Cuota mensual a pagar", () => {
  describe("Categoria A", () => {
    it("should return the same value if underMin", () => {
      const returnValue1 = mock(12 * A.min - 1, "A");
      const returnValue2 = mock(12 * A.min - 2, "A");
      expect(returnValue1).toBe(93.11640000000001);
      expect(returnValue1).toEqual(returnValue2);
    });
    it("should return different values if between min and max", () => {
      const returnValue1 = mock(12 * A.max - 1, "A");
      const returnValue2 = mock(12 * A.max - 2, "A");
      expect(returnValue1).toBe(258.4460583333333);
      expect(returnValue2).toBe(258.44076666666666);
      expect(returnValue1).not.toEqual(returnValue2);
    });
    it("should return the same value if  overMax", () => {
      const returnValue1 = mock(12 * A.max + 1, "A");
      const returnValue2 = mock(12 * A.max + 2, "A");
      expect(returnValue1).toBe(258.45135);
      expect(returnValue1).toEqual(returnValue2);
    });
  });
  describe("Categoria B", () => {
    it("should return the same value if underMin", () => {
      const returnValue1 = mock(12 * B.min - 1, "B");
      const returnValue2 = mock(12 * B.min - 2, "B");
      expect(returnValue1).toBe(77.20965000000001);
      expect(returnValue1).toEqual(returnValue2);
    });
    it("should return different values if between min and max", () => {
      const returnValue1 = mock(12 * B.max - 1, "B");
      const returnValue2 = mock(12 * B.max - 2, "B");
      expect(returnValue1).toBe(258.4460583333333);
      expect(returnValue2).toBe(258.44076666666666);
      expect(returnValue1).not.toEqual(returnValue2);
    });
    it("should return the same value if  overMax", () => {
      const returnValue1 = mock(12 * B.max + 1, "B");
      const returnValue2 = mock(12 * B.max + 2, "B");
      expect(returnValue1).toBe(258.45135);
      expect(returnValue1).toEqual(returnValue2);
    });
  });
  describe("The Rest of categories", () => {
    const testCategory = (
      cat: "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K"
    ) => {
      it("should return the same value if underMin", () => {
        const returnValue1 = mock(
          12 * minMaxPorCategoriaProfesional[cat].min - 1,
          cat
        );
        const returnValue2 = mock(
          12 * minMaxPorCategoriaProfesional[cat].min - 2,
          cat
        );
        expect(returnValue1).toBe(66.675);
        expect(returnValue1).toEqual(returnValue2);
      });
      it("should return different values if between min and max", () => {
        const returnValue1 = mock(
          12 * minMaxPorCategoriaProfesional[cat].max - 1,
          cat
        );
        const returnValue2 = mock(
          12 * minMaxPorCategoriaProfesional[cat].max - 2,
          cat
        );
        expect(returnValue1).toBe(258.4460583333333);
        expect(returnValue2).toBe(258.44076666666666);
        expect(returnValue1).not.toEqual(returnValue2);
      });
      it("should return the same value if  overMax", () => {
        const returnValue1 = mock(
          12 * minMaxPorCategoriaProfesional[cat].max + 1,
          cat
        );
        const returnValue2 = mock(
          12 * minMaxPorCategoriaProfesional[cat].max + 2,
          cat
        );
        expect(returnValue1).toBe(258.45135);
        expect(returnValue1).toEqual(returnValue2);
      });
    };
    testCategory("C");
    testCategory("D");
    testCategory("E");
    testCategory("F");
    testCategory("G");
    testCategory("H");
    testCategory("I");
    testCategory("J");
    testCategory("K");
  });
});
