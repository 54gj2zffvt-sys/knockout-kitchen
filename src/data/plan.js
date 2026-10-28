// Datos del plan nutricional — generados a partir de /nutriologo-mma/plan-fase4/*.md
// Fuente de verdad real: los .md en esa carpeta. Si el plan cambia, actualizar ahí primero.

// Objetivos recalculados con el peso real en ayunas (76.4 kg) — ver diagnostico-fase3.md
export const DAY_TARGETS = {
  alto: { kcal: 3150, protein: 160, carbs: 428, fat: 87, label: 'Entrenamiento alto' },
  normal: { kcal: 2110, protein: 160, carbs: 208, fat: 71, label: 'Entrenamiento normal' },
  descanso: { kcal: 1815, protein: 160, carbs: 157, fat: 61, label: 'Descanso activo' },
}

const meal = (id, name, time, foods, macros, recipe, substitutes, why) => ({
  id, name, time, foods, macros, recipe, substitutes, why,
})

// ---------- SEMANA A ----------
const semanaA = {
  lunes: {
    type: 'normal',
    meals: [
      meal('a-lun-1', 'Desayuno', '6:30', [
        { name: 'Avena en hojuelas', qty: '60 g (6 cdas)' },
        { name: 'Leche entera', qty: '200 ml (1 vaso)' },
        { name: 'Banano', qty: '1 unidad' },
        { name: 'Maní', qty: '15 g (1 cda)' },
        { name: 'Huevo cocido', qty: '1 unidad' },
      ], { kcal: 607, protein: 28, carbs: 75, fat: 24 },
      ['Cocinar la avena con la leche a fuego bajo 5 min.', 'Picar el banano encima.', 'Agregar el maní.', 'Acompañar con el huevo cocido aparte.'],
      ['Avena → arroz de leche', 'Leche entera → leche deslactosada'],
      'Carbohidrato de absorción lenta para arrancar el día antes del colegio.'),
      meal('a-lun-2', 'Snack colegio', '10:30', [
        { name: 'Pan blanco', qty: '1 rebanada (30 g)' },
        { name: 'Huevo', qty: '1 unidad' },
        { name: 'Atún en lata', qty: '50 g' },
        { name: 'Manzana', qty: '1 unidad' },
      ], { kcal: 268, protein: 23, carbs: 29, fat: 7 },
      ['Sánduche sencillo de atún o huevo, lo que prefiera llevar ese día.'],
      ['Atún → 1 huevo extra', 'Manzana → naranja'],
      'Evita 9 horas sin comer entre el desayuno y el almuerzo.'),
      meal('a-lun-3', 'Almuerzo', '15:30', [
        { name: 'Pollo pechuga', qty: '180 g' },
        { name: 'Arroz blanco', qty: '150 g cocido' },
        { name: 'Brócoli', qty: '100 g' },
        { name: 'Aceite', qty: '1 cdta' },
      ], { kcal: 572, protein: 55, carbs: 49, fat: 12 },
      ['Sazonar la pechuga con sal, pimienta, limón y ajo.', 'Cocinar en sartén con el aceite, 5-6 min por lado.', 'Brócoli al vapor 5 min.'],
      ['Pollo → pavo o cerdo', 'Arroz blanco → arroz integral'],
      '30 min antes del gym — energía lista para entrenar sin pesar.'),
      meal('a-lun-4', 'Snack pre-BJJ', '17:45', [
        { name: 'Banano', qty: '1 unidad' },
        { name: 'Mantequilla de maní', qty: '16 g (1 cda)' },
      ], { kcal: 183, protein: 5, carbs: 26, fat: 8 },
      ['Directo, sin cocción.'],
      ['Mantequilla de maní → maní entero'],
      'Carbohidrato rápido entre el gym (termina 18:00) y el BJJ, para llegar con energía.'),
      meal('a-lun-5', 'Cena', '20:45', [
        { name: 'Carne molida', qty: '120 g cocida' },
        { name: 'Papa', qty: '200 g (puré)' },
        { name: 'Queso fresco', qty: '30 g' },
        { name: 'Zanahoria', qty: '80 g' },
      ], { kcal: 539, protein: 41, carbs: 47, fat: 21 },
      ['Sofreír la carne molida con ajo, 8 min.', 'Papa sancochada y aplastada con un poco de leche.', 'Zanahoria al vapor.', 'Queso desmenuzado encima.'],
      ['Carne molida → carne en trozo', 'Papa → yuca'],
      'Cena después del BJJ, para recuperar.'),
    ],
  },
  martes: {
    type: 'normal',
    meals: [
      meal('a-mar-1', 'Desayuno', '6:30', [
        { name: 'Huevo', qty: '2 unidades (revueltos)' },
        { name: 'Pan blanco', qty: '60 g' },
        { name: 'Naranja', qty: '1 unidad' },
        { name: 'Queso fresco', qty: '20 g' },
      ], { kcal: 460, protein: 28, carbs: 58, fat: 16 },
      ['Batir los huevos y cocinar revueltos en sartén con poco aceite, 3-4 min.', 'Servir con el pan y el queso.'],
      ['Huevo → yogur griego', 'Pan blanco → avena'],
      'Antes del colegio, con proteína para sostener hasta el snack de media mañana.'),
      meal('a-mar-2', 'Snack colegio', '10:30', [
        { name: 'Yogur griego', qty: '150 g' },
        { name: 'Mango', qty: '1 unidad' },
        { name: 'Maní', qty: '10 g' },
      ], { kcal: 273, protein: 17, carbs: 33, fat: 10 },
      ['Mezclar el yogur con el mango picado y el maní encima.'],
      ['Yogur griego → yogur natural + queso fresco', 'Mango → manzana'],
      'Cubre el hueco entre el desayuno y el almuerzo de las 15:30, sin pesar antes de entrenar.'),
      meal('a-mar-3', 'Almuerzo', '15:30', [
        { name: 'Atún en lata', qty: '150 g' },
        { name: 'Arroz integral', qty: '150 g cocido' },
        { name: 'Lechuga', qty: 'al gusto' },
        { name: 'Aguacate', qty: '50 g' },
        { name: 'Aceite de oliva', qty: '1 cda' },
      ], { kcal: 634, protein: 56, carbs: 55, fat: 30 },
      ['Mezclar el atún escurrido con limón.', 'Servir sobre el arroz con lechuga y aguacate en rodajas.'],
      ['Atún → pollo o huevo'],
      'Martes no hay gym, pero sí BJJ corto — comida ligera y rápida de digerir antes de esa sesión.'),
      meal('a-mar-4', 'Snack pre-BJJ', '17:45', [
        { name: 'Banano', qty: '1 unidad' },
        { name: 'Queso fresco', qty: '30 g' },
      ], { kcal: 169, protein: 7, carbs: 24, fat: 5 },
      ['Directo, sin cocción.'],
      ['Queso fresco → yogur griego'],
      'Carbohidrato rápido justo antes del BJJ de la tarde.'),
      meal('a-mar-5', 'Cena', '20:45', [
        { name: 'Pavo pechuga', qty: '150 g' },
        { name: 'Yuca', qty: '180 g cocida' },
        { name: 'Brócoli', qty: '100 g' },
        { name: 'Huevo extra', qty: '1 unidad' },
      ], { kcal: 595, protein: 57, carbs: 54, fat: 12 },
      ['Pavo sazonado, a la plancha 5 min por lado.', 'Yuca sancochada.', 'Brócoli al vapor.'],
      ['Pavo → pollo'],
      'Después del BJJ, para recuperar — proteína alta y carbohidrato que repone lo gastado.'),
    ],
  },
  miercoles: {
    type: 'alto',
    meals: [
      meal('a-mie-1', 'Desayuno', '6:30', [
        { name: 'Avena', qty: '80 g' }, { name: 'Leche entera', qty: '250 ml' },
        { name: 'Banano', qty: '1 unidad' }, { name: 'Huevo', qty: '1 unidad' },
      ], { kcal: 624, protein: 24, carbs: 97, fat: 16 },
      ['Cocinar la avena con la leche a fuego bajo 5 min.', 'Picar el banano encima.', 'Acompañar con el huevo cocido aparte.'],
      ['Avena → pan integral', 'Leche entera → leche deslactosada'],
      'Día de doble sesión — desayuno con más carbohidrato para llegar con reservas completas.'),
      meal('a-mie-2', 'Snack colegio', '10:30', [
        { name: 'Pan blanco', qty: '60 g' }, { name: 'Huevo', qty: '2 unidades' }, { name: 'Naranja', qty: '1 unidad' },
      ], { kcal: 400, protein: 22, carbs: 55, fat: 13 },
      ['Huevos cocidos o revueltos, sánduche sencillo con el pan.'],
      ['Huevo → atún en lata', 'Naranja → mandarina'],
      'Cubre el hueco antes del gym de las 16:00, día de alta carga.'),
      meal('a-mie-3', 'Almuerzo', '15:30', [
        { name: 'Pollo pechuga', qty: '180 g' }, { name: 'Arroz blanco', qty: '250 g cocido' },
        { name: 'Choclo', qty: '100 g' }, { name: 'Brócoli', qty: '100 g' },
      ], { kcal: 700, protein: 58, carbs: 118, fat: 7 },
      ['Pollo al horno 25 min a 200°C.', 'Arroz aparte.', 'Choclo y brócoli al vapor.'],
      ['Pollo → pavo', 'Arroz blanco → arroz integral'],
      'Día de doble sesión — más carbohidrato para rendir en gym + BJJ.'),
      meal('a-mie-4', 'Snack pre-BJJ', '17:45', [
        { name: 'Banano', qty: '2 unidades' }, { name: 'Mantequilla de maní', qty: '20 g' }, { name: 'Leche entera', qty: '250 ml' },
      ], { kcal: 449, protein: 15, carbs: 66, fat: 18 },
      ['Directo, sin cocción — licuar con la leche si se prefiere en batido.'],
      ['Mantequilla de maní → maní entero'],
      'Entre el gym y el BJJ completo de 2h — carbohidrato extra porque es día de doble sesión.'),
      meal('a-mie-5', 'Cena', '20:45', [
        { name: 'Carne de res', qty: '150 g' }, { name: 'Papa', qty: '250 g' }, { name: 'Aguacate', qty: '60 g' }, { name: 'Lechuga', qty: 'al gusto' }, { name: 'Aceite', qty: '1 cda extra' },
      ], { kcal: 769, protein: 48, carbs: 72, fat: 37 },
      ['Carne a la plancha (sal, pimienta, comino).', 'Papa al horno.', 'Aguacate en rodajas.'],
      ['Carne de res → cerdo'],
      'Después del BJJ de 2h — cena más grande para recuperar de la carga alta del día.'),
    ],
  },
  jueves: {
    type: 'alto',
    meals: [
      meal('a-jue-1', 'Desayuno', '6:30', [
        { name: 'Huevo', qty: '3 unidades' }, { name: 'Pan blanco', qty: '80 g' }, { name: 'Banano', qty: '1 unidad' }, { name: 'Queso fresco', qty: '30 g' },
      ], { kcal: 606, protein: 35, carbs: 76, fat: 22 },
      ['Huevos revueltos o cocidos.', 'Servir con el pan, el banano y el queso.'],
      ['Huevo → avena + yogur griego', 'Pan blanco → pan integral'],
      'Jueves es el día de mayor gasto calórico de la semana — desayuno con más proteína y carbohidrato desde temprano.'),
      meal('a-jue-2', 'Snack colegio', '10:30', [
        { name: 'Yogur griego', qty: '200 g' }, { name: 'Manzana', qty: '1 unidad' }, { name: 'Maní', qty: '15 g' },
      ], { kcal: 334, protein: 23, carbs: 42, fat: 12 },
      ['Mezclar el yogur con la manzana picada y el maní.'],
      ['Yogur griego → yogur natural + queso fresco', 'Manzana → naranja'],
      'Cubre el hueco antes del gym — día de acondicionamiento metabólico de alta intensidad.'),
      meal('a-jue-3', 'Almuerzo', '15:30', [
        { name: 'Carne molida', qty: '150 g' }, { name: 'Arroz blanco', qty: '250 g' }, { name: 'Lenteja cocida', qty: '100 g' }, { name: 'Pan blanco extra', qty: '40 g' },
      ], { kcal: 851, protein: 55, carbs: 149, fat: 10 },
      ['Carne molida con salsa de ajo.', 'Lenteja cocida aparte.', 'Arroz y pan.'],
      ['Carne molida → carne en trozo', 'Lenteja → fréjol'],
      'Jueves: día de mayor gasto calórico de la semana — el almuerzo más cargado de carbohidrato para sostener el gym y el BJJ.'),
      meal('a-jue-4', 'Snack pre-BJJ', '17:45', [
        { name: 'Banano', qty: '2 unidades' }, { name: 'Leche entera', qty: '250 ml' },
      ], { kcal: 331, protein: 9, carbs: 58, fat: 7 },
      ['Directo, o licuado en batido.'],
      ['Leche entera → leche deslactosada'],
      'Carbohidrato rápido entre el gym intenso y el BJJ de 2h.'),
      meal('a-jue-5', 'Cena', '20:45', [
        { name: 'Pollo pechuga', qty: '180 g' }, { name: 'Yuca', qty: '250 g' }, { name: 'Aguacate', qty: '60 g' }, { name: 'Aceite/mantequilla de maní extra', qty: '1 cda' },
      ], { kcal: 864, protein: 55, carbs: 93, fat: 34 },
      ['Pollo al horno con especias.', 'Yuca sancochada.', 'Aguacate.'],
      ['Pollo → pavo'],
      'Cena más grande del día — recupera el mayor gasto calórico de la semana.'),
    ],
  },
  viernes: {
    type: 'alto',
    meals: [
      meal('a-vie-1', 'Desayuno', '6:30', [
        { name: 'Avena', qty: '70 g' }, { name: 'Leche entera', qty: '250 ml' }, { name: 'Mango', qty: '1 unidad' }, { name: 'Huevo', qty: '1 unidad' }, { name: 'Maní', qty: '15 g' },
      ], { kcal: 650, protein: 24, carbs: 90, fat: 22 },
      ['Cocinar la avena con la leche.', 'Picar el mango encima, agregar el maní.', 'Acompañar con el huevo aparte.'],
      ['Mango → banano', 'Avena → pan integral'],
      'Último día de doble sesión de la semana — desayuno completo para sostener gym + BJJ.'),
      meal('a-vie-2', 'Snack colegio', '10:30', [
        { name: 'Pan blanco', qty: '60 g' }, { name: 'Atún en lata', qty: '100 g' }, { name: 'Naranja', qty: '1 unidad' },
      ], { kcal: 390, protein: 27, carbs: 50, fat: 4 },
      ['Sánduche de atún escurrido con limón.'],
      ['Atún → pollo desmenuzado', 'Naranja → mandarina'],
      'Cubre el hueco antes del gym de potencia total de las 16:00.'),
      meal('a-vie-3', 'Almuerzo', '15:30', [
        { name: 'Cerdo (lomo)', qty: '150 g' }, { name: 'Arroz blanco', qty: '250 g' }, { name: 'Brócoli', qty: '100 g' }, { name: 'Aguacate', qty: '50 g' }, { name: 'Aceite de oliva', qty: '2 cdas' },
      ], { kcal: 989, protein: 44, carbs: 120, fat: 53 },
      ['Lomo de cerdo a la plancha (sal, comino, limón).', 'Arroz y brócoli al vapor.', 'Aguacate.'],
      ['Cerdo → carne de res'],
      '30 min antes del gym — carbohidrato alto para el último día fuerte de la semana.'),
      meal('a-vie-4', 'Snack pre-BJJ', '17:45', [
        { name: 'Banano', qty: '2 unidades' }, { name: 'Yogur griego', qty: '150 g' }, { name: 'Maní extra', qty: '20 g' },
      ], { kcal: 473, protein: 14, carbs: 59, fat: 16 },
      ['Mezclar el yogur con el banano picado y el maní.'],
      ['Yogur griego → yogur natural'],
      'Entre el gym y el BJJ completo — snack más grande por ser día de doble sesión.'),
      meal('a-vie-5', 'Cena', '20:45', [
        { name: 'Pavo pechuga', qty: '150 g' }, { name: 'Papa', qty: '250 g' }, { name: 'Choclo', qty: '100 g' },
      ], { kcal: 650, protein: 50, carbs: 100, fat: 5 },
      ['Pavo al horno.', 'Papa sancochada.', 'Choclo cocido.'],
      ['Pavo → pollo'],
      'Cierre de la semana de entrenamiento fuerte — repone antes del fin de semana más ligero.'),
    ],
  },
  sabado: {
    type: 'normal',
    meals: [
      meal('a-sab-1', 'Desayuno', '6:30', [
        { name: 'Huevo', qty: '3 unidades' }, { name: 'Pan blanco', qty: '60 g' }, { name: 'Queso fresco', qty: '30 g' }, { name: 'Fresas', qty: '100 g' },
      ], { kcal: 548, protein: 35, carbs: 51, fat: 24 },
      ['Huevos revueltos o cocidos.', 'Servir con pan, queso y fresas.'],
      ['Fresas → manzana', 'Queso fresco → yogur griego'],
      'Sábado con entrenamiento más ligero — desayuno normal antes del gym suave de la mañana.'),
      meal('a-sab-2', 'Snack', '10:30', [
        { name: 'Yogur griego', qty: '150 g' }, { name: 'Banano', qty: '1 unidad' },
      ], { kcal: 227, protein: 14, carbs: 36, fat: 5 },
      ['Mezclar el yogur con el banano picado.'],
      ['Yogur griego → yogur natural + maní'],
      'Snack de media mañana, antes del almuerzo más temprano del sábado.'),
      meal('a-sab-3', 'Almuerzo', '13:30', [
        { name: 'Carne de res', qty: '180 g' }, { name: 'Arroz blanco', qty: '150 g' }, { name: 'Lechuga', qty: 'al gusto' }, { name: 'Aceite', qty: '1 cda' },
      ], { kcal: 609, protein: 48, carbs: 45, fat: 30 },
      ['Carne a la plancha con sal, pimienta y ajo, 4-5 min por lado.', 'Arroz blanco aparte.', 'Servir con lechuga fresca.'],
      ['Carne de res → cerdo o pollo'],
      'Sábado el horario es más libre — almuerzo a medio día, después del gym ligero de la mañana.'),
      meal('a-sab-4', 'Snack', '17:00', [
        { name: 'Manzana', qty: '1 unidad' }, { name: 'Maní', qty: '15 g' },
      ], { kcal: 137, protein: 4, carbs: 16, fat: 7 },
      ['Directo, sin cocción.'],
      ['Manzana → naranja'],
      'Snack de la tarde, para no llegar con hambre a la cena.'),
      meal('a-sab-5', 'Cena', '20:00', [
        { name: 'Pollo pechuga', qty: '150 g' }, { name: 'Puré de papa', qty: '180 g' }, { name: 'Zanahoria', qty: '80 g' }, { name: 'Queso fresco extra', qty: '30 g' },
      ], { kcal: 635, protein: 61, carbs: 42, fat: 9 },
      ['Pollo a la plancha con limón y especias.', 'Papa sancochada y aplastada con un poco de leche.', 'Zanahoria al vapor, queso desmenuzado encima.'],
      ['Pollo → pavo'],
      'Cierre del día, más temprano que entre semana — sábado sin BJJ nocturno.'),
    ],
  },
  domingo: {
    type: 'descanso',
    freeDay: true,
    meals: [
      meal('a-dom-1', 'Desayuno', '7:30', [
        { name: 'Huevo', qty: '3 unidades' }, { name: 'Banano', qty: '1 unidad' }, { name: 'Queso fresco', qty: '30 g' },
      ], { kcal: 400, protein: 28, carbs: 24, fat: 23 },
      ['Huevos revueltos o cocidos.', 'Servir con banano y queso.'],
      ['Queso fresco → yogur griego'],
      'Domingo de descanso activo — desayuno más tarde y tranquilo, sin horario de colegio.'),
      meal('a-dom-2', 'Snack', '10:30', [
        { name: 'Yogur griego', qty: '150 g' }, { name: 'Manzana', qty: '1 unidad' },
      ], { kcal: 203, protein: 14, carbs: 18, fat: 5 },
      ['Mezclar el yogur con la manzana picada.'],
      ['Yogur griego → yogur natural'],
      'Snack ligero de media mañana, día de menor gasto.'),
      meal('a-dom-3', 'Almuerzo', '13:00', [
        { name: 'Pollo pechuga', qty: '150 g' }, { name: 'Arroz blanco', qty: '120 g' }, { name: 'Brócoli', qty: '100 g' }, { name: 'Aceite', qty: '1 cda' },
      ], { kcal: 574, protein: 46, carbs: 42, fat: 20 },
      ['Pollo al horno simple, sal y especias, 25 min a 200°C.', 'Arroz blanco aparte.', 'Brócoli al vapor.'],
      ['Pollo → pavo'],
      'Almuerzo de mediodía, porción más chica porque es el día de menor gasto de la semana.'),
      meal('a-dom-4', 'Snack', '17:00', [
        { name: 'Maní', qty: '20 g' }, { name: 'Naranja', qty: '1 unidad' },
      ], { kcal: 160, protein: 5, carbs: 17, fat: 10 },
      ['Directo, sin cocción.'],
      ['Naranja → mandarina'],
      'Snack de la tarde, día tranquilo de recuperación activa.'),
      meal('a-dom-5', 'Cena', '20:00', [
        { name: 'Atún en lata', qty: '150 g' }, { name: 'Yuca', qty: '150 g' }, { name: 'Queso fresco extra', qty: '30 g' },
      ], { kcal: 523, protein: 51, carbs: 56, fat: 11 },
      ['Atún escurrido con limón y un poco de cebolla si hay.', 'Yuca sancochada.', 'Queso desmenuzado encima.'],
      ['Atún → huevo o pollo'],
      'Cierre del fin de semana — día libre/golosina disponible hoy (ver nota del plan), sin pasarse del total calórico del día.'),
    ],
  },
}

