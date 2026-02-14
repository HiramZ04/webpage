const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const btnArea = document.getElementById("btnArea");
const hint = document.getElementById("hint");
const result = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");

const floatLayer = document.getElementById("floatLayer");

const openLetterBtn = document.getElementById("openLetterBtn");
const closeLetterBtn = document.getElementById("closeLetterBtn");
const letter = document.getElementById("letter");

let dodgeCount = 0;

function setHint(msg){ hint.textContent = msg || ""; }

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

noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  dodgeCount++;
  moveNoButton();
  if (dodgeCount < 3) setHint("Casi... pero no.");
  else setHint("Ya sabes cual es la respuesta.");
}, { passive: false });

function confettiBurst(count = 110){
  for(let i=0;i<count;i++){
    const piece = document.createElement("div");
    piece.className = "confetti";
    const hue = Math.floor(Math.random() * 40) + 320;
    piece.style.background = `hsl(${hue} 90% 70%)`;
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDuration = `${900 + Math.random()*900}ms`;
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
  heart.style.left = `${Math.random() * 100}vw`;
  const dur = 4200 + Math.random()*2600;
  heart.style.animationDuration = `${dur}ms`;
  const size = 16 + Math.random()*14;
  heart.style.fontSize = `${size}px`;
  floatLayer.appendChild(heart);
  setTimeout(() => heart.remove(), dur + 200);
}
setInterval(spawnFloatingHeart, 380);

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

yesBtn.addEventListener("click", () => {
  confettiBurst(140);
  showResult();
});
resetBtn.addEventListener("click", resetAll);

function openLetter(){
  openLetterBtn.classList.add("open");
  openLetterBtn.setAttribute("aria-expanded", "true");
  letter.hidden = false;
  confettiBurst(50);
}
function closeLetter(){
  openLetterBtn.classList.remove("open");
  openLetterBtn.setAttribute("aria-expanded", "false");
  letter.hidden = true;
}

openLetterBtn.addEventListener("click", () => {
  if(letter.hidden) openLetter();
  else closeLetter();
});
closeLetterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeLetter();
});

setHint("Picale a Si.");