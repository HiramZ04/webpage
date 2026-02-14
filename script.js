// Buttons + result
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const btnArea = document.getElementById("btnArea");
const hint = document.getElementById("hint");
const result = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");

// Hearts layer
const floatLayer = document.getElementById("floatLayer");

// Envelope
const openLetterBtn = document.getElementById("openLetterBtn");
const closeLetterBtn = document.getElementById("closeLetterBtn");
const letter = document.getElementById("letter");

// Slider
const slidesWrap = document.getElementById("slides");
const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsWrap = document.getElementById("dots");

// Music
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

let dodgeCount = 0;
let idx = 0;

// ---------------------- NO button dodge ----------------------
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

// ---------------------- Confetti ----------------------
function confettiBurst(count = 110){
  for(let i=0;i<count;i++){
    const piece = document.createElement("div");
    piece.className = "confetti";

    const hue = Math.floor(Math.random() * 40) + 320; // pink range
    piece.style.background = `hsl(${hue} 90% 70%)`;

    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDuration = `${900 + Math.random()*900}ms`;
    piece.style.width = `${8 + Math.random()*10}px`;
    piece.style.height = `${10 + Math.random()*14}px`;

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2000);
  }
}

// ---------------------- Floating hearts ----------------------
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

// ---------------------- Result ----------------------
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

// ---------------------- Envelope letter ----------------------
function openLetter(){
  openLetterBtn.classList.add("open");
  openLetterBtn.setAttribute("aria-expanded", "true");
  letter.hidden = false;
  // cute micro-confetti
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

// ---------------------- Slider ----------------------
function buildDots(){
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === idx ? " active" : "");
    dotsWrap.appendChild(d);
  });
}

function showSlide(i){
  idx = (i + slides.length) % slides.length;
  slides.forEach((s, k) => s.classList.toggle("active", k === idx));
  buildDots();
}

prevBtn.addEventListener("click", () => showSlide(idx - 1));
nextBtn.addEventListener("click", () => showSlide(idx + 1));

// Tap image to go next
slidesWrap.addEventListener("click", () => showSlide(idx + 1));

// Keyboard arrows (optional)
document.addEventListener("keydown", (e) => {
  if(e.key === "ArrowLeft") showSlide(idx - 1);
  if(e.key === "ArrowRight") showSlide(idx + 1);
});

buildDots();
showSlide(0);

// ---------------------- Music (no autoplay) ----------------------
let isPlaying = false;

async function toggleMusic(){
  if(!bgMusic) return;

  try{
    if(!isPlaying){
      await bgMusic.play();
      isPlaying = true;
      musicIcon.textContent = "❚❚";
      musicText.textContent = "Pause";
      confettiBurst(30);
    }else{
      bgMusic.pause();
      isPlaying = false;
      musicIcon.textContent = "►";
      musicText.textContent = "Play";
    }
  }catch(err){
    // If browser blocks it for any reason, show hint
    setHint("Dale click otra vez para activar la musica.");
  }
}

musicBtn.addEventListener("click", toggleMusic);

// When music ends
bgMusic.addEventListener("ended", () => {
  isPlaying = false;
  musicIcon.textContent = "►";
  musicText.textContent = "Play";
});

// Initial hint
setHint("Picale a Si.");