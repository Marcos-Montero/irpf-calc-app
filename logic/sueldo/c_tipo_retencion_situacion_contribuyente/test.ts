import {
  TSituacionFamiliar,
  TTipoContratoLaboral,
} from '@/types';

import { c_tipo_retencion_situacion_contribuyente } from './';

const mockPreviousRetenciones = 12;
const mock = (
  b: number,
  s: TSituacionFamiliar,
  h: number,
  t: TTipoContratoLaboral = undefined,
  r: number = mockPreviousRetenciones
) =>
  fn({
    retenciones: r,
    situacionFamiliar: s,
    hijosMenores25Anos: h,
    brutoAnual: b,
    tipoContratoLaboral: t,
  });
const fn = c_tipo_retencion_situacion_contribuyente;
describe("Calculo de retenciones", () => {
  describe("situacion A", () => {
    describe("hijosMenores25Anos == 1", () => {
      it("should return 0 under 14266 and previous over it", () => {
        const hijo1Under = mock(14265, "A", 1);
        expect(hijo1Under).toBe(0);
        const hijo1Over = mock(14267, "A", 1);
        expect(hijo1Over).toBe(mockPreviousRetenciones);
      });
    });
    describe("hijosMenores25Anos > 1", () => {
      it("should return 0 under 15803 and previous over it", () => {
        const hijo2Under = mock(15802, "A", 2);
        expect(hijo2Under).toBe(0);
        const hijo2Over = mock(15804, "A", 2);
        expect(hijo2Over).toBe(mockPreviousRetenciones);
      });
    });
  });
  describe("situacion B", () => {
    describe("hijosMenores25Anos == 0", () => {
      it("should return 0 under 13696 and previous over it", () => {
        const hijo0Under = mock(13695, "B", 0);
        expect(hijo0Under).toBe(0);
        const hijo0Over = mock(13697, "B", 0);
        expect(hijo0Over).toBe(mockPreviousRetenciones);
      });
    });
    describe("hijosMenores25Anos == 1", () => {
      it("should return 0 under 14985 and previous over it", () => {
        const hijo1Under = mock(14984, "B", 1);
        expect(hijo1Under).toBe(0);
        const hijo1Over = mock(14986, "B", 1);
        expect(hijo1Over).toBe(mockPreviousRetenciones);
      });
    });
    describe("hijosMenores25Anos > 1", () => {
      it("should return 0 under 17138 and previous over it", () => {
        const hijo2Under = mock(17137, "B", 2);
        expect(hijo2Under).toBe(0);
        const hijo2Over = mock(17139, "B", 2);
        expect(hijo2Over).toBe(mockPreviousRetenciones);
      });
    });
  });
  describe("situacion C", () => {
    describe("hijosMenores25Anos == 0", () => {
      it("should return 0 under 12000 and previous over it", () => {
        const hijo0Under = mock(11999, "C", 0);
        expect(hijo0Under).toBe(0);
        const hijo0Over = mock(12001, "C", 0);
        expect(hijo0Over).toBe(mockPreviousRetenciones);
      });
    });
    describe("hijosMenores25Anos == 1", () => {
      it("should return 0 under 12607 and previous over it", () => {
        const hijo1Under = mock(12606, "C", 1);
        expect(hijo1Under).toBe(0);
        const hijo1Over = mock(12608, "C", 1);
        expect(hijo1Over).toBe(mockPreviousRetenciones);
      });
    });
    describe("hijosMenores25Anos > 1", () => {
      it("should return 0 under 13275 and previous over it", () => {
        const hijo2Under = mock(13274, "C", 2);
        expect(hijo2Under).toBe(0);
        const hijo2Over = mock(13276, "C", 2);
        expect(hijo2Over).toBe(mockPreviousRetenciones);
      });
    });
  });
});
