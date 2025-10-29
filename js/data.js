/* ========================================
   DATA.JS - Perfume Dataset
   ======================================== */

/**
 * Dataset of perfumes with complete metadata
 * This data is used throughout the application for search, filtering, and display
 */

export const perfumes = [
  {
    id: 'p001',
    brand: 'Maison Lumière',
    name: 'Soleil d\'Orient',
    description: 'Una fragancia luminosa que captura la esencia del amanecer mediterráneo con notas cítricas brillantes y un corazón floral elegante.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.5,
    votes: 342,
    notesTop: ['bergamota', 'naranja sanguina', 'pomelo'],
    notesMiddle: ['jazmín', 'neroli', 'rosa'],
    notesBase: ['ámbar', 'almizcle blanco', 'madera de cedro'],
    gender: 'unisex',
    season: ['spring', 'summer'],
    popularityScore: 95,
    releaseYear: 2023,
    longevity: 85,
    sillage: 70,
    accords: ['cítrico', 'floral', 'ambarado']
  },
  {
    id: 'p002',
    brand: 'Noir Élégance',
    name: 'Velours Noir',
    description: 'Sofisticación absoluta en un frasco. Una mezcla opulenta de especias orientales y maderas preciosas que evoca el lujo de la noche parisina.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.8,
    votes: 521,
    notesTop: ['cardamomo', 'pimienta rosa', 'bergamota'],
    notesMiddle: ['iris', 'violeta', 'rosa turca'],
    notesBase: ['oud', 'pachulí', 'vainilla'],
    gender: 'unisex',
    season: ['fall', 'winter'],
    popularityScore: 98,
    releaseYear: 2022,
    longevity: 95,
    sillage: 90,
    accords: ['oriental', 'amaderado', 'especiado']
  },
  {
    id: 'p003',
    brand: 'Aqua Vitae',
    name: 'Marine Breeze',
    description: 'Frescura oceánica con un toque de sofisticación. Perfecto para el día a día, evoca la brisa marina con notas acuáticas y cítricas.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.2,
    votes: 287,
    notesTop: ['limón', 'menta acuática', 'sal marina'],
    notesMiddle: ['lavanda', 'geranio', 'salvia'],
    notesBase: ['almizcle', 'ámbar gris', 'madera deriva'],
    gender: 'male',
    season: ['spring', 'summer'],
    popularityScore: 78,
    releaseYear: 2023,
    longevity: 65,
    sillage: 55,
    accords: ['acuático', 'aromático', 'fresco']
  },
  {
    id: 'p004',
    brand: 'Rose Impériale',
    name: 'Éclat de Rose',
    description: 'La quintaesencia de la rosa en su máxima expresión. Romántico y femenino, pero con carácter y presencia inolvidable.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.6,
    votes: 412,
    notesTop: ['rosa damascena', 'lichi', 'pera'],
    notesMiddle: ['rosa de mayo', 'peonía', 'magnolia'],
    notesBase: ['almizcle', 'madera de sándalo', 'vainilla'],
    gender: 'female',
    season: ['spring', 'fall'],
    popularityScore: 89,
    releaseYear: 2021,
    longevity: 80,
    sillage: 75,
    accords: ['floral', 'rosa', 'frutal']
  },
  {
    id: 'p005',
    brand: 'Bois Sauvage',
    name: 'Forêt Mystique',
    description: 'Adentrarse en un bosque milenario al amanecer. Notas verdes y amaderadas que evocan la naturaleza en su estado más puro.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.4,
    votes: 298,
    notesTop: ['hojas de violeta', 'menta verde', 'cypress'],
    notesMiddle: ['cedro', 'vetiver', 'musgo de roble'],
    notesBase: ['pachulí', 'ámbar', 'cuero'],
    gender: 'male',
    season: ['fall', 'winter'],
    popularityScore: 82,
    releaseYear: 2022,
    longevity: 88,
    sillage: 80,
    accords: ['verde', 'amaderado', 'terroso']
  },
  {
    id: 'p006',
    brand: 'Vanille Royale',
    name: 'Douceur Vanillée',
    description: 'Calidez envolvente con vainilla de Madagascar, complementada con toques gourmand y maderas cremosas.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.7,
    votes: 556,
    notesTop: ['caramelo', 'bergamota', 'mandarina'],
    notesMiddle: ['vainilla bourbon', 'heliotropo', 'orquídea'],
    notesBase: ['vainilla', 'benjuí', 'tonka'],
    gender: 'female',
    season: ['fall', 'winter'],
    popularityScore: 92,
    releaseYear: 2020,
    longevity: 90,
    sillage: 85,
    accords: ['gourmand', 'vainilla', 'dulce']
  },
  {
    id: 'p007',
    brand: 'Citrus Garden',
    name: 'Limonaia',
    description: 'Explosión cítrica vibrante que evoca un jardín de limoneros al mediodía. Refrescante y energizante.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.0,
    votes: 189,
    notesTop: ['limón', 'yuzu', 'mandarina verde'],
    notesMiddle: ['azahar', 'petit grain', 'té verde'],
    notesBase: ['almizcle blanco', 'vetiver', 'cedro'],
    gender: 'unisex',
    season: ['spring', 'summer'],
    popularityScore: 71,
    releaseYear: 2023,
    longevity: 60,
    sillage: 50,
    accords: ['cítrico', 'fresco', 'verde']
  },
  {
    id: 'p008',
    brand: 'Noir Élégance',
    name: 'Cuir Précieux',
    description: 'Cuero artesanal con toques de tabaco y especias. Masculino, audaz y extremadamente elegante.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.5,
    votes: 367,
    notesTop: ['azafrán', 'pimienta negra', 'elemi'],
    notesMiddle: ['cuero', 'iris', 'cedro'],
    notesBase: ['cuero', 'tabaco', 'vetiver'],
    gender: 'male',
    season: ['fall', 'winter'],
    popularityScore: 86,
    releaseYear: 2021,
    longevity: 92,
    sillage: 88,
    accords: ['cuero', 'especiado', 'amaderado']
  },
  {
    id: 'p009',
    brand: 'Fleur de Lune',
    name: 'Jasmin de Nuit',
    description: 'Jazmín hipnótico que florece bajo la luna llena. Sensual, misterioso y profundamente femenino.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.6,
    votes: 423,
    notesTop: ['pera', 'mandarina', 'grosella negra'],
    notesMiddle: ['jazmín sambac', 'gardenia', 'ylang-ylang'],
    notesBase: ['almizcle', 'ámbar', 'sándalo'],
    gender: 'female',
    season: ['spring', 'summer', 'fall'],
    popularityScore: 88,
    releaseYear: 2022,
    longevity: 82,
    sillage: 78,
    accords: ['floral', 'blanco floral', 'almizclado']
  },
  {
    id: 'p010',
    brand: 'Épices Orientales',
    name: 'Souk d\'Épices',
    description: 'Un viaje sensorial a los mercados de Marrakech. Especias cálidas, resinas y maderas exóticas.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.3,
    votes: 276,
    notesTop: ['cardamomo', 'canela', 'nuez moscada'],
    notesMiddle: ['clavo', 'incienso', 'rosa'],
    notesBase: ['ámbar', 'mirra', 'sándalo'],
    gender: 'unisex',
    season: ['fall', 'winter'],
    popularityScore: 79,
    releaseYear: 2021,
    longevity: 87,
    sillage: 83,
    accords: ['especiado', 'oriental', 'resinoso']
  },
  {
    id: 'p011',
    brand: 'Maison Lumière',
    name: 'Jardin Secret',
    description: 'Un jardín privado al atardecer. Flores blancas, hierbas aromáticas y un toque de miel.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.4,
    votes: 312,
    notesTop: ['nardo', 'albahaca', 'bergamota'],
    notesMiddle: ['jazmín', 'gardenia', 'flor de azahar'],
    notesBase: ['miel', 'almizcle', 'ámbar'],
    gender: 'female',
    season: ['spring', 'summer'],
    popularityScore: 81,
    releaseYear: 2023,
    longevity: 75,
    sillage: 68,
    accords: ['floral', 'verde', 'dulce']
  },
  {
    id: 'p012',
    brand: 'Aqua Vitae',
    name: 'Cascade Fraîche',
    description: 'La pureza del agua de montaña con un toque de hierbas alpinas. Fresco y revitalizante.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.1,
    votes: 198,
    notesTop: ['menta', 'limón', 'eucalipto'],
    notesMiddle: ['lavanda', 'romero', 'salvia'],
    notesBase: ['cedro', 'vetiver', 'almizcle'],
    gender: 'unisex',
    season: ['spring', 'summer'],
    popularityScore: 73,
    releaseYear: 2023,
    longevity: 62,
    sillage: 52,
    accords: ['aromático', 'fresco', 'verde']
  },
  {
    id: 'p013',
    brand: 'Rose Impériale',
    name: 'Pivoine Élégante',
    description: 'Peonía en su máximo esplendor. Fresca, romántica y con un toque de frutas rojas.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.5,
    votes: 389,
    notesTop: ['frambuesa', 'lichi', 'manzana'],
    notesMiddle: ['peonía', 'rosa', 'fresia'],
    notesBase: ['almizcle', 'cedro', 'ámbar'],
    gender: 'female',
    season: ['spring'],
    popularityScore: 84,
    releaseYear: 2022,
    longevity: 72,
    sillage: 65,
    accords: ['floral', 'frutal', 'fresco']
  },
  {
    id: 'p014',
    brand: 'Bois Sauvage',
    name: 'Ébène Intense',
    description: 'Ébano puro y profundo con toques ahumados. Para quienes buscan una declaración audaz.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.7,
    votes: 445,
    notesTop: ['bergamota', 'pimienta rosa', 'jengibre'],
    notesMiddle: ['ébano', 'cedro', 'ciprés'],
    notesBase: ['ébano', 'vetiver', 'pachulí'],
    gender: 'unisex',
    season: ['fall', 'winter'],
    popularityScore: 90,
    releaseYear: 2021,
    longevity: 94,
    sillage: 89,
    accords: ['amaderado', 'ahumado', 'especiado']
  },
  {
    id: 'p015',
    brand: 'Vanille Royale',
    name: 'Ambre Doré',
    description: 'Ámbar cálido con vainilla y especias dulces. Envolvente como un abrazo en una noche de invierno.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.6,
    votes: 478,
    notesTop: ['mandarina', 'canela', 'cardamomo'],
    notesMiddle: ['ámbar', 'labdanum', 'olíbano'],
    notesBase: ['vainilla', 'ámbar', 'almizcle'],
    gender: 'unisex',
    season: ['fall', 'winter'],
    popularityScore: 87,
    releaseYear: 2020,
    longevity: 89,
    sillage: 84,
    accords: ['ambarado', 'especiado', 'cálido']
  },
  {
    id: 'p016',
    brand: 'Citrus Garden',
    name: 'Zeste Pétillant',
    description: 'Cítricos efervescentes con un corazón de hierbas aromáticas. Energizante y optimista.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 3.9,
    votes: 156,
    notesTop: ['pomelo', 'mandarina', 'lima'],
    notesMiddle: ['jengibre', 'menta', 'té blanco'],
    notesBase: ['almizcle', 'ámbar', 'cedro'],
    gender: 'unisex',
    season: ['spring', 'summer'],
    popularityScore: 68,
    releaseYear: 2023,
    longevity: 58,
    sillage: 48,
    accords: ['cítrico', 'fresco', 'especiado']
  },
  {
    id: 'p017',
    brand: 'Noir Élégance',
    name: 'Musc Sublime',
    description: 'Almizcle sensual en su forma más pura. Limpio, íntimo y profundamente seductor.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.8,
    votes: 612,
    notesTop: ['bergamota', 'aldehídos', 'pimienta rosa'],
    notesMiddle: ['almizcle', 'iris', 'rosa'],
    notesBase: ['almizcle blanco', 'cachemira', 'ámbar'],
    gender: 'unisex',
    season: ['fall', 'winter', 'spring'],
    popularityScore: 96,
    releaseYear: 2022,
    longevity: 91,
    sillage: 75,
    accords: ['almizclado', 'limpio', 'polvoriento']
  },
  {
    id: 'p018',
    brand: 'Fleur de Lune',
    name: 'Magnolia Blanche',
    description: 'Magnolia cremosa con un toque de cítricos. Elegancia floral en estado puro.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.4,
    votes: 334,
    notesTop: ['limón', 'bergamota', 'hoja verde'],
    notesMiddle: ['magnolia', 'jazmín', 'nardo'],
    notesBase: ['vetiver', 'cedro', 'almizcle'],
    gender: 'female',
    season: ['spring', 'summer'],
    popularityScore: 80,
    releaseYear: 2022,
    longevity: 76,
    sillage: 70,
    accords: ['floral', 'cítrico', 'verde']
  },
  {
    id: 'p019',
    brand: 'Épices Orientales',
    name: 'Encens Sacré',
    description: 'Incienso místico con resinas preciosas. Espiritual, profundo y ceremonial.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.5,
    votes: 298,
    notesTop: ['limón', 'pimienta negra', 'elemi'],
    notesMiddle: ['incienso', 'olíbano', 'mirra'],
    notesBase: ['incienso', 'pachulí', 'cedro'],
    gender: 'unisex',
    season: ['fall', 'winter'],
    popularityScore: 83,
    releaseYear: 2021,
    longevity: 93,
    sillage: 87,
    accords: ['resinoso', 'incienso', 'amaderado']
  },
  {
    id: 'p020',
    brand: 'Maison Lumière',
    name: 'Fleur de Coton',
    description: 'Suavidad del algodón con flores blancas. Limpio, reconfortante y luminoso.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.3,
    votes: 267,
    notesTop: ['limón', 'bergamota', 'aldehídos'],
    notesMiddle: ['algodón', 'iris', 'fresia'],
    notesBase: ['almizcle blanco', 'madera de cachemira', 'cedro'],
    gender: 'unisex',
    season: ['spring', 'summer'],
    popularityScore: 77,
    releaseYear: 2023,
    longevity: 68,
    sillage: 60,
    accords: ['limpio', 'almizclado', 'floral']
  },
  {
    id: 'p021',
    brand: 'Aqua Vitae',
    name: 'Océan Profond',
    description: 'Las profundidades del océano capturadas en un frasco. Mineral, salino y misterioso.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.2,
    votes: 223,
    notesTop: ['sal marina', 'bergamota', 'menta acuática'],
    notesMiddle: ['algas marinas', 'salvia', 'geranio'],
    notesBase: ['ámbar gris', 'cedro', 'almizcle'],
    gender: 'male',
    season: ['spring', 'summer'],
    popularityScore: 75,
    releaseYear: 2023,
    longevity: 70,
    sillage: 62,
    accords: ['acuático', 'aromático', 'marino']
  },
  {
    id: 'p022',
    brand: 'Rose Impériale',
    name: 'Rose Oud',
    description: 'El encuentro perfecto entre la rosa búlgara y el oud camboyano. Lujo absoluto.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.9,
    votes: 687,
    notesTop: ['azafrán', 'pimienta rosa'],
    notesMiddle: ['rosa búlgara', 'geranio', 'davana'],
    notesBase: ['oud', 'pachulí', 'sándalo'],
    gender: 'unisex',
    season: ['fall', 'winter'],
    popularityScore: 99,
    releaseYear: 2021,
    longevity: 97,
    sillage: 95,
    accords: ['oud', 'rosa', 'especiado']
  },
  {
    id: 'p023',
    brand: 'Bois Sauvage',
    name: 'Cèdre Atlas',
    description: 'Cedro del Atlas en toda su majestuosidad. Noble, seco y profundamente masculino.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.4,
    votes: 312,
    notesTop: ['bergamota', 'limón', 'ciprés'],
    notesMiddle: ['cedro atlas', 'vetiver', 'geranio'],
    notesBase: ['cedro', 'pachulí', 'musgo de roble'],
    gender: 'male',
    season: ['fall', 'winter', 'spring'],
    popularityScore: 82,
    releaseYear: 2022,
    longevity: 86,
    sillage: 78,
    accords: ['amaderado', 'aromático', 'seco']
  },
  {
    id: 'p024',
    brand: 'Vanille Royale',
    name: 'Caramel Beurré',
    description: 'Gourmand irresistible con caramelo salado y vainilla. Dulzura sofisticada.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.5,
    votes: 456,
    notesTop: ['pera', 'manzana', 'bergamota'],
    notesMiddle: ['caramelo', 'vainilla', 'praline'],
    notesBase: ['caramelo salado', 'vainilla', 'tonka'],
    gender: 'female',
    season: ['fall', 'winter'],
    popularityScore: 85,
    releaseYear: 2020,
    longevity: 84,
    sillage: 80,
    accords: ['gourmand', 'dulce', 'caramelo']
  },
  {
    id: 'p025',
    brand: 'Citrus Garden',
    name: 'Bergamote Solaire',
    description: 'Bergamota iluminada por el sol con un corazón de té blanco. Refinado y elegante.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.3,
    votes: 245,
    notesTop: ['bergamota', 'limón', 'petit grain'],
    notesMiddle: ['té blanco', 'neroli', 'jazmín'],
    notesBase: ['almizcle', 'ámbar', 'madera de cedro'],
    gender: 'unisex',
    season: ['spring', 'summer'],
    popularityScore: 76,
    releaseYear: 2023,
    longevity: 67,
    sillage: 58,
    accords: ['cítrico', 'aromático', 'té']
  },
  {
    id: 'p026',
    brand: 'Noir Élégance',
    name: 'Oud Impérial',
    description: 'Oud de la más alta calidad con especias raras. Para verdaderos conocedores.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.9,
    votes: 734,
    notesTop: ['azafrán', 'cardamomo', 'bergamota'],
    notesMiddle: ['oud', 'rosa', 'jazmín'],
    notesBase: ['oud', 'ámbar', 'cuero'],
    gender: 'unisex',
    season: ['fall', 'winter'],
    popularityScore: 100,
    releaseYear: 2021,
    longevity: 98,
    sillage: 96,
    accords: ['oud', 'oriental', 'especiado']
  },
  {
    id: 'p027',
    brand: 'Fleur de Lune',
    name: 'Iris Poudré',
    description: 'Iris polvoriento con un toque de violeta. Elegancia vintage refinada.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.6,
    votes: 398,
    notesTop: ['bergamota', 'naranja', 'aldehídos'],
    notesMiddle: ['iris', 'violeta', 'mimosa'],
    notesBase: ['iris', 'vetiver', 'almizcle'],
    gender: 'female',
    season: ['spring', 'fall'],
    popularityScore: 86,
    releaseYear: 2022,
    longevity: 79,
    sillage: 72,
    accords: ['iris', 'polvoriento', 'floral']
  },
  {
    id: 'p028',
    brand: 'Épices Orientales',
    name: 'Bois de Santal',
    description: 'Sándalo cremoso y aterciopelado. Cálido, reconfortante y sensual.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.7,
    votes: 512,
    notesTop: ['bergamota', 'cardamomo', 'limón'],
    notesMiddle: ['sándalo', 'cedro', 'iris'],
    notesBase: ['sándalo', 'almizcle', 'vainilla'],
    gender: 'unisex',
    season: ['fall', 'winter', 'spring'],
    popularityScore: 91,
    releaseYear: 2021,
    longevity: 88,
    sillage: 82,
    accords: ['amaderado', 'cremoso', 'cálido']
  },
  {
    id: 'p029',
    brand: 'Maison Lumière',
    name: 'Neroli Lumineux',
    description: 'Neroli radiante con pétalos de azahar. Fresco, luminoso y optimista.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.4,
    votes: 289,
    notesTop: ['neroli', 'bergamota', 'petit grain'],
    notesMiddle: ['azahar', 'jazmín', 'ylang-ylang'],
    notesBase: ['almizcle blanco', 'ámbar', 'cedro'],
    gender: 'unisex',
    season: ['spring', 'summer'],
    popularityScore: 80,
    releaseYear: 2023,
    longevity: 73,
    sillage: 66,
    accords: ['floral', 'cítrico', 'fresco']
  },
  {
    id: 'p030',
    brand: 'Aqua Vitae',
    name: 'Vétiver Vert',
    description: 'Vetiver verde y vibrante con toques cítricos. Clásico reinventado.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.3,
    votes: 267,
    notesTop: ['limón', 'bergamota', 'mandarina verde'],
    notesMiddle: ['vetiver', 'geranio', 'salvia'],
    notesBase: ['vetiver', 'cedro', 'musgo de roble'],
    gender: 'male',
    season: ['spring', 'summer', 'fall'],
    popularityScore: 78,
    releaseYear: 2022,
    longevity: 81,
    sillage: 74,
    accords: ['verde', 'aromático', 'terroso']
  },
  {
    id: 'p031',
    brand: 'Rose Impériale',
    name: 'Rose de Mai',
    description: 'La rosa de Grasse en su máxima pureza. Un homenaje a la perfumería clásica.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.8,
    votes: 589,
    notesTop: ['bergamota', 'mandarina', 'grosella'],
    notesMiddle: ['rosa de mayo', 'rosa centifolia', 'geranio'],
    notesBase: ['almizcle', 'sándalo', 'ámbar'],
    gender: 'female',
    season: ['spring', 'summer', 'fall'],
    popularityScore: 93,
    releaseYear: 2021,
    longevity: 85,
    sillage: 79,
    accords: ['rosa', 'floral', 'clásico']
  },
  {
    id: 'p032',
    brand: 'Bois Sauvage',
    name: 'Tabac Absolu',
    description: 'Tabaco absoluto con ron y especias. Masculinidad atemporal.',
    image: 'assets/placeholder-bottle.svg',
    ratingAvg: 4.6,
    votes: 423,
    notesTop: ['ron', 'especias', 'cacao'],
    notesMiddle: ['tabaco', 'miel', 'davana'],
    notesBase: ['tabaco', 'cuero', 'vetiver'],
    gender: 'male',
    season: ['fall', 'winter'],
    popularityScore: 88,
    releaseYear: 2021,
    longevity: 94,
    sillage: 90,
    accords: ['tabaco', 'especiado', 'aromático']
  }
];

