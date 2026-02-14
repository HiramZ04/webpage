const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const btnArea = document.getElementById("btnArea");
const hint = document.getElementById("hint");
const result = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");

let dodgeCount = 0;

/**
 * Mueve el boton NO a una posicion aleatoria dentro del contenedor.
 * Usamos position absolute solo cuando empieza el "escape".
 */
function moveNoButton() {
  const areaRect = btnArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Margen para que no se pegue a los bordes
  const pad = 10;

  const maxX = areaRect.width - btnRect.width - pad * 2;
  const maxY = areaRect.height - btnRect.height - pad * 2;

  // Por si algo raro pasa en pantallas muy chicas
  const x = pad + Math.max(0, Math.random() * maxX);
  const y = pad + Math.max(0, Math.random() * maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function setHint(msg) {
  hint.textContent = msg || "";
}

function showResult() {
  result.hidden = false;
  setHint("");
}

function resetAll() {
  result.hidden = true;
  dodgeCount = 0;

  // Regresa al layout normal (flex)
  noBtn.style.position = "relative";
  noBtn.style.left = "";
  noBtn.style.top = "";

  setHint("");
}

// Hace que el NO se mueva al intentar pasarlo/picarlo
noBtn.addEventListener("mouseenter", () => {
  dodgeCount++;
  moveNoButton();

  if (dodgeCount === 1) setHint("Uy, se movio...");
  else if (dodgeCount === 2) setHint("Nop, ese boton no coopera.");
  else if (dodgeCount === 3) setHint("Ok ya, mejor di que si.");
  else setHint("Imposible decir que no.");
});

// En mobile no hay hover; usa touchstart/pointerdown
noBtn.addEventListener("pointerdown", (e) => {
  // Evita que lo "alcancen" por accidente
  e.preventDefault();
  dodgeCount++;
  moveNoButton();

  if (dodgeCount < 3) setHint("Casi... pero no.");
  else setHint("Ya sabes cual es la respuesta.");
});

// Si dice que SI, mostramos mensajito
yesBtn.addEventListener("click", () => {
  showResult();
});

// Reset
resetBtn.addEventListener("click", () => {
  resetAll();
});

// Tip: al cargar, un hint suave
setHint("Picale a Si.");