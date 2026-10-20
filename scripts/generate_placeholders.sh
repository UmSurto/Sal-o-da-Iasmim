#!/usr/bin/env bash
set -e

mkdir -p images

ITEMS=(
  "foto1:Maquiagem Social:Pele iluminada e acabamento natural:#F8EBEB:#F2D6D8"
  "foto2:Penteado Clássico:Coques e estilos sofisticados:#FAF2EE:#EAD8CF"
  "foto3:Tranças Nagô:Estilos e desenhos precisos:#F5EFEF:#E2D1D4"
  "foto4:Make & Penteado:No mesmo lugar com praticidade:#FAF4F0:#E8D8CC"
  "foto5:Maquiagem Glam:Olhos marcantes para festas:#F8EBEB:#EAD1D6"
  "foto6:Penteado Semipreso:Ondas fluidas e fixação leve:#FAF2EE:#E6D5CC"
  "foto7:Trança Boxeadora:Firmeza, estilo e durabilidade:#F6EDEC:#DFCDD2"
  "foto8:Produção Noivas & Eventos:Atendimento no espaço ou em domicílio:#FAF4EE:#EAD9CF"
)

for item in "${ITEMS[@]}"; do
  IFS=':' read -r id title desc bg1 bg2 <<< "$item"
  HTML="<!DOCTYPE html><html><body style='margin:0;width:600px;height:600px;background:linear-gradient(145deg, ${bg1}, ${bg2});display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;color:%23321F24;text-align:center;padding:40px;box-sizing:border-box;'><div style='width:90px;height:90px;border-radius:50%;background:rgba(255,255,255,0.7);display:flex;align-items:center;justify-content:center;margin-bottom:24px;box-shadow:0 8px 24px rgba(60,30,40,0.06);font-size:36px;'>💄</div><h2 style='font-family:Georgia,serif;font-size:30px;font-weight:600;margin:0 0 10px 0;letter-spacing:-0.5px;color:%232C1A20;'>${title}</h2><p style='font-size:16px;color:%236A4D54;margin:0 0 24px 0;max-width:400px;line-height:1.5;'>${desc}</p><div style='display:inline-flex;gap:8px;align-items:center;background:rgba(255,255,255,0.85);padding:8px 18px;border-radius:999px;border:1px solid rgba(200,160,170,0.3);box-shadow:0 2px 8px rgba(0,0,0,0.04);'><span style='display:inline-block;width:8px;height:8px;border-radius:50%;background:%23C07080;'></span><span style='font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:%234A3037;'>[INACABADO - Substituir por foto real da galeria]</span></div></body></html>"
  
  playwright-cli open "data:text/html,${HTML}"
  playwright-cli resize 600 600
  playwright-cli screenshot --filename="images/${id}.jpg"
  playwright-cli close
done

echo "Generated all 8 placeholder images in images/"
