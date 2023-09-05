/**
 * Detecta la pulsaciÃ³n de la tecla return o intro...
 */
function checkSubmit(e) {
  let keycode;
  if (window.event) keycode = window.event.keyCode;
  else if (e) keycode = e.which;
  else return true;
  if (keycode == 13 || keycode == 3) {
    f_calcular_nomina();
  }
}
// MAIN
function f_calcular_nomina() {
    // evento para marcado
    //f_cal_marcado("cincodias calculadora sueldo neto");
  
    //datos por defecto, combos y checks
    let num_decimales = 2;
    let numero_pagas = document.getElementById("numero_pagas").value;
    let categoria_profesional = document.getElementById(
      "categoria_profesional"
    ).value;
    let hijos_en_exclusiva =
      document.getElementById("hijos_en_exclusiva").checked;
    let minusvalia_33_al_65 = document.getElementById(
      "minusvalia_33_al_65"
    ).checked;
    let minusvalia_sup_al_65 = document.getElementById(
      "minusvalia_sup_al_65"
    ).checked;
  
    let situacion_familiar = document.getElementById("situacion_familiar").value;
    let tipo_contrato_laboral = document.getElementById(
      "tipo_contrato_laboral"
    ).value;
  
    /* Start: Validacion del formulario */
    let bruto_anual = f_format_string_to_number(
      document.getElementById("bruto_anual").value
    );
    if (isNaN(bruto_anual) || bruto_anual <= 0) {
      f_muestra_error("El sueldo bruto anual no es un dato correcto");
      //alert("El sueldo bruto anual no es un dato correcto");
      return false;
    }
  
    let edad = f_format_string_to_number(document.getElementById("edad").value);
    if (isNaN(edad) || edad <= 0) {
      //      alert("La edad no es un dato correcto");
      f_muestra_error("La edad no es un dato correcto");
      return false;
    }
  
    /* para evitar datos absurdos como hijos menores de 25 = -1 */
    let hijos_menores_25_anos = f_format_string_to_number(
      document.getElementById("hijos_menores_25_anos").value
    );
    if (isNaN(hijos_menores_25_anos)) {
      //alert("El nÃºmero de hijos menores de 25 aÃ±os no es un dato correcto");
      f_muestra_error(
        "El nÃºmero de hijos menores de 25 aÃ±os no es un dato correcto"
      );
      return false;
    }
    if (hijos_menores_25_anos < 0) {
      hijos_menores_25_anos = 0;
      document.getElementById("hijos_menores_25_anos").value =
        hijos_menores_25_anos;
    }
  
    let hijos_menores_3_anos = f_format_string_to_number(
      document.getElementById("hijos_menores_3_anos").value
    );
    if (isNaN(hijos_menores_3_anos)) {
      //alert("El nÃºmero de hijos menores de 3 aÃ±os no es un dato correcto");
      f_muestra_error(
        "El nÃºmero de hijos menores de 3 aÃ±os no es un dato correcto"
      );
      return false;
    }
    if (hijos_menores_3_anos < 0) {
      hijos_menores_3_anos = 0;
      document.getElementById("hijos_menores_3_anos").value =
        hijos_menores_3_anos;
    }
  
    let ascendente_mayor_65_menor_75 = f_format_string_to_number(
      document.getElementById("ascendente_mayor_65_menor_75").value
    );
    if (isNaN(ascendente_mayor_65_menor_75)) {
      //alert("El nÃºmero de mayores de 65 aÃ±os y menores de 75 aÃ±os a cargo no es un dato correcto");
      f_muestra_error(
        "El nÃºmero de mayores de 65 aÃ±os y menores de 75 aÃ±os a cargo no es un dato correcto"
      );
      return false;
    }
    if (ascendente_mayor_65_menor_75 < 0) {
      ascendente_mayor_65_menor_75 = 0;
      document.getElementById("ascendente_mayor_65_menor_75").value =
        ascendente_mayor_65_menor_75;
    }
  
    let ascendente_mayor_75 = f_format_string_to_number(
      document.getElementById("ascendente_mayor_75").value
    );
    if (isNaN(ascendente_mayor_75)) {
      //alert("El nÃºmero de ascendientes mayores de 75 aÃ±os a cargo no es un dato correcto");
      f_muestra_error(
        "El nÃºmero de ascendientes mayores de 75 aÃ±os a cargo no es un dato correcto"
      );
      return false;
    }
    if (ascendente_mayor_75 < 0) {
      ascendente_mayor_75 = 0;
      document.getElementById("ascendente_mayor_75").value = ascendente_mayor_75;
    }
  
    let menor_65_con_discapacidad_cargo = f_format_string_to_number(
      document.getElementById("menor_65_con_discapacidad_cargo").value
    );
    if (isNaN(menor_65_con_discapacidad_cargo)) {
      //alert("El nÃºmero de menores de 65 aÃ±os a cargo con discapacidad a cargo no es un dato correcto");
      f_muestra_error(
        "El nÃºmero de menores de 65 aÃ±os a cargo con discapacidad a cargo no es un dato correcto"
      );
      return false;
    }
    if (menor_65_con_discapacidad_cargo < 0) {
      menor_65_con_discapacidad_cargo = 0;
      document.getElementById("menor_65_con_discapacidad_cargo").value =
        menor_65_con_discapacidad_cargo;
    }
  
    let numero_personas_deduccion_ascendientes = f_format_string_to_number(
      document.getElementById("numero_personas_deduccion_ascendientes").value
    );
    if (isNaN(numero_personas_deduccion_ascendientes)) {
      //alert("El nÃºmero de contribuyentes que aplican los mÃ­nimos por ascendiente no es un dato correcto");
      f_muestra_error(
        "El nÃºmero de contribuyentes que aplican los mÃ­nimos por ascendiente no es un dato correcto"
      );
      return false;
    }
    if (numero_personas_deduccion_ascendientes < 0) {
      numero_personas_deduccion_ascendientes = 0;
      document.getElementById("numero_personas_deduccion_ascendientes").value =
        numero_personas_deduccion_ascendientes;
    }
    //NOTA: este valor se emplea como divisor (en los calculos de mÃ­nimos) no puede ser 0
    if (numero_personas_deduccion_ascendientes > 0) {
      let divisor_para_minimos_deduccion_ascendientes =
        numero_personas_deduccion_ascendientes;
      }
    else {
      let divisor_para_minimos_deduccion_ascendientes = 1;
    }
  
    let descendientes_con_minusvalia_33_al_65 = f_format_string_to_number(
      document.getElementById("descendientes_con_minusvalia_33_al_65").value
    );
    if (isNaN(descendientes_con_minusvalia_33_al_65)) {
      //alert("El nÃºmero de descendientes con grado de discapacidad entre 33% y 65%  no es un dato correcto");
      f_muestra_error(
        "El nÃºmero de descendientes con grado de discapacidad entre 33% y 65%  no es un dato correcto"
      );
      return false;
    }
    if (descendientes_con_minusvalia_33_al_65 < 0) {
      descendientes_con_minusvalia_33_al_65 = 0;
      document.getElementById("descendientes_con_minusvalia_33_al_65").value =
        descendientes_con_minusvalia_33_al_65;
    }
  
    let descendientes_con_minusvalia_sup_al_65 = f_format_string_to_number(
      document.getElementById("descendientes_con_minusvalia_sup_al_65").value
    );
    if (isNaN(descendientes_con_minusvalia_sup_al_65)) {
      //alert("El nÃºmero de descendientes con grado de discapacidad superior al 65% no es un dato correcto");
      f_muestra_error(
        "El nÃºmero de descendientes con grado de discapacidad superior al 65% no es un dato correcto"
      );
      return false;
    }
    if (descendientes_con_minusvalia_sup_al_65 < 0) {
      descendientes_con_minusvalia_sup_al_65 = 0;
      document.getElementById("descendientes_con_minusvalia_sup_al_65").value =
        descendientes_con_minusvalia_sup_al_65;
    }
  
    let ascendientes_con_minusvalia_33_al_65 = f_format_string_to_number(
      document.getElementById("ascendientes_con_minusvalia_33_al_65").value
    );
    if (isNaN(ascendientes_con_minusvalia_33_al_65)) {
      //alert("El nÃºmero de ascendientes con grado de discapacidad entre el 33% y el 65% no es un dato correcto");
      f_muestra_error(
        "El nÃºmero de ascendientes con grado de discapacidad entre el 33% y el 65% no es un dato correcto"
      );
      return false;
    }
    if (ascendientes_con_minusvalia_33_al_65 < 0) {
      ascendientes_con_minusvalia_33_al_65 = 0;
      document.getElementById("ascendientes_con_minusvalia_33_al_65").value =
        ascendientes_con_minusvalia_33_al_65;
    }
  
    let ascendientes_con_minusvalia_sup_al_65 = f_format_string_to_number(
      document.getElementById("ascendientes_con_minusvalia_sup_al_65").value
    );
    if (isNaN(ascendientes_con_minusvalia_sup_al_65)) {
      //alert("El nÃºmero de ascendientes con grado de discapacidad igual o superior al 65% no es un dato correcto");
      f_muestra_error(
        "El nÃºmero de ascendientes con grado de discapacidad igual o superior al 65% no es un dato correcto"
      );
      return false;
    }
    if (ascendientes_con_minusvalia_sup_al_65 < 0) {
      ascendientes_con_minusvalia_sup_al_65 = 0;
      document.getElementById("ascendientes_con_minusvalia_sup_al_65").value =
        ascendientes_con_minusvalia_sup_al_65;
    }
    /* End: validaciÃ³n del formulario */
  
    checkNumPagas();
  
    /* paso 1: calcular base imponible */
    let cuota_mensual_pagar = f_calcuar_cuota_mensual_pagar(
      2017,
      bruto_anual,
      categoria_profesional
    );
    let cuota_acumulado_ano = cuota_mensual_pagar * 12;
    let rendimiento_neto = bruto_anual - cuota_acumulado_ano;
    let reduccion_rendimiento_neto = f_calcular_reduccion_rendimiento_neto(
      2017,
      rendimiento_neto
    );
    if (hijos_menores_25_anos > 2) {
      reduccion_rendimiento_neto = reduccion_rendimiento_neto + 600;
    }
  
    let base_imponible =
      bruto_anual - cuota_acumulado_ano - reduccion_rendimiento_neto;
    //si base imponible es negativa, su valor es 0
    if (base_imponible < 0) base_imponible = 0;
    /* fin paso 1: calcular base imponible */
  
    /* paso 2: Calculo del MÃ­n. personal y familiar*/
    let minimo_personal = f_calcular_minimo_personal(2017, edad);
    let minimo_descendientes = f_calcular_minimo_descendientes(
      2017,
      hijos_menores_25_anos
    );
  
    //MÃ­nimo por hijos en funciÃ³n de beneficiarios, segÃºn tenga hijos en exclusiva a efectos fiscales S/N (dependiente del minimo_descendientes)
    if (hijos_en_exclusiva) {
      let minimo_hijos_beneficiarios = minimo_descendientes;
    } else {
      let minimo_hijos_beneficiarios = minimo_descendientes / 2;
    }
  
    let minimo_hijos_menores_3_anos = hijos_menores_3_anos * 2800;
  
    //MÃ­n. por hijos <3 aÃ±os en funciÃ³n de beneficiarios, segÃºn tenga hijos en exclusiva a efectos fiscales S/N (dependiente del minimo_hijos_menores_3_anos)
    if (hijos_en_exclusiva) {
      let minimo_hijos_menores_3_anos_beneficiarios = minimo_hijos_menores_3_anos;
    } else {
      let minimo_hijos_menores_3_anos_beneficiarios =
        minimo_hijos_menores_3_anos / 2;
    }
  
    /* Estos valores dependen de "divisor_para_minimos_deduccion_ascendientes" */
    let minimo_ascendente_mayor_65_menor_75 =
      (ascendente_mayor_65_menor_75 * 1150) /
      divisor_para_minimos_deduccion_ascendientes;
    let minimo_ascendente_mayor_75 =
      (ascendente_mayor_75 * 2550) / divisor_para_minimos_deduccion_ascendientes;
    let minimo_menor_65_con_discapacidad_cargo =
      (menor_65_con_discapacidad_cargo * 1150) /
      divisor_para_minimos_deduccion_ascendientes;
  
    /* minusvalias */
    let minimo_descendientes_con_minusvalia_33_al_65 =
      descendientes_con_minusvalia_33_al_65 * 3000;
    if (hijos_en_exclusiva) {
      let minimo_descendientes_con_minusvalia_33_al_65_beneficiarios =
        minimo_descendientes_con_minusvalia_33_al_65;
    } else {
      let minimo_descendientes_con_minusvalia_33_al_65_beneficiarios =
        minimo_descendientes_con_minusvalia_33_al_65 / 2;
    }
  
    let minimo_descendientes_con_minusvalia_sup_al_65 =
      descendientes_con_minusvalia_sup_al_65 * 12000;
    if (hijos_en_exclusiva) {
      let minimo_descendientes_con_minusvalia_sup_al_65_beneficiarios =
        minimo_descendientes_con_minusvalia_sup_al_65;
    } else {
      let minimo_descendientes_con_minusvalia_sup_al_65_beneficiarios =
        minimo_descendientes_con_minusvalia_sup_al_65 / 2;
    }
  
    /* Estos valores dependen de "divisor_para_minimos_deduccion_ascendientes" */
    let minimo_ascendientes_con_minusvalia_33_al_65 =
      (ascendientes_con_minusvalia_33_al_65 * 3000) /
      divisor_para_minimos_deduccion_ascendientes;
    let minimo_ascendientes_con_minusvalia_sup_al_65 =
      (ascendientes_con_minusvalia_sup_al_65 * 12000) /
      divisor_para_minimos_deduccion_ascendientes;
  
    /* Si esta selccionado la opcion "grado de discapacidad entre el 33% y el 65%" tiene un valor fijo en caso contrario el dato es 0 */
    if (minusvalia_33_al_65) {
      let minimo_minusvalia_33_al_65 = 3000;
    } else {
      let minimo_minusvalia_33_al_65 = 0;
    }
  
    /* Si esta selccionado la opcion "grado de discapacidad superior al 65% o con movilidad reducida" tiene un valor fijo en caso contrario el dato es 0 */
    if (minusvalia_sup_al_65) {
      let minimo_minusvalia_sup_al_65 = 12000;
    } else {
      let minimo_minusvalia_sup_al_65 = 0;
    }
  
    let suma_minimos =
      minimo_personal +
      minimo_hijos_beneficiarios +
      minimo_hijos_menores_3_anos_beneficiarios +
      minimo_ascendente_mayor_65_menor_75 +
      minimo_ascendente_mayor_75 +
      minimo_menor_65_con_discapacidad_cargo +
      minimo_descendientes_con_minusvalia_33_al_65_beneficiarios +
      minimo_descendientes_con_minusvalia_sup_al_65_beneficiarios +
      minimo_ascendientes_con_minusvalia_33_al_65 +
      minimo_ascendientes_con_minusvalia_sup_al_65 +
      minimo_minusvalia_33_al_65 +
      minimo_minusvalia_sup_al_65;
  
    /* fin paso 2: Calculo del MÃ­n. personal y familiar*/
  
    /* paso3: calcular retenciones */
    let cuota_retencion = (
      f_calcular_tramos_base_liquidable(base_imponible) -
      f_calcular_tramos_base_liquidable(suma_minimos)
    ).toFixed(num_decimales);
  
    let tipo_previo = (cuota_retencion / bruto_anual) * 100;
    let tipo_previo_redondeado = ((cuota_retencion / bruto_anual) * 100).toFixed(
      0
    );
    let importe_previo_retencion = ((tipo_previo / 100) * bruto_anual).toFixed(
      num_decimales
    );
  
    //no hay deduccion
    let deduccion_400_euros = 0;
    //let tipo_final_retencion     =  (((importe_previo_retencion - deduccion_400_euros)/bruto_anual)*100).toFixed(num_decimales);
  
    //OJO!!!! truncado no redondeado > truncateNumber
    let tipo_final_retencion_truncado = truncateNumber(
      ((importe_previo_retencion - deduccion_400_euros) / bruto_anual) * 100,
      num_decimales
    );
    if (tipo_final_retencion_truncado < 0) tipo_final_retencion_truncado = 0;
    //let tipo_retencion_minimos_tributacion = f_calcular_tipo_retencion_minimos_tributacion(situacion_familiar, bruto_anual, tipo_final_retencion_truncado, hijos_menores_25_anos);
    let importe_final_retencion =
      (tipo_final_retencion_truncado / 100) * bruto_anual;
    /* fin paso3: calcular retenciones */
  
    /* paso4: calcular sueldo */
    let seguridad_social = cuota_acumulado_ano;
    //let tipo_retencion          = tipo_final_retencion_truncado
    let tipo_retencion = f_calcular_tipo_retencion_situacion_contribuyente(
      2017,
      tipo_final_retencion_truncado,
      situacion_familiar,
      hijos_menores_25_anos,
      bruto_anual
    );
    // correccion tipo contrato laboral
    if (tipo_contrato_laboral == "1" && tipo_retencion < 2) tipo_retencion = 2;
    // correccion valor negativos!!!!!
    if (tipo_retencion < 0) tipo_retencion = 0;
  
    let importe_retencion = importe_final_retencion;
    let sueldo_neto = bruto_anual - seguridad_social - importe_retencion;
    let sueldo_neto_12_pagas = sueldo_neto / 12;
    let pagas_extras = (bruto_anual - importe_retencion) / 14;
    let salario_mensual = pagas_extras - seguridad_social / 12;
  
    /* fin paso4: calcular sueldo */
  
    ponerResultado(
      "celda_sueldo_bruto_anual_2017",
      bruto_anual.toFixed(1),
      "&euro;"
    );
    ponerResultado(
      "celda_sueldo_neto_anual_2017",
      sueldo_neto.toFixed(1),
      "&euro;"
    );
    ponerResultado(
      "celda_retenciones_IRPF_2017",
      importe_retencion.toFixed(1),
      "&euro;"
    );
    ponerResultado("celda_tipo_retencion_IRPF_2017", tipo_retencion, "%");
    ponerResultado("celda_coutas_ss_2017", seguridad_social.toFixed(1), "&euro;");
    if (numero_pagas == "14") {
      ponerResultado(
        "celda_sueldo_neto_2017",
        salario_mensual.toFixed(1),
        "&euro;"
      );
      ponerResultado("celda_paga_extra_2017", pagas_extras.toFixed(1), "&euro;");
    } else {
      ponerResultado(
        "celda_sueldo_neto_2017",
        sueldo_neto_12_pagas.toFixed(1),
        "&euro;"
      );
    }
  
    document.getElementById("resultados_calculadora_nomina").className = "";
  
    document.getElementById("error").innerHTML = "";
  
    f_enviar_al_ancla();
  }