// ---------- SEMANA B ----------
const semanaB = {
  lunes: {
    type: 'normal',
    meals: [
      meal('b-lun-1', 'Desayuno', '6:30', [{ name: 'Huevo', qty: '4 unidades' }, { name: 'Pan blanco', qty: '40 g' }, { name: 'Naranja', qty: '1 unidad' }], { kcal: 455, protein: 32, carbs: 38, fat: 24 },
      ['Huevos revueltos o cocidos.', 'Servir con el pan y la naranja.'], ['Huevo → yogur griego + queso'],
      'Antes del colegio — proteína alta para sostener hasta el snack de media mañana.'),
      meal('b-lun-2', 'Snack colegio', '10:30', [{ name: 'Queso fresco', qty: '50 g' }, { name: 'Pan blanco', qty: '30 g' }, { name: 'Manzana', qty: '1 unidad' }], { kcal: 263, protein: 14, carbs: 40, fat: 10 },
      ['Sánduche sencillo de queso.'], ['Queso fresco → atún en lata'],
      'Cubre el hueco antes del gym de fuerza inferior de las 16:00.'),
      meal('b-lun-3', 'Almuerzo', '15:30', [{ name: 'Cerdo (lomo)', qty: '150 g' }, { name: 'Arroz integral', qty: '150 g' }, { name: 'Lechuga', qty: 'al gusto' }, { name: 'Aceite', qty: '1 cda' }], { kcal: 649, protein: 43, carbs: 48, fat: 33 }, ['Lomo a la plancha con comino y limón.', 'Arroz integral.'], ['Cerdo → pollo o pavo'],
      '30 min antes del gym — energía lista para entrenar.'),
      meal('b-lun-4', 'Snack pre-BJJ', '17:45', [{ name: 'Mango', qty: '1 unidad' }, { name: 'Maní', qty: '15 g' }], { kcal: 145, protein: 4, carbs: 17, fat: 8 },
      ['Directo, sin cocción.'], ['Mango → banano'],
      'Carbohidrato rápido entre el gym y el BJJ corto del lunes.'),
      meal('b-lun-5', 'Cena', '20:45', [{ name: 'Pavo pechuga', qty: '150 g' }, { name: 'Yuca', qty: '180 g' }, { name: 'Zanahoria', qty: '80 g' }, { name: 'Queso fresco', qty: '30 g' }], { kcal: 592, protein: 58, carbs: 74, fat: 9 }, ['Pavo horneado con hierbas.', 'Yuca sancochada.'], ['Pavo → pollo'],
      'Después del entrenamiento, para recuperar.'),
    ],
  },
  martes: {
    type: 'normal',
    meals: [
      meal('b-mar-1', 'Desayuno', '6:30', [{ name: 'Avena', qty: '60 g' }, { name: 'Leche deslactosada', qty: '200 ml' }, { name: 'Manzana', qty: '1 unidad' }, { name: 'Maní', qty: '15 g' }], { kcal: 519, protein: 20, carbs: 73, fat: 17 },
      ['Cocinar la avena con la leche.', 'Picar la manzana encima, agregar el maní.'], ['Leche deslactosada → leche entera'],
      'Carbohidrato de absorción lenta para arrancar el día.'),
      meal('b-mar-2', 'Snack colegio', '10:30', [{ name: 'Huevo', qty: '2 unidades' }, { name: 'Naranja', qty: '1 unidad' }], { kcal: 203, protein: 14, carbs: 12, fat: 11 },
      ['Huevos cocidos.'], ['Huevo → queso fresco'],
      'Cubre el hueco entre el desayuno y el almuerzo — martes no hay gym pero sí BJJ corto.'),
      meal('b-mar-3', 'Almuerzo', '15:30', [{ name: 'Carne de res', qty: '150 g' }, { name: 'Puré de papa', qty: '200 g' }, { name: 'Brócoli', qty: '100 g' }], { kcal: 559, protein: 43, carbs: 46, fat: 21 },
      ['Carne a la plancha.', 'Papa sancochada y aplastada con un poco de leche.', 'Brócoli al vapor.'], ['Carne de res → pavo'], 'Comida ligera, día sin gym — solo BJJ corto en la tarde.'),
      meal('b-mar-4', 'Snack pre-BJJ', '17:45', [{ name: 'Atún en lata', qty: '100 g' }, { name: 'Fresas', qty: '100 g' }], { kcal: 119, protein: 20, carbs: 12, fat: 1 },
      ['Directo, sin cocción.'], ['Fresas → manzana'],
      'Proteína rápida antes del BJJ de la tarde.'),
      meal('b-mar-5', 'Cena', '20:45', [{ name: 'Cerdo (lomo)', qty: '130 g' }, { name: 'Arroz blanco', qty: '150 g' }, { name: 'Lechuga', qty: 'al gusto' }, { name: 'Huevo extra', qty: '1 unidad' }], { kcal: 583, protein: 44, carbs: 49, fat: 23 },
      ['Lomo de cerdo a la plancha con ajo y limón.', 'Arroz aparte.', 'Huevo cocido o frito, al gusto.'], ['Cerdo → pollo'],
      'Después del BJJ, para recuperar.'),
    ],
  },
  miercoles: {
    type: 'alto',
    meals: [
      meal('b-mie-1', 'Desayuno', '6:30', [{ name: 'Huevo', qty: '4 unidades' }, { name: 'Pan blanco', qty: '80 g' }, { name: 'Banano', qty: '1 unidad' }], { kcal: 598, protein: 34, carbs: 76, fat: 22 },
      ['Huevos revueltos o cocidos.', 'Servir con pan y banano.'], ['Huevo → avena + yogur griego'],
      'Día de doble sesión — más carbohidrato desde el desayuno.'),
      meal('b-mie-2', 'Snack colegio', '10:30', [{ name: 'Queso fresco', qty: '50 g' }, { name: 'Pan blanco', qty: '40 g' }, { name: 'Mango', qty: '1 unidad' }], { kcal: 310, protein: 16, carbs: 55, fat: 11 },
      ['Sánduche de queso con el mango aparte.'], ['Mango → manzana'],
      'Cubre el hueco antes del gym de fuerza superior.'),
      meal('b-mie-3', 'Almuerzo', '15:30', [{ name: 'Cerdo (lomo)', qty: '150 g' }, { name: 'Arroz integral', qty: '250 g' }, { name: 'Choclo', qty: '100 g' }, { name: 'Lechuga', qty: 'al gusto' }], { kcal: 740, protein: 46, carbs: 140, fat: 15 },
      ['Lomo de cerdo al horno, 25 min a 200°C.', 'Arroz integral y choclo cocido aparte.', 'Lechuga fresca.'], ['Cerdo → pavo'], 'Día de doble sesión — más carbohidrato para rendir.'),
      meal('b-mie-4', 'Snack pre-BJJ', '17:45', [{ name: 'Manzana', qty: '2 unidades' }, { name: 'Maní', qty: '20 g' }, { name: 'Leche entera', qty: '250 ml' }], { kcal: 371, protein: 10, carbs: 57, fat: 19 },
      ['Directo, sin cocción.'], ['Manzana → mango'],
      'Entre el gym y el BJJ de 2h — snack más grande por el doble entrenamiento.'),
      meal('b-mie-5', 'Cena', '20:45', [{ name: 'Carne de res', qty: '150 g' }, { name: 'Yuca', qty: '250 g' }, { name: 'Aguacate', qty: '50 g' }], { kcal: 720, protein: 42, carbs: 100, fat: 29 },
      ['Carne a la plancha con sal, pimienta y comino.', 'Yuca sancochada.', 'Aguacate en rodajas.'], ['Carne de res → cerdo'],
      'Después del BJJ de 2h — cena más grande para recuperar.'),
    ],
  },
  jueves: {
    type: 'alto',
    meals: [
      meal('b-jue-1', 'Desayuno', '6:30', [{ name: 'Avena', qty: '80 g' }, { name: 'Leche entera', qty: '250 ml' }, { name: 'Mango', qty: '1 unidad' }, { name: 'Maní', qty: '15 g' }], { kcal: 652, protein: 24, carbs: 97, fat: 20 },
      ['Cocinar la avena con la leche.', 'Picar el mango encima, agregar el maní.'], ['Mango → banano'],
      'Jueves: mayor gasto calórico de la semana — desayuno con más carbohidrato desde temprano.'),
      meal('b-jue-2', 'Snack colegio', '10:30', [{ name: 'Huevo', qty: '3 unidades' }, { name: 'Naranja', qty: '1 unidad' }], { kcal: 281, protein: 20, carbs: 12, fat: 16 },
      ['Huevos cocidos.'], ['Huevo → queso fresco + yogur'],
      'Cubre el hueco antes del gym de acondicionamiento metabólico.'),
      meal('b-jue-3', 'Almuerzo', '15:30', [{ name: 'Pavo pechuga', qty: '180 g' }, { name: 'Arroz blanco', qty: '250 g' }, { name: 'Brócoli', qty: '100 g' }, { name: 'Pan blanco extra', qty: '40 g' }], { kcal: 801, protein: 61, carbs: 137, fat: 5 },
      ['Pavo a la plancha con especias.', 'Arroz y brócoli al vapor aparte.', 'Pan como acompañante.'], ['Pavo → pollo'], 'Jueves: mayor gasto calórico de la semana.'),
      meal('b-jue-4', 'Snack pre-BJJ', '17:45', [{ name: 'Banano', qty: '2 unidades' }, { name: 'Queso fresco', qty: '30 g' }], { kcal: 258, protein: 9, carbs: 46, fat: 5 },
      ['Directo, sin cocción.'], ['Queso fresco → yogur griego'],
      'Carbohidrato rápido entre el gym intenso y el BJJ de 2h.'),
      meal('b-jue-5', 'Cena', '20:45', [{ name: 'Carne de res', qty: '150 g' }, { name: 'Papa', qty: '250 g' }, { name: 'Zanahoria', qty: '80 g' }, { name: 'Aceite extra', qty: '1 cda' }], { kcal: 699, protein: 40, carbs: 86, fat: 25 },
      ['Carne al horno o a la plancha.', 'Papa al horno.', 'Zanahoria al vapor.'], ['Carne de res → cerdo'],
      'Cena más grande del día — recupera el mayor gasto calórico de la semana.'),
    ],
  },
  viernes: {
    type: 'alto',
    meals: [
      meal('b-vie-1', 'Desayuno', '6:30', [{ name: 'Huevo', qty: '4 unidades' }, { name: 'Pan blanco', qty: '60 g' }, { name: 'Naranja', qty: '1 unidad' }], { kcal: 518, protein: 35, carbs: 58, fat: 24 },
      ['Huevos revueltos o cocidos.', 'Servir con pan y naranja.'], ['Huevo → avena + yogur'],
      'Último día de doble sesión de la semana — desayuno completo.'),
      meal('b-vie-2', 'Snack colegio', '10:30', [{ name: 'Yogur natural', qty: '200 g' }, { name: 'Manzana', qty: '1 unidad' }, { name: 'Maní', qty: '15 g' }], { kcal: 281, protein: 11, carbs: 36, fat: 11 },
      ['Mezclar el yogur con la manzana picada y el maní.'], ['Yogur natural → yogur griego'],
      'Cubre el hueco antes del gym de potencia total.'),
      meal('b-vie-3', 'Almuerzo', '15:30', [{ name: 'Carne de res', qty: '180 g' }, { name: 'Arroz integral', qty: '300 g' }, { name: 'Lechuga', qty: 'al gusto' }], { kcal: 760, protein: 50, carbs: 156, fat: 12 },
      ['Carne salteada con ajo.', 'Arroz integral aparte.', 'Ensalada de lechuga.'], ['Carne de res → pollo'],
      '30 min antes del gym — carbohidrato alto para el último día fuerte de la semana.'),
      meal('b-vie-4', 'Snack pre-BJJ', '17:45', [{ name: 'Mango', qty: '2 unidades' }, { name: 'Queso fresco', qty: '50 g' }], { kcal: 251, protein: 10, carbs: 30, fat: 10 },
      ['Directo, sin cocción.'], ['Mango → banano'],
      'Entre el gym y el BJJ completo — snack más grande por ser día de doble sesión.'),
      meal('b-vie-5', 'Cena', '20:45', [{ name: 'Cerdo (lomo)', qty: '150 g' }, { name: 'Yuca', qty: '280 g' }, { name: 'Aguacate', qty: '60 g' }], { kcal: 779, protein: 42, carbs: 116, fat: 27 },
      ['Lomo de cerdo a la plancha.', 'Yuca sancochada.', 'Aguacate en rodajas.'], ['Cerdo → carne de res'],
      'Cierre de la semana fuerte — repone antes del fin de semana más ligero.'),
    ],
  },
  sabado: {
    type: 'normal',
    meals: [
      meal('b-sab-1', 'Desayuno', '6:30', [{ name: 'Huevo', qty: '3 unidades' }, { name: 'Pan blanco', qty: '50 g' }, { name: 'Banano', qty: '1 unidad' }], { kcal: 473, protein: 27, carbs: 50, fat: 18 },
      ['Huevos revueltos o cocidos.', 'Servir con pan y banano.'], ['Huevo → yogur griego'],
      'Sábado con entrenamiento más ligero — desayuno normal.'),
      meal('b-sab-2', 'Snack', '10:30', [{ name: 'Queso fresco', qty: '50 g' }, { name: 'Atún en lata', qty: '80 g' }, { name: 'Naranja', qty: '1 unidad' }], { kcal: 272, protein: 32, carbs: 15, fat: 11 },
      ['Directo, sin cocción.'], ['Atún → huevo cocido'],
      'Snack de media mañana antes del almuerzo más temprano del sábado.'),
      meal('b-sab-3', 'Almuerzo', '13:30', [{ name: 'Pavo pechuga', qty: '150 g' }, { name: 'Arroz blanco', qty: '150 g' }, { name: 'Brócoli', qty: '100 g' }], { kcal: 465, protein: 48, carbs: 49, fat: 2 },
      ['Pavo a la plancha.', 'Arroz aparte.', 'Brócoli al vapor.'], ['Pavo → pollo'],
      'Horario más libre del sábado — almuerzo a medio día.'),
      meal('b-sab-4', 'Snack', '17:00', [{ name: 'Yogur natural', qty: '150 g' }, { name: 'Mango', qty: '1 unidad' }], { kcal: 151, protein: 6, carbs: 20, fat: 4 },
      ['Mezclar el yogur con el mango picado.'], ['Yogur natural → yogur griego'],
      'Snack de la tarde, para no llegar con hambre a la cena.'),
      meal('b-sab-5', 'Cena', '20:00', [{ name: 'Carne de res', qty: '160 g' }, { name: 'Puré de papa', qty: '180 g' }, { name: 'Zanahoria', qty: '80 g' }, { name: 'Aceite', qty: '1 cda' }], { kcal: 575, protein: 40, carbs: 44, fat: 23 },
      ['Carne en trozos salteada con cebolla si hay.', 'Papa sancochada y aplastada.', 'Zanahoria al vapor.'], ['Carne de res → cerdo'],
      'Cierre del día, más temprano que entre semana.'),
    ],
  },
  domingo: {
    type: 'descanso',
    freeDay: true,
    meals: [
      meal('b-dom-1', 'Desayuno', '7:30', [{ name: 'Huevo', qty: '3 unidades' }, { name: 'Queso fresco', qty: '30 g' }, { name: 'Naranja', qty: '1 unidad' }], { kcal: 363, protein: 28, carbs: 15, fat: 24 },
      ['Huevos revueltos o cocidos.', 'Servir con queso y naranja.'], ['Queso fresco → yogur griego'],
      'Domingo de descanso activo — desayuno más tarde y tranquilo.'),
      meal('b-dom-2', 'Snack', '10:30', [{ name: 'Yogur natural', qty: '150 g' }, { name: 'Manzana', qty: '1 unidad' }], { kcal: 139, protein: 5, carbs: 19, fat: 5 },
      ['Mezclar el yogur con la manzana picada.'], ['Yogur natural → yogur griego'],
      'Snack ligero de media mañana, día de menor gasto.'),
      meal('b-dom-3', 'Almuerzo', '13:00', [{ name: 'Pavo pechuga', qty: '180 g' }, { name: 'Arroz integral', qty: '120 g' }, { name: 'Lechuga', qty: 'al gusto' }], { kcal: 426, protein: 56, carbs: 42, fat: 2 },
      ['Pavo a la plancha simple.', 'Arroz integral aparte.', 'Ensalada de lechuga.'], ['Pavo → pollo'],
      'Almuerzo de mediodía, porción más chica por ser el día de menor gasto.'),
      meal('b-dom-4', 'Snack', '17:00', [{ name: 'Maní', qty: '20 g' }, { name: 'Naranja', qty: '1 unidad' }], { kcal: 160, protein: 5, carbs: 17, fat: 10 },
      ['Directo, sin cocción.'], ['Naranja → mandarina'],
      'Snack de la tarde, día tranquilo de recuperación activa.'),
      meal('b-dom-5', 'Cena', '20:00', [{ name: 'Carne de res', qty: '150 g' }, { name: 'Yuca', qty: '150 g' }, { name: 'Zanahoria', qty: '80 g' }], { kcal: 496, protein: 38, carbs: 69, fat: 17 },
      ['Carne a la plancha.', 'Yuca sancochada.', 'Zanahoria al vapor.'], ['Carne de res → cerdo'],
      'Cierre del fin de semana — día libre/golosina disponible hoy, sin pasarse del total calórico del día.'),
    ],
  },
}

