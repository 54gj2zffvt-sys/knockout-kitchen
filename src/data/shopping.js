// De /nutriologo-mma/plan-fase4/lista-compras.md — precios estimados, no reales (ver el .md)
export const SHOPPING_LIST = [
  { category: 'Proteínas', items: [
    { id: 'pollo', name: 'Pollo (pechuga)', qty: '~800g-1 kg', price: '~$3' },
    { id: 'res', name: 'Carne de res', qty: '~500g', price: '~$4-5' },
    { id: 'cerdo', name: 'Cerdo (lomo)', qty: '~300g', price: '~$2.50-3' },
    { id: 'pavo', name: 'Pavo (pechuga)', qty: '~300g', price: '~$3-4' },
    { id: 'atun', name: 'Atún en lata', qty: '3-4 latas', price: '~$3-4' },
    { id: 'huevos', name: 'Huevos', qty: '2-2.5 docenas', price: '~$4-5' },
    { id: 'queso', name: 'Queso fresco', qty: '~300g', price: '~$2-2.50' },
    { id: 'yogur', name: 'Yogur griego o natural', qty: '~800g-1L', price: '~$4-5' },
    { id: 'lenteja', name: 'Lenteja (seca)', qty: '~200g', price: '~$0.80' },
  ]},
  { category: 'Carbohidratos', items: [
    { id: 'arroz', name: 'Arroz (blanco + integral)', qty: '~1.5 kg', price: '~$1.50' },
    { id: 'papa', name: 'Papa', qty: '~1 kg', price: '~$1' },
    { id: 'yuca', name: 'Yuca', qty: '~800g-1kg', price: '~$1' },
    { id: 'choclo', name: 'Choclo', qty: '2 unidades', price: '~$1' },
    { id: 'avena', name: 'Avena en hojuelas', qty: '~300g', price: '~$1' },
    { id: 'pan', name: 'Pan blanco', qty: '1 funda', price: '~$1.50' },
  ]},
  { category: 'Vegetales y grasas', items: [
    { id: 'brocoli', name: 'Brócoli', qty: '~500-600g', price: '~$1.50' },
    { id: 'zanahoria', name: 'Zanahoria', qty: '~300g', price: '~$0.50' },
    { id: 'lechuga', name: 'Lechuga', qty: 'al gusto', price: '~$1' },
    { id: 'aguacate', name: 'Aguacate', qty: '3-4 unidades', price: '~$2' },
    { id: 'mani', name: 'Maní / mantequilla de maní', qty: '1 funda + 1 frasco', price: '~$3' },
  ]},
  { category: 'Frutas', items: [
    { id: 'banano', name: 'Banano/guineo', qty: '8-10 unidades', price: '~$1' },
    { id: 'manzana', name: 'Manzana', qty: '5-6 unidades', price: '~$2.50' },
    { id: 'naranja', name: 'Naranja', qty: '5-6 unidades', price: '~$1.50' },
    { id: 'mango', name: 'Mango', qty: '2-3 unidades', price: '~$1.50' },
    { id: 'fresa', name: 'Fresa / uvas', qty: '1 funda chica', price: '~$2' },
  ]},
  { category: 'Lácteos', items: [
    { id: 'leche', name: 'Leche entera o deslactosada', qty: '~1.5-2 L', price: '~$2' },
  ]},
]

export const PREP_TIPS = [
  'Cocinar proteínas y carbohidratos (pollo, carne, arroz, papa, yuca) 1-2 veces por semana en lote, dividir en recipientes individuales.',
  'Huevos: cocinarlos frescos cada día o cada 2 días.',
  'Todo lo cocinado dura 3-4 días en refrigerador. Si cocinas el domingo para toda la semana, congela lo de jueves en adelante.',
  'Vegetales frescos: comprar para 3-4 días a la vez, no toda la semana de golpe.',
]