/**
 * Detecta la pulsaciÃ³n de la tecla return o intro...
 */
function ponerFoco() {
  let el = document.getElementById("bruto_anual");
  if (el) {
    el.focus();
  }
}

function f_muestra_error(error) {
  let div_error = document.getElementById("error");
  div_error.innerHTML = error;
}

// En 2021, hay cambios en las cifras (en computo mensual, es decir, el total resultante del sueldo diario * 30 dÃ­as) de la correspondiente base mÃ­nima y base mÃ¡xima segÃºn el grupo / clasificaciÃ³n profesional que afectan al calculo de la cuota mensual a pagar
// Nota: Falta por actualizar a partir de los datos del excel la calculadora de "sueldo neto" de 2021
function f_calcuar_cuota_mensual_pagar(
  anio,
  bruto_anual,
  categoria_profesional
) {
  let datos = {
    A: [{ min: 1466.4, max: 4070.1 }],
    B: [{ min: 1215.9, max: 4070.1 }],
    C: [{ min: 1050.0, max: 4070.1 }],
    D: [{ min: 1050.0, max: 4070.1 }],
    E: [{ min: 1050.0, max: 4070.1 }],
    F: [{ min: 1050.0, max: 4070.1 }],
    G: [{ min: 1050.0, max: 4070.1 }],
    H: [{ min: 1050.0, max: 4070.1 }],
    I: [{ min: 1050.0, max: 4070.1 }],
    J: [{ min: 1050.0, max: 4070.1 }],
    K: [{ min: 1050.0, max: 4070.1 }],
  };

  let cuota_mensual_pagar = 0;

  //alert(datos[categoria_profesional][0].min);
  if (bruto_anual / 12 < datos[categoria_profesional][0].min) {
    cuota_mensual_pagar = datos[categoria_profesional][0].min * 0.0635;
  } else if (bruto_anual / 12 > datos[categoria_profesional][0].max) {
    cuota_mensual_pagar = datos[categoria_profesional][0].max * 0.0635;
  } else {
    cuota_mensual_pagar = (bruto_anual / 12) * 0.0635;
  }

  return cuota_mensual_pagar;
}

