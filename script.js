const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const btnArea = document.getElementById("btnArea");
const hint = document.getElementById("hint");
const result = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");
const floatLayer = document.getElementById("floatLayer");

let dodgeCount = 0;

function moveNoButton() {
  const areaRect = btnArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const pad = 10;

  const maxX = areaRect.width - btnRect.width - pad * 2;
  const maxY = areaRect.height - btnRect.height - pad * 2;

  const x = pad + Math.max(0, Math.random() * maxX);
  const y = pad + Math.max(0, Math.random() * maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function setHint(msg){ hint.textContent = msg || ""; }

function showResult(){
  result.hidden = false;
  setHint("");
}

function resetAll(){
  result.hidden = true;
  dodgeCount = 0;
  noBtn.style.position = "relative";
  noBtn.style.left = "";
  noBtn.style.top = "";
  setHint("Picale a Si.");
}

function confettiBurst(count = 90){
  for(let i=0;i<count;i++){
    const piece = document.createElement("div");
    piece.className = "confetti";

    // Random pastel colors (inline to avoid defining palette in CSS)
    const hue = Math.floor(Math.random() * 40) + 320; // pink-ish range
    piece.style.background = `hsl(${hue} 90% 70%)`;

    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.transform = `translateY(-20px) rotate(${Math.random()*360}deg)`;
    piece.style.animationDuration = `${900 + Math.random()*900}ms`;

    // Small variation
    piece.style.width = `${8 + Math.random()*10}px`;
    piece.style.height = `${10 + Math.random()*14}px`;

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2000);
  }
}

function spawnFloatingHeart(){
  if(!floatLayer) return;

  const heart = document.createElement("div");
  heart.className = "float-heart";

  const hearts = ["❤","💗","💖","💘","💕","✨","🌸"];
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

  const left = Math.random() * 100;
  heart.style.left = `${left}vw`;

  const dur = 4200 + Math.random()*2600; // 4.2s - 6.8s
  heart.style.animationDuration = `${dur}ms`;

  const size = 16 + Math.random()*14;
  heart.style.fontSize = `${size}px`;

  floatLayer.appendChild(heart);
  setTimeout(() => heart.remove(), dur + 200);
}

// soft floating hearts always
setInterval(spawnFloatingHeart, 380);

noBtn.addEventListener("mouseenter", () => {
  dodgeCount++;
  moveNoButton();

  if (dodgeCount === 1) setHint("Uy, se movio...");
  else if (dodgeCount === 2) setHint("Nop, ese boton no coopera.");
  else if (dodgeCount === 3) setHint("Ok ya, mejor di que si.");
  else setHint("Imposible decir que no.");
});

noBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  dodgeCount++;
  moveNoButton();

  if (dodgeCount < 3) setHint("Casi... pero no.");
  else setHint("Ya sabes cual es la respuesta.");
});

yesBtn.addEventListener("click", () => {
  confettiBurst(120);
  showResult();
});

resetBtn.addEventListener("click", resetAll);

setHint("Picale a Si.");