export const WEEKS = { A: semanaA, B: semanaB }

// ---------- CALENDARIO (29 oct - 28 nov 2026) ----------
// Cada entrada: fecha ISO -> { week: 'A'|'B'|'viaje', day: clave del día en WEEKS }
export const CALENDAR = {
  '2026-10-29': { week: 'A', day: 'jueves' },
  '2026-10-30': { week: 'A', day: 'viernes' },
  '2026-10-31': { week: 'A', day: 'sabado' },
  '2026-11-01': { week: 'A', day: 'domingo' },
  '2026-11-02': { week: 'viaje' },
  '2026-11-03': { week: 'viaje' },
  '2026-11-04': { week: 'viaje' },
  '2026-11-05': { week: 'viaje' },
  '2026-11-06': { week: 'viaje' },
  '2026-11-07': { week: 'viaje' },
  '2026-11-08': { week: 'viaje' },
  '2026-11-09': { week: 'viaje' },
  '2026-11-10': { week: 'B', day: 'martes' },
  '2026-11-11': { week: 'B', day: 'miercoles' },
  '2026-11-12': { week: 'B', day: 'jueves' },
  '2026-11-13': { week: 'B', day: 'viernes' },
  '2026-11-14': { week: 'B', day: 'sabado' },
  '2026-11-15': { week: 'B', day: 'domingo' },
  '2026-11-16': { week: 'A', day: 'lunes' },
  '2026-11-17': { week: 'A', day: 'martes' },
  '2026-11-18': { week: 'A', day: 'miercoles' },
  '2026-11-19': { week: 'A', day: 'jueves' },
  '2026-11-20': { week: 'A', day: 'viernes' },
  '2026-11-21': { week: 'A', day: 'sabado' },
  '2026-11-22': { week: 'A', day: 'domingo' },
  '2026-11-23': { week: 'B', day: 'lunes' },
  '2026-11-24': { week: 'B', day: 'martes' },
  '2026-11-25': { week: 'B', day: 'miercoles' },
  '2026-11-26': { week: 'B', day: 'jueves' },
  '2026-11-27': { week: 'B', day: 'viernes' },
  '2026-11-28': { week: 'B', day: 'sabado' },
}