function f_calcular_reduccion_rendimiento_neto(anio, rendimiento_neto) {
  let movilidad_geografica = document.getElementById(
    "movilidad_geografica"
  ).checked;
  let minusvalia_33_al_65 = document.getElementById(
    "minusvalia_33_al_65"
  ).checked;
  let minusvalia_sup_al_65 = document.getElementById(
    "minusvalia_sup_al_65"
  ).checked;
  let reduccion_comun_todos = 2000;

  // NOTA: Del excel de calculadura "sueldo neto" de 2021
  // Formula:
  //=IF(B32<=13115;5565;IF(B32>=16825;0;5565-(1,5*(B32-13115))))
  if (rendimiento_neto < 13115) let reduccion_rendimiento_neto = 5565;
  else if (rendimiento_neto >= 16825) let reduccion_rendimiento_neto = 0;
  else let reduccion_rendimiento_neto = 5565 - 1.5 * (rendimiento_neto - 13115);

  //si el check de movilidad_geografica esta seleccionado
  if (movilidad_geografica)
    let incremento_movilidad_geografica = reduccion_rendimiento_neto;
  else let incremento_movilidad_geografica = 0;

  // ?
  if (minusvalia_33_al_65) let minusvalia_igual_superior_33 = 3500;
  else let minusvalia_igual_superior_33 = 0;

  // ?
  if (minusvalia_sup_al_65) let minusvalia_sup_65_o_movilidad_reducida = 7750;
  else let minusvalia_sup_65_o_movilidad_reducida = 0;

  //por el momento no tenemos los calculos para desempleados o pensionistas
  let reduccion_desempleado = 0;
  let reduccion_pesionista = 0;

  return (
    reduccion_comun_todos +
    reduccion_rendimiento_neto +
    incremento_movilidad_geografica +
    minusvalia_igual_superior_33 +
    minusvalia_sup_65_o_movilidad_reducida +
    reduccion_desempleado +
    reduccion_pesionista
  );
}

