export const c_min_personal = (edad: number) => {
  const minGeneral = 5550;
  const minOver65 = 5550 + 1150;
  const minOver75 = 5550 + 918 + 1400;
  if (edad > 75) {
    return minOver75;
  }
  if (edad > 65) {
    return minOver65;
  }
  return minGeneral;
};