/**
 * Get all unique notes from all perfumes
 * @returns {Array<string>} Array of unique note names
 */
export function getAllNotes() {
  console.log('[data] getAllNotes: extracting all unique notes');
  const notesSet = new Set();

  perfumes.forEach(perfume => {
    [...perfume.notesTop, ...perfume.notesMiddle, ...perfume.notesBase].forEach(note => {
      notesSet.add(note);
    });
  });

  const notes = Array.from(notesSet).sort();
  console.log(`[data] getAllNotes: found ${notes.length} unique notes`);
  return notes;
}

/**
 * Get perfume by ID
 * @param {string} id - Perfume ID
 * @returns {Object|null} Perfume object or null if not found
 */
export function getPerfumeById(id) {
  console.log(`[data] getPerfumeById: searching for id="${id}"`);
  const perfume = perfumes.find(p => p.id === id);

  if (!perfume) {
    console.warn(`[data] getPerfumeById: perfume with id="${id}" not found`);
    return null;
  }

  console.log(`[data] getPerfumeById: found "${perfume.brand} - ${perfume.name}"`);
  return perfume;
}

/**
 * Get all unique brands
 * @returns {Array<string>} Array of unique brand names
 */
export function getAllBrands() {
  const brands = [...new Set(perfumes.map(p => p.brand))].sort();
  console.log(`[data] getAllBrands: found ${brands.length} brands`);
  return brands;
}