// ?
function f_calcular_minimo_personal(anio, edad) {
  if (edad <= 65) {
    return 5550;
  } else if (edad > 75) {
    return 5550 + +918 + 1400;
  } else {
    return 5550 + 1150;
  }
}

// ?
function f_calcular_minimo_descendientes(anio, hijos_menores_25_anos) {
  if (hijos_menores_25_anos == 0) {
    return 0;
  } else if (hijos_menores_25_anos == 1) {
    return 2400;
  } else if (hijos_menores_25_anos == 2) {
    return 2400 + 2700;
  } else if (hijos_menores_25_anos == 3) {
    return 2400 + 2700 + 4000;
  } else if (hijos_menores_25_anos == 4) {
    return 2400 + 2700 + 4000 + 4500;
  } else {
    return 2400 + 2700 + 4000 + 4500 + 4500 * (hijos_menores_25_anos - 4);
  }
}

function f_calcular_tramos_base_liquidable(base_liquidable) {
  // tramo 1
  if (base_liquidable < 12450) {
    let tramo_1 = base_liquidable * 0.19;
  } else {
    let tramo_1 = 12450 * 0.19;
  }

  //tramo 2, si hay exceso en el tramo
  if (base_liquidable < 12450) {
    let tramo_2 = 0;
  } else {
    if (base_liquidable > 20200) {
      let tramo_2 = (20200 - 12450) * 0.24;
    } else {
      let tramo_2 = (base_liquidable - 12450) * 0.24;
    }
  }

  //tramo 3, si hay exceso en el tramo
  if (base_liquidable < 20200) {
    let tramo_3 = 0;
  } else {
    if (base_liquidable > 35200) {
      let tramo_3 = (35200 - 20200) * 0.3;
    } else {
      let tramo_3 = (base_liquidable - 20200) * 0.3;
    }
  }

  //tramo 4, si hay exceso en el tramo
  if (base_liquidable < 35200) {
    let tramo_4 = 0;
  } else {
    if (base_liquidable > 60000) {
      let tramo_4 = (60000 - 35200) * 0.37;
    } else {
      let tramo_4 = (base_liquidable - 35200) * 0.37;
    }
  }

  //tramo 5 (ultimo tramo hasta 2017)
  // Limitar hasta 300.000 inclusive
  if (base_liquidable < 60000) {
    let tramo_5 = 0;
  } else {
    if (base_liquidable > 300000) {
      let tramo_5 = (300000 - 60000) * 0.45;
    } else {
      let tramo_5 = (base_liquidable - 60000) * 0.45;
    }
  }

  //tramo 6, a partir de 300000 con tipo impositivo 0.47 (ultimo tramo a partir de 2021)
  if (base_liquidable < 300000) {
    let tramo_6 = 0;
  } else {
    let tramo_6 = (base_liquidable - 300000) * 0.47;
  }

  //devuelvo el sumatorio de todos los tramos!!!!
  // + tramo 6
  return tramo_1 + tramo_2 + tramo_3 + tramo_4 + tramo_5 + tramo_6;
}

