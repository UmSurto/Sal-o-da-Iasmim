import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BUSINESS_DATA,
  generateGoogleMapsSearchUrl,
  generateLocalBusinessSchema,
} from './businessData.ts';

test('business data matches provided facts exactly', () => {
  assert.equal(BUSINESS_DATA.name, 'Iasmim Raquel Beauty');
  assert.deepEqual(BUSINESS_DATA.segment, ['maquiagem', 'penteado', 'trança']);
  assert.equal(BUSINESS_DATA.address.city, 'Duque de Caxias');
  assert.equal(BUSINESS_DATA.address.state, 'RJ');
  assert.equal(BUSINESS_DATA.address.cep, '25011-380');
  assert.equal(BUSINESS_DATA.phoneRaw, '5521966732849');
  assert.equal(BUSINESS_DATA.whatsappUrl, 'https://wa.me/5521966732849');
  assert.equal(BUSINESS_DATA.sinceYear, 2021);
  assert.equal(BUSINESS_DATA.googleRating.score, 5.0);
  assert.equal(BUSINESS_DATA.googleRating.label, 'Cinco estrelas de avaliação no Google');
});

test('testimonials contain exact 3 client quotes with initials', () => {
  assert.equal(BUSINESS_DATA.testimonials.length, 3);
  assert.equal(BUSINESS_DATA.testimonials[0].author, 'Sarah B.');
  assert.equal(
    BUSINESS_DATA.testimonials[0].quote,
    'Espaço aconchegante, profissional educada e paciente.'
  );
  assert.equal(BUSINESS_DATA.testimonials[1].author, 'Celina P.');
  assert.equal(
    BUSINESS_DATA.testimonials[1].quote,
    'Simplesmente perfeito. Ótima profissional.'
  );
  assert.equal(BUSINESS_DATA.testimonials[2].author, 'Letícia L.');
  assert.equal(
    BUSINESS_DATA.testimonials[2].quote,
    'Excelente profissional sempre arrasando. Qualquer oportunidade de ir fazer um make com ela eu vou.'
  );
});

test('Google Maps search URL is properly URL encoded', () => {
  const url = generateGoogleMapsSearchUrl(BUSINESS_DATA.address.formatted);
  assert.ok(url.startsWith('https://www.google.com/maps/search/?api=1&query='));
  assert.ok(url.includes('Duque%20de%20Caxias'));
});

test('LocalBusiness schema matches Schema.org specification', () => {
  const schema = generateLocalBusinessSchema(BUSINESS_DATA);
  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@type'], 'BeautySalon');
  assert.equal(schema.name, 'Iasmim Raquel Beauty');
  assert.equal(schema.telephone, '+5521966732849');
  assert.equal(schema.aggregateRating.ratingValue, '5.0');
  assert.equal(schema.aggregateRating.bestRating, '5.0');
  assert.equal(schema.address.postalCode, '25011-380');
});