/**
 * Get suggested perfumes based on notes or brand similarity
 * @param {string} perfumeId - Current perfume ID
 * @param {number} limit - Maximum number of suggestions
 * @returns {Array<Object>} Array of suggested perfumes
 */
export function getSuggestions(perfumeId, limit = 6) {
  console.log(`[data] getSuggestions: finding suggestions for id="${perfumeId}", limit=${limit}`);

  const currentPerfume = getPerfumeById(perfumeId);
  if (!currentPerfume) {
    return [];
  }

  const allNotes = [...currentPerfume.notesTop, ...currentPerfume.notesMiddle, ...currentPerfume.notesBase];

  // Calculate similarity score for each perfume
  const scored = perfumes
    .filter(p => p.id !== perfumeId)
    .map(perfume => {
      let score = 0;
      const perfumeNotes = [...perfume.notesTop, ...perfume.notesMiddle, ...perfume.notesBase];

      // Score by shared notes
      perfumeNotes.forEach(note => {
        if (allNotes.includes(note)) score += 2;
      });

      // Bonus for same brand
      if (perfume.brand === currentPerfume.brand) score += 3;

      // Bonus for same gender or unisex
      if (perfume.gender === currentPerfume.gender || perfume.gender === 'unisex' || currentPerfume.gender === 'unisex') {
        score += 1;
      }

      return { perfume, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.perfume);

  console.log(`[data] getSuggestions: returning ${scored.length} suggestions`);
  return scored;
}

console.log(`[data] Loaded ${perfumes.length} perfumes`);
