import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const slides = [
  ['le.go', 'The citation is the event; the medium of consumption is the projection.'],
  ['The historian’s dilemma', 'MLA says cite the platform copy you consulted. The ad-free mirror is the one you read. Both styles confuse the window with the room.'],
  ['From 025.431 to magic strings', 'Dewey worked because the library building answered “in what universe?” for free. On the open web, the string became ritual punctuation.'],
  ['The grant', 'At 3:02–3:22 of Open Arms, SikMadMan says: use the music how you want, sample and remix it, credit if you can. No citation style has a slot for it.'],
  ['The four losses', 'Classic styles drop: time inside the work, reuse terms, epistemic status, derivative lineage.'],
  ['null', 'Absence is no plane — never a value you can put in the graph.'],
  ['not null', '“null exists” is itself a fact. Unknown ≠ absent.'],
  ['0 > 1', 'A zeroed field is a claim that disconnects the graph (ErrDisconnected). A silent zero outranks a spoken one.'],
  ['42 = 0', '42 is the shared origin — the point every universe agrees on as zero — so you can rotate into 0 + 42i without drifting off the plane.'],
  ['Snap it together', 'le.go/projector casts shadows back to APA, MLA, Chicago, BibTeX. le.go/bare is the historian’s door. So long, and thanks for all the footnotes.'],
]

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>le.go — deck</title>
<style>
:root{--red:#c8102e;--yellow:#f4b41a;--blue:#0055a5;--green:#00a651;--ink:#1a1a1a;--cream:#f7f3e8}
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,sans-serif;background:var(--cream);color:var(--ink)}
.slide{min-height:100vh;display:none;flex-direction:column;justify-content:center;align-items:flex-start;padding:8vw;border-bottom:6px solid var(--red)}
.slide.active{display:flex}
.kicker{font-size:.8rem;font-weight:900;letter-spacing:.2em;text-transform:uppercase;color:var(--red)}
h1{font-size:clamp(2rem,6vw,4rem);margin:.3em 0;line-height:1.05}
p{font-size:clamp(1.1rem,3vw,1.6rem);max-width:36ch;line-height:1.4}
nav{position:fixed;right:1rem;bottom:1rem;display:flex;gap:.5rem}
button{font-weight:900;border:2px solid var(--ink);background:var(--yellow);color:var(--ink);border-radius:10px;padding:.6rem 1rem;cursor:pointer}
.bar{position:fixed;left:0;top:0;height:4px;background:var(--blue);width:0;transition:width .2s}
</style>
</head>
<body>
<div class="bar" id="bar"></div>
${slides.map(([t, b], i) => `<section class="slide${i === 0 ? ' active' : ''}" id="s${i}"><span class="kicker">${String(i + 1).padStart(2, '0')} / ${slides.length}</span><h1>${t}</h1><p>${b}</p></section>`).join('\n')}
<nav><button id="prev">←</button><button id="next">→</button></nav>
<script>
const slides=document.querySelectorAll('.slide');let i=0;
function show(n){i=(n+slides.length)%slides.length;slides.forEach((s,k)=>s.classList.toggle('active',k===i));document.getElementById('bar').style.width=((i+1)/slides.length*100)+'%';window.scrollTo({top:0});}
document.getElementById('prev').onclick=()=>show(i-1);
document.getElementById('next').onclick=()=>show(i+1);
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1);});
</script>
</body>
</html>`

mkdirSync(dist, { recursive: true })
writeFileSync(join(dist, 'deck.html'), html)
console.log('deck: dist/deck.html written')
