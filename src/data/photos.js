// Fotos reales de comida (Pexels, licencia gratuita) — una por categoría de alimento principal,
// reutilizada en todas las comidas que comparten esa proteína/base. Créditos abajo, mostrados
// en la pantalla "Créditos de fotos".

export const PHOTO_CREDITS = [
  { file: 'pollo.jpg', author: 'Eyimofe Odunusi', url: 'https://www.pexels.com/photo/delicious-grilled-chicken-with-rice-dish-33481128/' },
  { file: 'carne.jpg', author: 'Daniel Maurício Bertoli', url: 'https://www.pexels.com/photo/grilled-steak-with-mashed-potatoes-and-rice-platter-34536631/' },
  { file: 'cerdo.jpg', author: 'Иван Григорьев', url: 'https://www.pexels.com/photo/pork-chops-and-rice-with-vegetables-decorated-with-parsley-19362399/' },
  { file: 'pavo.jpg', author: 'alleksana', url: 'https://www.pexels.com/photo/roasted-chicken-breasts-with-sauce-on-the-side-6107756/' },
  { file: 'atun.jpg', author: 'Nadin Sh', url: 'https://www.pexels.com/photo/top-view-of-a-poke-bowl-with-rice-fish-and-vegetables-26390891/' },
  { file: 'huevo.jpg', author: 'Nadin Sh', url: 'https://www.pexels.com/photo/delicious-breakfast-plate-with-scrambled-eggs-38516089/' },
  { file: 'avena.jpg', author: 'Polina Tankilevitch', url: 'https://www.pexels.com/photo/oatmeal-with-fresh-fruits-in-a-bowl-with-spoon-4725744/' },
  { file: 'yogur.jpg', author: 'Enisa Halidi', url: 'https://www.pexels.com/photo/delicious-greek-yogurt-with-fresh-fruits-and-honey-29516115/' },
  { file: 'snack-fruta.jpg', author: 'Lisa Fotios', url: 'https://www.pexels.com/photo/bread-with-banana-slices-and-peanut-butter-20605006/' },
]

// Orden de prioridad: el primer alimento del plato que calce con una palabra clave define la foto.
const RULES = [
  [/carne|molida|res\b/i, 'carne.jpg'],
  [/cerdo|lomo de cerdo/i, 'cerdo.jpg'],
  [/pavo/i, 'pavo.jpg'],
  [/pollo/i, 'pollo.jpg'],
  [/atún|atun/i, 'atun.jpg'],
  [/avena/i, 'avena.jpg'],
  [/huevo/i, 'huevo.jpg'],
  [/yogur/i, 'yogur.jpg'],
]

export function photoForMeal(meal) {
  const text = meal.foods.map((f) => f.name).join(' ')
  for (const [re, file] of RULES) {
    if (re.test(text)) return `${import.meta.env.BASE_URL}images/food/${file}`
  }
  return `${import.meta.env.BASE_URL}images/food/snack-fruta.jpg`
}
