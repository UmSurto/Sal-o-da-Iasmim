const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const items = [
  {
    id: 'foto1',
    title: 'Maquiagem Social',
    desc: 'Pele iluminada, acabamento natural e durabilidade para ocasiões especiais.',
    icon: '💄',
    bg1: '#FAF0F2',
    bg2: '#EED6DC',
    accent: '#B85972'
  },
  {
    id: 'foto2',
    title: 'Penteado Clássico',
    desc: 'Coques alinhados, penteados sofisticados e fixação confortável.',
    icon: '✨',
    bg1: '#FAF4F0',
    bg2: '#E8D5CA',
    accent: '#A86B51'
  },
  {
    id: 'foto3',
    title: 'Tranças Nagô',
    desc: 'Desenhos precisos, acabamento impecável e respeito à saúde capilar.',
    icon: '🌿',
    bg1: '#F7F1F1',
    bg2: '#E4CFD4',
    accent: '#9A4C62'
  },
  {
    id: 'foto4',
    title: 'Make & Penteado',
    desc: 'Produção completa no mesmo lugar com comodidade e agilidade.',
    icon: '👑',
    bg1: '#FBF3F4',
    bg2: '#ECD0D8',
    accent: '#A84B64'
  },
  {
    id: 'foto5',
    title: 'Maquiagem Glam',
    desc: 'Olhos marcantes, técnica de esfumado e brilho na medida certa.',
    icon: '💎',
    bg1: '#FAF0F2',
    bg2: '#E7CED5',
    accent: '#8D3A50'
  },
  {
    id: 'foto6',
    title: 'Penteado Semipreso',
    desc: 'Ondas suaves, leveza no movimento e delicadeza para festas.',
    icon: '🌸',
    bg1: '#FAF4EF',
    bg2: '#E9D6CB',
    accent: '#9E6750'
  },
  {
    id: 'foto7',
    title: 'Trança Boxeadora',
    desc: 'Firmeza, estilo contemporâneo e durabilidade garantida.',
    icon: '🎀',
    bg1: '#F6EFF0',
    bg2: '#DEC9CF',
    accent: '#8F4558'
  },
  {
    id: 'foto8',
    title: 'Noivas & Eventos',
    desc: 'Atendimento exclusivo no espaço ou no seu domicílio com todo carinho.',
    icon: '👰',
    bg1: '#FAF3EE',
    bg2: '#E8D4C8',
    accent: '#A06B52'
  }
];

fs.mkdirSync('images', { recursive: true });

for (const item of items) {
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 600px;
      height: 600px;
      background: linear-gradient(135deg, ${item.bg1} 0%, ${item.bg2} 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #2D1A20;
      text-align: center;
      padding: 40px;
      position: relative;
      border: 8px solid rgba(255, 255, 255, 0.6);
    }
    .badge-icon {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 42px;
      margin-bottom: 24px;
      box-shadow: 0 10px 25px rgba(60, 30, 40, 0.1);
    }
    .brand-sub {
      font-size: 13px;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-weight: 700;
      color: ${item.accent};
      margin-bottom: 8px;
    }
    h2 {
      font-family: Georgia, serif;
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 12px;
      color: #2D1A20;
    }
    p {
      font-size: 16px;
      color: #61464D;
      line-height: 1.5;
      max-width: 440px;
      margin-bottom: 28px;
    }
    .placeholder-pill {
      background: #ffffff;
      border: 1px solid rgba(160, 80, 100, 0.3);
      padding: 8px 18px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      color: ${item.accent};
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${item.accent};
    }
  </style>
</head>
<body>
  <div class="badge-icon">${item.icon}</div>
  <div class="brand-sub">Iasmim Raquel Beauty</div>
  <h2>${item.title}</h2>
  <p>${item.desc}</p>
  <div class="placeholder-pill">
    <span class="dot"></span>
    <span>[FOTO LOCAL - Substituir por imagem real]</span>
  </div>
</body>
</html>`;

  const tmpPath = path.resolve(`.playwright-cli/tmp-${item.id}.html`);
  fs.writeFileSync(tmpPath, htmlContent, 'utf-8');

  execSync(`playwright-cli open "file://${tmpPath}" && playwright-cli resize 600 600 && playwright-cli screenshot --filename="images/${item.id}.jpg" && playwright-cli close`, {
    stdio: 'ignore'
  });

  try { fs.unlinkSync(tmpPath); } catch (e) {}
}

console.log('Successfully generated all 8 JPEG images.');