function f_calcular_tramos_situacion_familiar(
  situacion_familiar,
  hijos_menores_25_anos
) {
  if (situacion_familiar == "B") {
    if (hijos_menores_25_anos == 0) {
      return 13696;
    } else if (hijos_menores_25_anos == 1) {
      return 14985;
    } else {
      return 17138;
    }
  } else if (situacion_familiar == "C") {
    if (hijos_menores_25_anos == 0) {
      return 12000;
    } else if (hijos_menores_25_anos == 1) {
      return 12607;
    } else {
      return 13275;
    }
  } else {
    if (hijos_menores_25_anos == 0) {
      return 0;
    } else if (hijos_menores_25_anos == 1) {
      return 14266;
    } else {
      return 15803;
    }
  }
}

function f_calcular_tipo_retencion_minimos_tributacion(
  situacion_familiar,
  bruto_anual,
  tipo_final_retencion_truncado,
  hijos_menores_25_anos
) {
  // recupero los minimos asociados a la situacion familiar
  let minimo_situacion_familiar = f_calcular_tramos_situacion_familiar(
    situacion_familiar,
    hijos_menores_25_anos
  );

  //tipo A (soltero)
  if (situacion_familiar == "A") {
    if (hijos_menores_25_anos == 0) {
      return tipo_final_retencion_truncado;
    } else if (hijos_menores_25_anos == 1) {
      if (bruto_anual < minimo_situacion_familiar) {
        return 0;
      } else {
        return tipo_final_retencion_truncado;
      }
    } else {
      if (bruto_anual < minimo_situacion_familiar) {
        return 0;
      } else {
        return tipo_final_retencion_truncado;
      }
    }
  }
  //tipo B
  else if (situacion_familiar == "B") {
    if (hijos_menores_25_anos == 0) {
      return tipo_final_retencion_truncado;
    } else if (hijos_menores_25_anos == 1) {
      if (bruto_anual < minimo_situacion_familiar) {
        return 0;
      } else {
        return tipo_final_retencion_truncado;
      }
    } else {
      if (bruto_anual < minimo_situacion_familiar) {
        return 0;
      } else {
        return tipo_final_retencion_truncado;
      }
    }
  }
  //tipo C
  else {
    if (hijos_menores_25_anos == 0) {
      return tipo_final_retencion_truncado;
    } else if (hijos_menores_25_anos == 1) {
      if (bruto_anual < minimo_situacion_familiar) {
        return 0;
      } else {
        return tipo_final_retencion_truncado;
      }
    } else {
      if (bruto_anual < minimo_situacion_familiar) {
        return 0;
      } else {
        return tipo_final_retencion_truncado;
      }
    }
  }
}

