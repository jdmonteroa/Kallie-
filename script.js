let method = 'caesar';
let shift = 3;
let asciiMode = false;

function getCharset() {
  if (asciiMode) {
    let s = '';
    for (let i = 32; i <= 126; i++) s += String.fromCharCode(i);
    return s;
  }
  return document.getElementById('charset').value;
}

function setMethod(m) {
  method = m;
  document.getElementById('btnCaesar').classList.toggle('active', m === 'caesar');
  document.getElementById('btnAtbash').classList.toggle('active', m === 'atbash');
  document.getElementById('shiftGroup').style.display = m === 'caesar' ? '' : 'none';

  const badge = document.getElementById('modeBadge');
  badge.className = 'method-badge ' + m;
  document.getElementById('badgeText').textContent = 'Módulo: ' + (m === 'caesar' ? 'César' : 'Atbash');
  updateInfo();
  updateMapping();
}

function changeShift(d) {
  const cs = getCharset();
  const max = cs.length - 1;
  shift = ((shift + d - 1 + max) % max) + 1;
  document.getElementById('shiftDisplay').textContent = shift;
  document.getElementById('shiftRange').value = shift;
  updateInfo();
  updateMapping();
}

function syncShift(v) {
  shift = parseInt(v);
  document.getElementById('shiftDisplay').textContent = shift;
  updateInfo();
  updateMapping();
}

function toggleAscii() {
  asciiMode = !asciiMode;
  document.getElementById('asciiToggle').classList.toggle('on', asciiMode);
  document.getElementById('charset').disabled = asciiMode;
  document.getElementById('charset').style.opacity = asciiMode ? 0.4 : 1;
  if (asciiMode) {
    document.getElementById('charset').value = '(Modo ASCII: 32–126)';
  } else {
    document.getElementById('charset').value = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,;:!?-_';
  }
  updateInfo();
  updateMapping();
}

function updateInfo() {
  const cs = getCharset();
  const n = cs.length;
  document.getElementById('modLabel').textContent = n;
  document.getElementById('infoCharset').textContent = n + ' caracteres';
  document.getElementById('infoMod').textContent = 'n = ' + n + (method === 'caesar' ? ', k = ' + shift : ', i → (n-1-i)');
  document.getElementById('infoMethod').textContent = method === 'caesar'
    ? 'César (shift: ' + shift + ')'
    : 'Atbash (inversión)';

  document.getElementById('shiftRange').max = Math.max(n - 1, 1);
  if (shift >= n) {
    shift = 1;
    document.getElementById('shiftDisplay').textContent = shift;
  }
}

function updateMapping() {
  const cs = getCharset();
  const n = cs.length;
  const preview = document.getElementById('mappingPreview');
  preview.innerHTML = '';
  const limit = Math.min(n, 30);

  for (let i = 0; i < limit; i++) {
    let enc;
    if (method === 'caesar') {
      enc = cs[(i + shift) % n];
    } else {
      enc = cs[n - 1 - i];
    }
    const pair = document.createElement('div');
    pair.className = 'map-pair';
    const orig = cs[i] === ' ' ? '·' : cs[i];
    const encChar = enc === ' ' ? '·' : enc;
    pair.innerHTML = `<span class="orig">${escHtml(orig)}</span><span class="arrow">→</span><span class="enc">${escHtml(encChar)}</span>`;
    pair.title = `ASCII: ${cs.charCodeAt(i)} → ${enc.charCodeAt(0)}`;
    preview.appendChild(pair);
  }

  if (n > limit) {
    const more = document.createElement('div');
    more.style.cssText = 'font-size:0.6rem;color:var(--text-dim);padding:3px 8px;align-self:center;';
    more.textContent = `+${n - limit} más…`;
    preview.appendChild(more);
  }
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function caesarChar(c, dir) {
  const cs = getCharset();
  const n = cs.length;
  const idx = cs.indexOf(c);
  if (idx === -1) return c;
  const newIdx = ((idx + dir * shift) % n + n) % n;
  return cs[newIdx];
}

function atbashChar(c) {
  const cs = getCharset();
  const n = cs.length;
  const idx = cs.indexOf(c);
  if (idx === -1) return c;
  return cs[n - 1 - idx];
}

function process(op) {
  const input = document.getElementById('inputText').value;
  if (!input.trim()) { showNotif('Por favor ingresa texto'); return; }

  let result = '';
  const dir = op === 'encrypt' ? 1 : -1;

  for (const c of input) {
    if (method === 'caesar') {
      result += caesarChar(c, dir);
    } else {
      result += atbashChar(c);
    }
  }

  const outEl = document.getElementById('outputText');
  const outBox = document.getElementById('outputBox');
  outEl.textContent = result;
  outEl.className = 'result-anim';
  outBox.classList.add('has-content');
  setTimeout(() => outEl.className = '', 500);

  document.getElementById('infoOp').textContent =
    (op === 'encrypt' ? '⬆ Cifrado' : '⬇ Descifrado') + ' completado';
  showNotif(op === 'encrypt' ? 'Texto cifrado ✓' : 'Texto descifrado ✓');
}

function clearAll() {
  document.getElementById('inputText').value = '';
  document.getElementById('outputText').textContent = '';
  document.getElementById('outputBox').classList.remove('has-content');
  document.getElementById('infoOp').textContent = '—';
}

function copyResult() {
  const text = document.getElementById('outputText').textContent;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => showNotif('Copiado al portapapeles ✓'));
}

function showNotif(msg) {
  const n = document.getElementById('notif');
  n.textContent = msg;
  n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 2200);
}

// Init
updateInfo();
updateMapping();
document.getElementById('charset').addEventListener('input', () => {
  updateInfo();
  updateMapping();
});