export const DAY_LABELS = {
  lunes: 'Lunes', martes: 'Martes', miercoles: 'Miércoles', jueves: 'Jueves',
  viernes: 'Viernes', sabado: 'Sábado', domingo: 'Domingo',
}

// Override manual de tipo de día (examen, cambio de horario, etc.) — ver data/storage.js getDayOverride.
// Se aplica encima del calendario base, sin tocar los datos originales.
export function getPlanForDate(dateISO, overrideType) {
  const entry = CALENDAR[dateISO]
  if (!entry) return null
  if (entry.week === 'viaje') return { type: 'viaje', meals: [] }
  const base = WEEKS[entry.week][entry.day]
  const type = overrideType || base.type
  return { ...base, type, originalType: base.type, weekLabel: entry.week, dayKey: entry.day }
}

// Aplica el multiplicador de ajuste automático (Progreso) a un target — nunca a la proteína.
// Ver plan-fase4/ajustes-automaticos.md para las reglas completas.
export function adjustedTarget(type, multiplier = 1) {
  const base = DAY_TARGETS[type]
  if (!base) return base
  return {
    ...base,
    kcal: Math.round(base.kcal * multiplier),
    carbs: Math.round(base.carbs * multiplier),
    fat: Math.round(base.fat * multiplier),
  }
}

export function hydrationTarget(type) {
  if (type === 'alto') return 3.9
  if (type === 'normal') return 3.25
  if (type === 'descanso') return 2.95
  return 3.3 // viaje
}
