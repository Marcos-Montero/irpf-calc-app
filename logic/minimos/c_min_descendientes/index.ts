const c_min_descendientes = (
  hijosMenores25Anos: number,
  hijosMenores3Anos: number,
  hijosEnExclusiva: boolean
) => {
  const factorExclusiva = hijosEnExclusiva ? 1 : 0.5;
  const cuotaPorHijosMenoresA3Anos = hijosMenores3Anos * 2800;
  const reduccion =
    reduccionPorHijos(hijosMenores25Anos) + cuotaPorHijosMenoresA3Anos;
  return reduccion * factorExclusiva;
};

const reduccionPorHijos = (hijosMenores25Anos: number) => {
  const reduccionPor1 = 2400;
  const reduccionPor2 = reduccionPor1 + 2700;
  const reduccionPor3 = reduccionPor2 + 4000;
  const reduccionPor4 = reduccionPor3 + 4500;

  const diffOver4 = hijosMenores25Anos - 4;
  const over4 = reduccionPor4 + 4500 * diffOver4;

  switch (hijosMenores25Anos) {
    case 0:
      return 0;
    case 1:
      return reduccionPor1;
    case 2:
      return reduccionPor2;
    case 3:
      return reduccionPor3;
    case 4:
      return reduccionPor4;
    default:
      return over4;
  }
};
