/**
 * Dados oficiais de Iasmim Raquel Beauty
 * REGRA ESTRITA: Use somente as informações fornecidas. Sem invenções.
 */

export interface BusinessInfo {
  name: string;
  segment: string[];
  city: string;
  state: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
    formatted: string;
  };
  phone: string;
  phoneRaw: string;
  whatsappUrl: string;
  instagramUrl: string;
  openingHours: string;
  homeService: boolean;
  eventsService: boolean;
  sinceYear: number;
  positioning: string[];
  googleRating: {
    score: number;
    label: string;
  };
  services: {
    id: string;
    title: string;
    description: string;
    price: string | null;
  }[];
  testimonials: {
    quote: string;
    author: string;
    permissionConfirmed: boolean;
  }[];
}

export const BUSINESS_DATA: BusinessInfo = {
  name: 'Iasmim Raquel Beauty',
  segment: ['maquiagem', 'penteado', 'trança'],
  city: 'Duque de Caxias',
  state: 'RJ',
  address: {
    street: 'Rua Tenente José Wilson da Silva, 57',
    neighborhood: 'Centro',
    city: 'Duque de Caxias',
    state: 'RJ',
    cep: '25011-380',
    formatted: 'Rua Tenente José Wilson da Silva, 57, Centro, Duque de Caxias, RJ, CEP 25011-380',
  },
  phone: '(21) 96673-2849',
  phoneRaw: '5521966732849',
  whatsappUrl: 'https://wa.me/5521966732849',
  instagramUrl: 'https://www.instagram.com/iasmimraquelbeauty/',
  openingHours: 'Seg a Sex das 9h as 17h',
  homeService: true,
  eventsService: true,
  sinceYear: 2021,
  positioning: [
    'Espaço acolhedor',
    'Recebe a comunidade LGBTQ+',
    'Empreendimento feminino',
    'Atende clientes recorrentes desde 2021',
  ],
  googleRating: {
    score: 5.0,
    label: 'Cinco estrelas de avaliação no Google',
  },
  services: [
    {
      id: 'maquiagem',
      title: 'Maquiagem',
      description: 'Atendimento com acolhimento, cuidado e paciência para realçar sua beleza única.',
      price: null, // [INACABADO - Preço não informado, sob consulta]
    },
    {
      id: 'penteado',
      title: 'Penteado',
      description: 'Produções elegantes para o seu dia a dia, ensaios ou momentos especiais.',
      price: null, // [INACABADO - Preço não informado, sob consulta]
    },
    {
      id: 'tranca',
      title: 'Trança',
      description: 'Tranças nagô e estilos com acabamento cuidadoso, firmeza e durabilidade.',
      price: null, // [INACABADO - Preço não informado, sob consulta]
    },
    {
      id: 'combo',
      title: 'Maquiagem + Penteado no mesmo lugar',
      description: 'Praticidade de fazer maquiagem e penteado juntos. Atende no espaço, em domicílio, noivas e eventos.',
      price: 'Valor sob consulta',
    },
  ],
  testimonials: [
    {
      quote: 'Espaço aconchegante, profissional educada e paciente.',
      author: 'Sarah B.',
      permissionConfirmed: false, // [CONFIRMAR autorização das clientes]
    },
    {
      quote: 'Simplesmente perfeito. Ótima profissional.',
      author: 'Celina P.',
      permissionConfirmed: false, // [CONFIRMAR autorização das clientes]
    },
    {
      quote: 'Excelente profissional sempre arrasando. Qualquer oportunidade de ir fazer um make com ela eu vou.',
      author: 'Letícia L.',
      permissionConfirmed: false, // [CONFIRMAR autorização das clientes]
    },
  ],
};

export function generateGoogleMapsSearchUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function generateLocalBusinessSchema(data: BusinessInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    'name': data.name,
    'description': `Maquiagem, penteado e trança em Duque de Caxias, RJ. Atendimento acolhedor, noivas e eventos.`,
    'telephone': `+${data.phoneRaw}`,
    'url': data.instagramUrl,
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': data.address.street,
      'addressLocality': data.address.city,
      'addressRegion': data.address.state,
      'postalCode': data.address.cep,
      'addressCountry': 'BR',
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '17:00',
      },
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': data.googleRating.score.toFixed(1),
      'bestRating': '5.0',
    },
    'sameAs': [data.instagramUrl],
  };
}
