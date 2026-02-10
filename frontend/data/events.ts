export const COMENTARIOS_POOL = [
  { sector: "Sector Sur", text: "¡Otra vez sin luz! Pero las empanadas están ricas.", sentiment: "neutral" },
  { sector: "Casco Céntrico", text: "Los baches ya tienen nombre y apellido.", sentiment: "bad" },
  { sector: "Barrio Humilde", text: "Gracias por la canchita, los pibes están chochos.", sentiment: "good" },
  { sector: "Zona Norte", text: "¿Para esto pago mis impuestos?", sentiment: "bad" },
  { sector: "Municipio", text: "Se filtró que el intendente usa la caja para el asado.", sentiment: "bad" }
];

export const DILEMAS_POOL = [
  {
    id: "vendedores_ambulantes",
    title: "Invasión de Manteros",
    description: "La peatonal está intransitable. Los comerciantes establecidos exigen mano dura, pero los manteros dicen que 'hay que laburar'.",
    icon: "🛍️",
    options: [
      { text: "Decomisar todo", flavorEffect: "+10 Pop. Comerciantes | +5 Corrupción", effects: { popularity: -5, corruption: 5 } },
      { text: "Cobrarles un 'canon'", flavorEffect: "+$20.000 mensuales | -10 Popularidad", effects: { budget: 20000, popularity: -10 } }
    ]
  },
  {
    id: "bache_famoso",
    title: "El Bache 'Titanic'",
    description: "Un bache en la avenida principal es tan grande que los vecinos le pusieron nombre y le festejan el cumpleaños.",
    icon: "🕳️",
    options: [
      { text: "Asfaltar de noche", flavorEffect: "-$40.000 | +15 Popularidad", effects: { budget: -40000, popularity: 15 } },
      { text: "Ponerle una valla", flavorEffect: "-$500 | -5 Popularidad", effects: { budget: -500, popularity: -5 } }
    ]
  },
  {
    id: "sobrino_puesto",
    title: "Nepotismo Ilustrado",
    description: "Tu cuñado te pide 'un puestito' para su hijo. No sabe hacer nada, pero es familia.",
    icon: "👨‍👩-👦",
    options: [
      { text: "Asesor de 'Futuro'", flavorEffect: "-$15.000 mes | +10 Corrupción", effects: { budget: -15000, corruption: 10 } },
      { text: "Que mande CV", flavorEffect: "-15 Pop. Familiar", effects: { popularity: -5 } }
    ]
  },
  {
    id: "parque_diversiones",
    title: "Circo Itinerante",
    description: "Un parque de diversiones pide instalarse. Los juegos parecen oxidados, pero ofrecen una 'atención' al municipio.",
    icon: "🎡",
    options: [
      { text: "Habilitación express", flavorEffect: "+$50.000 'Bajo mano' | +15 Corrupción", effects: { budget: 50000, corruption: 15 } },
      { text: "Inspección rigurosa", flavorEffect: "-$5.000 | +5 Popularidad", effects: { budget: -5000, popularity: 5 } }
    ]
  },
  {
    id: "mural_intendente",
    title: "Muralismo Egocéntrico",
    description: "Tus asesores sugieren pintar un mural gigante con tu cara para 'embellecer' la entrada al pueblo.",
    icon: "🎨",
    options: [
      { text: "¡Hágase mi rostro!", flavorEffect: "-$25.000 | -10 Pop. (Cringe)", effects: { budget: -25000, popularity: -10 } },
      { text: "Mejor una bandera", flavorEffect: "-$10.000 | +2 Popularidad", effects: { budget: -10000, popularity: 2 } }
    ]
  },
  {
    id: "huelga_transporte",
    title: "Paro de Colectivos",
    description: "La UTA local cortó los accesos. La gente no llega a laburar y el humor social vuela por los aires.",
    icon: "🚌",
    options: [
      { text: "Subsidio de urgencia", flavorEffect: "-$80.000 | +15 Popularidad", effects: { budget: -80000, popularity: 15 } },
      { text: "Multar a la empresa", flavorEffect: "+$30.000 | -10 Popularidad", effects: { budget: 30000, popularity: -10 } }
    ]
  },
  {
    id: "fiesta_patronal",
    title: "Día del Pueblo",
    description: "Es el aniversario. Si no hay choripán gratis para todos, hay disturbios.",
    icon: "🎉",
    options: [
      { text: "Chori y Vino libre", flavorEffect: "-$60.000 | +25 Popularidad", effects: { budget: -60000, popularity: 25 } },
      { text: "Acto protocolar seco", flavorEffect: "-$5.000 | -15 Popularidad", effects: { budget: -5000, popularity: -15 } }
    ]
  },
  {
    id: "empresa_contaminante",
    title: "La Curtiembre",
    description: "Una fábrica tira químicos al río, pero emplea a 200 personas. El olor es insoportable.",
    icon: "🏭",
    options: [
      { text: "Clausurar fábrica", flavorEffect: "-$50.000 Impuestos | +20 Popularidad", effects: { budget: -50000, popularity: 20 } },
      { text: "Mirar para otro lado", flavorEffect: "+$40.000 'Donación' | +20 Corrupción", effects: { budget: 40000, corruption: 20 } }
    ]
  },
  {
    id: "pauta_medios",
    title: "El Periodista Picante",
    description: "Un periodista local descubrió que compraste facturas con fondos públicos. Te pide pauta oficial para callarse.",
    icon: "📻",
    options: [
      { text: "Comprar silencio", flavorEffect: "-$12.000 mes | +8 Corrupción", effects: { budget: -12000, corruption: 8 } },
      { text: "Guerra mediática", flavorEffect: "-15 Popularidad", effects: { popularity: -15 } }
    ]
  },
  {
    id: "antena_5g",
    title: "Antenas y Miedo",
    description: "Quieren instalar una antena. Los vecinos dicen que da cáncer y que controla mentes. El canon es alto.",
    icon: "📡",
    options: [
      { text: "Habilitar antena", flavorEffect: "+$70.000 | -20 Popularidad", effects: { budget: 70000, popularity: -20 } },
      { text: "Prohibir tecnología", flavorEffect: "+10 Popularidad (Miedo)", effects: { popularity: 10 } }
    ]
  }
];