# Kallie 🔐
### Sistema de Cifrado y Descifrado — César & Atbash

> Aplicación web interactiva para cifrar y descifrar texto usando métodos históricos de criptografía clásica, basada en el estándar ASCII.

---

## 🌐 Demo en vivo

[Ver Kallie en línea](https://jdmonteroa.github.io/Kallie-/) <!-- Reemplaza # con tu URL de Google Sites o GitHub Pages -->

---

## 📌 Descripción

**Kallie** es una aplicación web desarrollada con HTML, CSS y JavaScript puro que permite cifrar y descifrar mensajes utilizando dos métodos clásicos de criptografía:

- **César** — desplazamiento de N posiciones usando aritmética modular
- **Atbash** — inversión especular del índice de cada carácter

El sistema utiliza el código ASCII como base y permite al usuario definir exactamente qué conjunto de caracteres participan en el cifrado.

---

## ✨ Características

- Selección del módulo de cifrado: César o Atbash
- Conjunto de caracteres completamente personalizable
- Modo ASCII completo (caracteres del 32 al 126)
- Control de desplazamiento con slider y botones para César
- Vista previa en tiempo real del mapeo original → cifrado
- Indicador visual del módulo activo en todo momento
- Botón para copiar el resultado al portapapeles
- Interfaz elegante, responsiva y sin dependencias externas

---

## 🗂️ Estructura del proyecto
```
kallie/
├── index.html      # Estructura y contenido de la interfaz
├── styles.css      # Diseño visual y animaciones
├── script.js       # Lógica de cifrado y manipulación del DOM
└── README.md       # Documentación del proyecto
```

---

## 🧠 Explicación del código

### `script.js` — Lógica principal

#### Variables de estado
```javascript
let method = 'caesar';  // Método activo: 'caesar' o 'atbash'
let shift = 3;          // Desplazamiento para César (valor k)
let asciiMode = false;  // Si está en modo ASCII completo
```

Estas tres variables controlan el estado global de la aplicación. Cualquier cambio en la interfaz actualiza una o más de estas variables.

---

#### `getCharset()` — Obtener el conjunto de caracteres
```javascript
function getCharset() {
  if (asciiMode) {
    let s = '';
    for (let i = 32; i <= 126; i++) {
      s += String.fromCharCode(i); // Convierte número ASCII a carácter
    }
    return s; // Devuelve los 95 caracteres imprimibles del ASCII
  }
  return document.getElementById('charset').value; // Conjunto personalizado
}
```

Esta función decide qué caracteres participan en el cifrado. Si el usuario activó el modo ASCII completo, genera automáticamente todos los caracteres del código 32 (espacio) al 126 (~). Si no, lee lo que el usuario escribió en el campo de texto.

---

#### `caesarChar()` — Cifrado César carácter por carácter
```javascript
function caesarChar(c, dir) {
  const cs  = getCharset();       // Trae el conjunto activo
  const n   = cs.length;          // n = módulo (tamaño del conjunto)
  const idx = cs.indexOf(c);      // Busca la posición del carácter

  if (idx === -1) return c;        // Si no está en el conjunto, lo deja igual

  // Fórmula: (índice + dirección × desplazamiento) mod n
  // El + n antes del mod corrige posibles negativos al descifrar
  const newIdx = ((idx + dir * shift) % n + n) % n;

  return cs[newIdx]; // Devuelve el carácter en la nueva posición
}
```

El parámetro `dir` vale `+1` para cifrar y `-1` para descifrar. La doble operación módulo `(% n + n) % n` garantiza que el resultado nunca sea negativo, lo cual podría ocurrir al descifrar cuando el índice se vuelve menor que cero.

---

#### `atbashChar()` — Cifrado Atbash carácter por carácter
```javascript
function atbashChar(c) {
  const cs  = getCharset();    // Trae el conjunto activo
  const n   = cs.length;       // Tamaño del conjunto
  const idx = cs.indexOf(c);   // Busca la posición del carácter

  if (idx === -1) return c;     // Si no está en el conjunto, lo deja igual

  return cs[n - 1 - idx];      // Devuelve el espejo: primero↔último
}
```

El Atbash es su propia inversa: si aplicas la función dos veces al mismo carácter, obtienes el original. Por eso los botones Cifrar y Descifrar producen el mismo resultado en este modo.

---

#### `process()` — Procesar el texto completo
```javascript
function process(op) {
  const input = document.getElementById('inputText').value;
  if (!input.trim()) { showNotif('Por favor ingresa texto'); return; }

  let result = '';
  const dir = op === 'encrypt' ? 1 : -1; // +1 cifrar, -1 descifrar

  for (const c of input) {          // Recorre carácter por carácter
    if (method === 'caesar') {
      result += caesarChar(c, dir); // Aplica César
    } else {
      result += atbashChar(c);      // Aplica Atbash (dir no importa)
    }
  }

  document.getElementById('outputText').textContent = result;
}
```

Esta función es el punto de entrada principal. Recorre el texto de entrada carácter a carácter y aplica el algoritmo correspondiente a cada uno, construyendo el resultado de forma acumulativa.

---

#### `updateMapping()` — Vista previa del mapeo
```javascript
function updateMapping() {
  const cs    = getCharset();
  const n     = cs.length;
  const limit = Math.min(n, 30); // Muestra máximo 30 pares

  for (let i = 0; i < limit; i++) {
    let enc;
    if (method === 'caesar') {
      enc = cs[(i + shift) % n];  // Carácter cifrado en César
    } else {
      enc = cs[n - 1 - i];        // Carácter cifrado en Atbash
    }
    // Cada par muestra: original → cifrado
    // El tooltip muestra los valores ASCII de ambos
    pair.title = `ASCII: ${cs.charCodeAt(i)} → ${enc.charCodeAt(0)}`;
  }
}
```

Se ejecuta cada vez que el usuario cambia el método, el desplazamiento o el conjunto de caracteres. Muestra en pantalla cómo se transforma cada carácter, con los valores numéricos ASCII accesibles en el tooltip.

---

#### `setMethod()` — Cambiar entre César y Atbash
```javascript
function setMethod(m) {
  method = m; // Actualiza la variable de estado global

  // Activa visualmente el botón correcto
  document.getElementById('btnCaesar').classList.toggle('active', m === 'caesar');
  document.getElementById('btnAtbash').classList.toggle('active', m === 'atbash');

  // Muestra u oculta el control de desplazamiento (solo aplica a César)
  document.getElementById('shiftGroup').style.display = m === 'caesar' ? '' : 'none';

  // Actualiza el badge indicador de módulo
  const badge = document.getElementById('modeBadge');
  badge.className = 'method-badge ' + m;
  document.getElementById('badgeText').textContent =
    'Módulo: ' + (m === 'caesar' ? 'César' : 'Atbash');

  updateInfo();    // Refresca las pastillas de información
  updateMapping(); // Refresca la vista previa del mapeo
}
```

---

#### `toggleAscii()` — Modo ASCII completo
```javascript
function toggleAscii() {
  asciiMode = !asciiMode; // Alterna entre true y false

  document.getElementById('asciiToggle').classList.toggle('on', asciiMode);
  document.getElementById('charset').disabled = asciiMode; // Bloquea el campo
  document.getElementById('charset').style.opacity = asciiMode ? 0.4 : 1;

  if (asciiMode) {
    document.getElementById('charset').value = '(Modo ASCII: 32–126)';
  } else {
    // Restaura el conjunto por defecto
    document.getElementById('charset').value =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,;:!?-_';
  }

  updateInfo();
  updateMapping();
}
```

---

### `index.html` — Estructura

El HTML define la estructura en bloques de tarjetas (`div.card`), cada una con una responsabilidad específica:
```html
<!-- Tarjeta 1: Selección del método -->
<div class="card">
  <button onclick="setMethod('caesar')">César</button>
  <button onclick="setMethod('atbash')">Atbash</button>
</div>

<!-- Tarjeta 2: Configuración del conjunto y desplazamiento -->
<div class="card">
  <input type="text" id="charset">       <!-- Conjunto personalizable -->
  <input type="range" id="shiftRange">   <!-- Slider de desplazamiento -->
  <div id="mappingPreview"></div>        <!-- Vista previa del mapeo -->
</div>

<!-- Tarjeta 3: Entrada, operación y resultado -->
<div class="card">
  <textarea id="inputText"></textarea>   <!-- Texto a cifrar/descifrar -->
  <button onclick="process('encrypt')">Cifrar</button>
  <button onclick="process('decrypt')">Descifrar</button>
  <div id="outputBox"></div>             <!-- Resultado -->
</div>
```

---

### `styles.css` — Diseño

El CSS usa **variables personalizadas** para mantener coherencia visual en todo el sistema:
```css
:root {
  --bg: #0a0a0f;          /* Fondo principal oscuro */
  --card: #16161f;        /* Fondo de tarjetas */
  --gold: #c9a84c;        /* Color de acento principal */
  --accent: #4a9eff;      /* Azul para César */
  --success: #4ecdc4;     /* Verde para Atbash */
  --danger: #ff6b6b;      /* Rojo para limpiar */
  --mono: 'JetBrains Mono', monospace;  /* Fuente de código */
  --serif: 'Cormorant Garamond', serif; /* Fuente decorativa */
}
```

El fondo animado se genera con dos pseudo-elementos CSS (`::before` y `::after`) sin necesidad de JavaScript ni imágenes externas:
```css
/* Rejilla de puntos animada */
body::before {
  background-image:
    linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridPulse 8s ease-in-out infinite;
}

/* Orbe de luz de fondo */
body::after {
  background: radial-gradient(ellipse 40% 40% at 60% 40%,
    rgba(201,168,76,0.06) 0%, transparent 70%);
  animation: orb 12s ease-in-out infinite alternate;
}
```

---

## 🧮 Algoritmos

### Cifrado César
```
Cifrado:    índice_nuevo = (índice_original + k) mod n
Descifrado: índice_nuevo = (índice_original − k + n) mod n

donde:
  n = tamaño del conjunto de caracteres (módulo)
  k = desplazamiento definido por el usuario
```

### Cifrado Atbash
```
índice_cifrado = (n − 1) − índice_original

Es simétrico: cifrar y descifrar usan la misma operación
```

---

## 🚀 Cómo usar

1. Selecciona el método: **César** o **Atbash**
2. Define el conjunto de caracteres o activa el modo ASCII completo
3. Si elegiste César, ajusta el desplazamiento con el slider o los botones − / +
4. Escribe o pega tu mensaje en el área de texto
5. Haz clic en **Cifrar** o **Descifrar**
6. Copia el resultado con el botón **Copiar**

---

## 📁 Cómo ejecutar localmente
```bash
git clone https://github.com/tu-usuario/kallie.git
cd kallie
# Abre index.html en tu navegador
```

No necesitas instalar nada ni tener un servidor.

---

## 🏛️ Contexto histórico

**Abū Yūsuf Yaʿqūb ibn Isḥāq al-Kindī** (801–873 d.C.) fue el primer criptógrafo en describir el **análisis de frecuencias**, técnica que permite romper cualquier cifrado de sustitución simple contando la frecuencia de aparición de cada carácter y comparándola con la distribución estadística conocida del idioma.

Su obra *Risālah fī Istikhrāj al-Kutub al-Muʿammāh* demostró que César y Atbash son vulnerables porque preservan la distribución estadística del idioma original. Por esta razón tienen hoy valor exclusivamente educativo.

---

## ⚠️ Limitaciones de seguridad

| Vulnerabilidad | César | Atbash |
|---|---|---|
| Análisis de frecuencias | ✅ Vulnerable | ✅ Vulnerable |
| Fuerza bruta | ✅ Solo 25 claves posibles | ✅ Sin clave variable |
| Sin difusión ni confusión | ✅ No cumple | ✅ No cumple |
| Principio de Kerckhoffs | ❌ No lo cumple | ❌ No lo cumple |

---

## 🛠️ Tecnologías

- HTML5
- CSS3 (variables CSS, animaciones, grid)
- JavaScript ES6+ (vanilla, sin frameworks)
- Google Fonts — Cormorant Garamond + JetBrains Mono

---

## 📚 Bibliografía

- Al-Kindi (ca. 850). *Risālah fī Istikhrāj al-Kutub al-Muʿammāh*
- Singh, S. (1999). *The Code Book*. Fourth Estate
- Shannon, C. E. (1949). Communication Theory of Secrecy Systems. *Bell System Technical Journal*
- Paar, C. & Pelzl, J. (2010). *Understanding Cryptography*. Springer
- MDN Web Docs. *String.prototype.charCodeAt()*. https://developer.mozilla.org/

---

## 👤 Autor

Desarrollado como proyecto académico para la materia de **Seguridad Informática**.

---

*Kallie — Criptografía clásica con propósito educativo*
