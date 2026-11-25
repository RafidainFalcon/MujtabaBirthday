// Interactive page-to-page birthday experience.
const $ = (s, root=document) => root.querySelector(s);

// Envelope opening reveals the letter and the next page link.
const envelope = $("#openEnvelope");
if (envelope) {
  envelope.addEventListener("click", () => {
    envelope.classList.add("open");
    $("#envelopeHint").textContent = "رسالة من تقى، خصيصاً إلك";
    $("#letterReveal").classList.add("show");
  });
}

// Three wishes must all be discovered before continuing.
const wishCards = [...document.querySelectorAll(".wish-card")];
if (wishCards.length) {
  const discovered = new Set();
  wishCards.forEach((card, i) => card.addEventListener("click", () => {
    card.classList.add("selected");
    discovered.add(i);
    $("#wishOutput").textContent = card.dataset.wish;
    if (discovered.size === wishCards.length) {
      $("#wishesNext").classList.remove("disabled-link");
      $("#wishOutput").textContent += " — خلصت الأمنيات الثلاث، نروح للكيكة!";
    }
  }));
}

// Birthday candle interaction.
const blow = $("#blowCandles");
if (blow) {
  blow.addEventListener("click", () => {
    document.querySelectorAll(".flame").forEach(f => f.classList.add("off"));
    $("#cakeStatus").textContent = "يا رب كل أمنياتك تصير حقيقة يا مجتبى!";
    blow.textContent = "انطفأت الشموع، عيد ميلاد سعيد!";
    $("#cakeNext").classList.remove("disabled-link");
    burstConfetti();
  });
}

// Final gift.
const gift = $("#openGift");
if (gift) {
  gift.addEventListener("click", () => {
    gift.classList.add("open");
    $("#giftHint").textContent = "انفتحت هديتك!";
    $("#finalMessage").classList.add("show");
    burstConfetti();
  });
}

// Lightweight confetti burst, no dependencies.
function burstConfetti() {
  const canvas = document.createElement("canvas");
  canvas.className = "confetti-layer";
  Object.assign(canvas.style, {position:"fixed",inset:"0",width:"100%",height:"100%",pointerEvents:"none",zIndex:"20"});
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth*dpr; canvas.height = innerHeight*dpr; ctx.scale(dpr,dpr);
  const palette = ["#f8d68a","#d78aff","#ff9ed6","#a9f0e3","#ffffff"];
  const bits = Array.from({length:130},()=>({x:innerWidth*.5+(Math.random()-.5)*140,y:innerHeight*.48,vx:(Math.random()-.5)*8,vy:-Math.random()*8-2,s:3+Math.random()*5,r:Math.random()*6,c:palette[Math.floor(Math.random()*palette.length)],life:100+Math.random()*40}));
  function frame(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for(const b of bits){if(b.life<=0)continue;b.x+=b.vx;b.y+=b.vy;b.vy+=.12;b.r+=.1;b.life--;ctx.save();ctx.translate(b.x,b.y);ctx.rotate(b.r);ctx.fillStyle=b.c;ctx.fillRect(-b.s/2,-b.s/2,b.s,b.s*1.5);ctx.restore();}
    if(bits.some(b=>b.life>0))requestAnimationFrame(frame);else canvas.remove();
  }
  requestAnimationFrame(frame);
}
