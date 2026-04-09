let method = 'caesar';
let shift = 3;
let asciiMode = false;

function getCharset() { //1
  if (asciiMode) {
    let s = '';
    for (let i = 32; i <= 126; i++) s += String.fromCharCode(i);
    return s;
  }
  return document.getElementById('charset').value;
}

function setMethod(m) { //2
  method = m;

  document.getElementById('btnCaesar')
    .classList.toggle('active', m === 'caesar');

  document.getElementById('btnAtbash')
    .classList.toggle('active', m === 'atbash');

  document.getElementById('shiftGroup').style.display =
    m === 'caesar' ? '' : 'none';

  const badge = document.getElementById('modeBadge');

  badge.className = 'method-badge ' + m;

  document.getElementById('badgeText').textContent =
    'Módulo: ' + (m === 'caesar' ? 'César' : 'Atbash');

  updateInfo();
  updateMapping();
}

function changeShift(d) { //3
  const cs = getCharset();
  const max = cs.length - 1;

  shift = ((shift + d - 1 + max) % max) + 1;

  document.getElementById('shiftDisplay').textContent = shift;
  document.getElementById('shiftRange').value = shift;

  updateInfo();
  updateMapping();
}

function syncShift(v) { //4
  shift = parseInt(v);

  document.getElementById('shiftDisplay').textContent = shift;

  updateInfo();
  updateMapping();
}

function updateInfo() { //6
  const cs = getCharset();
  const n = cs.length;

  document.getElementById('shiftRange').max =
    Math.max(n - 1, 1);
}

function caesarChar(c, dir) { //9
  const cs = getCharset();
  const n = cs.length;

  const idx = cs.indexOf(c);

  if (idx === -1) return c;

  const newIdx = ((idx + dir * shift) % n + n) % n;

  return cs[newIdx];
}

function atbashChar(c) { //10
  const cs = getCharset();
  const n = cs.length;

  const idx = cs.indexOf(c);

  if (idx === -1) return c;

  return cs[n - 1 - idx];
}

function process(op) { //11
  const input = document.getElementById('inputText').value;

  if (!input.trim()) {
    showNotif('Por favor ingresa texto');
    return;
  }

  if (op === 'decrypt' && method === 'caesar') {
    shift = detectShift(input);
    document.getElementById('shiftDisplay').textContent = shift;
  }

  let result = '';
  const dir = op === 'encrypt' ? 1 : -1;

  for (const c of input) {
    if (method === 'caesar') {
      result += caesarChar(c, dir);
    } else {
      result += atbashChar(c);
    }
  }

  document.getElementById('outputText').textContent = result;
}

function clearAll() { //12
  document.getElementById('inputText').value = '';
  document.getElementById('outputText').textContent = '';
}

function copyResult() { //13
  const text =
    document.getElementById('outputText').textContent;

  if (!text) return;

  navigator.clipboard.writeText(text);
}

function showNotif(msg) { //14
  const n = document.getElementById('notif');

  n.textContent = msg;
  n.classList.add('show');

  setTimeout(() =>
    n.classList.remove('show'), 2200);
}

/* -------- ANALISIS DE FRECUENCIA -------- */

function getLetterFrequency(text) {
  let freq = {};
  let total = 0;

  text = text.toLowerCase();

  for (let c of text) {
    if (/[a-zñ]/.test(c)) {
      freq[c] = (freq[c] || 0) + 1;
      total++;
    }
  }

  for (let k in freq) {
    freq[k] = (freq[k] / total) * 100;
  }

  return freq;
}

const spanishFreq = {
  a: 12.53, b: 1.42, c: 4.68, d: 5.86, e: 13.68, f: 0.69, g: 1.01,
  h: 0.70, i: 6.25, j: 0.44, k: 0.02, l: 4.97, m: 3.15, n: 6.71,
  ñ: 0.31, o: 8.68, p: 2.51, q: 0.88, r: 6.87, s: 7.98, t: 4.63,
  u: 3.93, v: 0.90, w: 0.01, x: 0.22, y: 0.90, z: 0.52
};

function detectShift(cipher) {

  const cs = getCharset();
  const n = cs.length;

  let bestShift = 0;
  let bestScore = Infinity;

  for (let s = 0; s < n; s++) {

    shift = s;

    let decrypted = "";

    for (let c of cipher) {
      decrypted += caesarChar(c, -1);
    }

    let freq = getLetterFrequency(decrypted);

    let score = 0;

    for (let l in spanishFreq) {

      let obs = freq[l] || 0;
      let exp = spanishFreq[l];

      score += Math.pow(obs - exp, 2);

    }

    if (score < bestScore) {
      bestScore = score;
      bestShift = s;
    }

  }

  return bestShift;
}