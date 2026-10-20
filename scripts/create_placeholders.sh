#!/usr/bin/env bash
set -e

mkdir -p images

ITEMS=(
  "foto1:Maquiagem Social:Pele iluminada, acabamento natural e durabilidade.:<path d='M10 2a2 2 0 0 1 2 2v4H8V4a2 2 0 0 1 2-2zM7 9h6v3H7V9zm-1 4h8v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-9z' fill='%23a84b64'/>"
  "foto2:Penteado Clássico:Coques sofisticados e produções elegantes.:<path d='M12 2a5 5 0 0 0-5 5c0 2 1.5 3.5 3 4.5V14h4v-2.5c1.5-1 3-2.5 3-4.5a5 5 0 0 0-5-5zm-2 14h4v6h-4v-6z' fill='%23a84b64'/>"
  "foto3:Tranças Nagô:Desenhos precisos, simetria e técnica capilar.:<path d='M7 3c0 3 4 5 4 8s-4 5-4 8h2c0-2 4-4 4-8s-4-6-4-8H7zm8 0c0 3-4 5-4 8s4 5 4 8h-2c0-2-4-4-4-8s4-6 4-8h2z' fill='%23a84b64'/>"
  "foto4:Make & Penteado:No mesmo lugar com total praticidade.:<path d='M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z' fill='%23a84b64'/>"
  "foto5:Maquiagem Glam:Olhos marcantes e acabamento para festas.:<path d='M12 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z' fill='%23a84b64'/>"
  "foto6:Penteado Semipreso:Ondas fluidas, leveza e durabilidade.:<path d='M12 3c-4.4 0-8 3.6-8 8 0 3 1.6 5.6 4 7v3h8v-3c2.4-1.4 4-4 4-7 0-4.4-3.6-8-8-8z' fill='%23a84b64'/>"
  "foto7:Trança Boxeadora:Firmeza, estilo urbano e durabilidade.:<path d='M8 4c0 2 2 3 2 5s-2 3-2 5 2 3 2 5H6c0-1-2-2-2-4s2-3 2-5-2-3-2-5 2-2 2-3h2zm8 0c0 2-2 3-2 5s2 3 2 5-2 3-2 5h2c0-1 2-2 2-4s-2-3-2-5 2-3 2-5-2-2-2-3h-2z' fill='%23a84b64'/>"
  "foto8:Noivas & Eventos:Atendimento no espaço ou em domicílio.:<path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' fill='%23a84b64'/>"
)

for item in "${ITEMS[@]}"; do
  IFS=':' read -r id title desc svg_path <<< "$item"
  HTML="<!DOCTYPE html><html><head><meta charset='utf-8'></head><body style='margin:0;width:600px;height:600px;background:rgb(250,244,244);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;color:rgb(43,29,33);text-align:center;padding:40px;box-sizing:border-box;'><div style='width:96px;height:96px;border-radius:50%;background:white;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(0,0,0,0.06);margin-bottom:20px;'><svg width='44' height='44' viewBox='0 0 24 24'>${svg_path}</svg></div><div style='font-size:12px;letter-spacing:2px;font-weight:700;color:rgb(168,75,100);text-transform:uppercase;margin-bottom:8px;'>Iasmim Raquel Beauty</div><h2 style='font-family:Georgia,serif;font-size:32px;font-weight:600;margin:0 0 10px 0;letter-spacing:-0.5px;'>${title}</h2><p style='color:rgb(105,82,87);font-size:15px;max-width:420px;line-height:1.5;margin:0 0 24px 0;'>${desc}</p><div style='background:white;border:1px solid rgb(229,195,200);padding:8px 18px;border-radius:99px;font-size:12px;font-weight:700;color:rgb(168,75,100);box-shadow:0 2px 8px rgba(0,0,0,0.04);'>[FOTO LOCAL - 600x600]</div></body></html>"
  
  playwright-cli open --browser=chromium "data:text/html;charset=utf-8,${HTML}"
  playwright-cli resize 600 600
  playwright-cli screenshot --filename="images/${id}.jpg"
  playwright-cli close
done

echo "Done generating all 8 placeholders"