// Cambiar los valores de sueldo bruto
function f_calcular_tipo_retencion_situacion_contribuyente(
  anio,
  tipo_retencion,
  situacion_familiar,
  hijos_menores_25_anos,
  bruto_anual
) {
  let _tipo_retencion = 0;

  if (situacion_familiar == "A") {
    if (hijos_menores_25_anos == 0) return tipo_retencion;
    else if (hijos_menores_25_anos == 1) {
      if (bruto_anual <= 14266) return _tipo_retencion;
      else return tipo_retencion;
    } else {
      if (bruto_anual <= 15803) return _tipo_retencion;
      else return tipo_retencion;
    }
  } else if (situacion_familiar == "B") {
    if (hijos_menores_25_anos == 0) {
      if (bruto_anual <= 13696) return _tipo_retencion;
      else return tipo_retencion;
    } else if (hijos_menores_25_anos == 1) {
      if (bruto_anual <= 14985) return _tipo_retencion;
      else return tipo_retencion;
    } else {
      if (bruto_anual <= 17138) return _tipo_retencion;
      else return tipo_retencion;
    }
  } else if (situacion_familiar == "C") {
    if (hijos_menores_25_anos == 0) {
      if (bruto_anual <= 12000) return _tipo_retencion;
      else return tipo_retencion;
    } else if (hijos_menores_25_anos == 1) {
      if (bruto_anual <= 12607) return _tipo_retencion;
      else return tipo_retencion;
    } else {
      if (bruto_anual <= 13275) return _tipo_retencion;
      else return tipo_retencion;
    }
  }
}


function checkNumPagas() {
  let numero_pagas = document.getElementById("numero_pagas").value;
  document.getElementById("numero_pagas_sueldo_neto").innerHTML = numero_pagas;
  if (numero_pagas == "14") {
    document.getElementById("fila_paga_extra").innerHTML =
      '<tr><td class="col_one">Pagas extras (x2)</td><td class="normal"><div id="celda_paga_extra_2017">--</div></td></tr>';
  } else {
    document.getElementById("fila_paga_extra").innerHTML = "";
  }
}
// x
function ponerResultado(campo, valor, simbol) {
  if (typeof valor == "number") valor = valor.toFixed(2);

  let elemento = document.getElementById(campo);
  if (elemento) {
    elemento.innerHTML = formatNumber(valor) + simbol;
  }
}
// x
function f_enviar_al_ancla() {
  //compruebo que la tabla tiene el anchor > ancla_tabla_resultados
  let ancla_tabla_resultados = document.getElementById(
    "ancla_tabla_resultados"
  );
  if (ancla_tabla_resultados) {
    //en caso de tenerlo, recalculamos la url para enviar al ancla...
    //recupero de la url actual, elimino el anchor y reenvio al anchor dentro de la tabla...
    let current_url = document.URL;
    if (current_url.indexOf("#") != -1) {
      //elimino las posibles anclas de la url (evito que se acumlen) y rehago la url
      let arr_url = current_url.split("#");
      current_url = arr_url[0];
    }
    current_url += "#tabla_resultados";
    location.href = current_url;
  }
}

// =================================
// Funciones auxiliares
// =================================

//
let f_format_string_to_number = function (dato) {
  return new Number(dato.replace(".", "").replace(",", "."));
};

//
let truncateNumber = function (num, digits) {
  num += "";

  if (num.indexOf(".") == -1) {
    num = f_format_string_to_number(num).toFixed(digits);
    num += "";
  }

  let splitStr = num.split(".");
  let splitLeft = splitStr[0];
  let splitRight = splitStr[1].substring(0, digits);

  if (digits == 0) return splitLeft;
  else return splitLeft + "." + splitRight;
};

//
let formatNumber = function (num) {
  let separador = ".";
  let sepDecimal = ",";
  num += "";
  let splitStr = num.split(".");
  let splitLeft = splitStr[0];
  let splitRight = splitStr.length > 1 ? sepDecimal + splitStr[1] : "";
  let regx = /(\d+)(\d{3})/;
  while (regx.test(splitLeft)) {
    splitLeft = splitLeft.replace(regx, "$1" + separador + "$2");
  }
  return splitLeft + splitRight;
};
