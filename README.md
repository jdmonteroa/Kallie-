<div align="center">

# 🔐 KALLIE
```
```
## UNIVERSIDAD AUTONOMA DE AGUASCALIENTES
### CENTRO DE CIENCIAS BASICAS 
---

## 📋 TEMA
### PRIMEROS PASOS CIFRANDO

---

## 👨‍💻 ALUMNO

**JESÚS DAVID MONTERO AYALA**

---

## 🎓 CARRERA

**ING. EN SISTEMAS COMPUTACIONALES**

Semestre **8°** — Grupo **"B"**

---

## 👨‍🏫 PROFESOR

**ARTURO OCAMPO SILVA**

---

## 📅 FECHA

**20 de Febrero del 2026, Aguascalientes, Ags.**

</div>

---

---

# 📑 ÍNDICE

| Sección | Descripción |
|:---:|---|
| 1 | [Introducción](#-1-introducción) |
| 2 | [Objetivo](#-2-objetivo) |
| 3 | [Desarrollo](#️-3-desarrollo) |
| 3.1 | [Documentación del programa](#31-documentación-del-programa-segura) |
| 3.1.1 | [Variables de estado](#variables-de-estado) |
| 3.1.2 | [getCharset() — Conjunto de caracteres](#getcharset----obtener-el-conjunto-de-caracteres) |
| 3.1.3 | [caesarChar() — Cifrado César](#caesarchar----cifrado-césar-carácter-por-carácter) |
| 3.1.4 | [atbashChar() — Cifrado Atbash](#atbashchar----cifrado-atbash-carácter-por-carácter) |
| 3.1.5 | [process() — Procesar texto](#process----procesar-el-texto-completo) |
| 3.1.6 | [updateMapping() — Vista previa](#updatemapping----vista-previa-del-mapeo) |
| 3.1.7 | [setMethod() — Cambiar método](#setmethod----cambiar-entre-césar-y-atbash) |
| 3.1.8 | [toggleAscii() — Modo ASCII](#toggleascii----modo-ascii-completo) |
| 3.1.9 | [index.html — Estructura](#indexhtml----estructura) |
| 3.1.10 | [styles.css — Diseño](#stylescss----diseño) |
| 3.2 | [Programa web Kallie funcionando](#32-programa-web--kallie) |
| 3.2.1 | [Descripción funcional](#321-descripción-funcional) |
| 3.2.2 | [Algoritmos matemáticos](#322-algoritmos-matemáticos) |
| 3.2.3 | [Instrucciones de uso](#323-cómo-usar-kallie) |
| 3.2.4 | [Ejecución local](#324-cómo-ejecutar-localmente) |
| 4 | [Conclusión](#-4-conclusión) |
| 5 | [Bibliografía](#-5-bibliografía) |

---

---

# 📖 1. Introducción

## Al-Kindi: El padre del criptoanálisis

**Abū Yūsuf Yaʿqūb ibn Isḥāq al-Kindī** — أبو يوسف يعقوب بن إسحاق الكندي — (801–873 d.C.) fue un filósofo, matemático y científico árabe considerado el **padre del criptoanálisis**. Nacido en Kufa, Iraq, al-Kindi fue una de las mentes más brillantes de su época y autor de más de 260 obras sobre filosofía, matemáticas, medicina y música.

Su contribución más trascendental a la seguridad de la información se encuentra en su obra:

> *"Risālah fī Istikhrāj al-Kutub al-Muʿammāh"*
> **Manuscrito sobre el desciframiento de mensajes crípticos** — ca. 850 d.C.

En este manuscrito, al-Kindi describió por primera vez en la historia el método del **análisis de frecuencias**, una técnica que cambió para siempre la manera en que la humanidad entiende la seguridad criptográfica.

---

## El análisis de frecuencias y su aporte al hackeo de cifrados simples

El principio central descubierto por al-Kindi es el siguiente:

> *"Si conocemos la naturaleza del lenguaje en el que está escrito el mensaje, podemos descifrar cualquier texto cifrado con sustitución simple contando la frecuencia de sus símbolos."*

### ¿Cómo funciona el ataque?
```
TEXTO ORIGINAL (español):   "la casa es grande"
DISTRIBUCIÓN CONOCIDA:       'a' ≈ 12.5%  'e' ≈ 13.7%  's' ≈ 7.9%

TEXTO CIFRADO (César k=3):  "od fdvd hv judqgh"
FRECUENCIAS EN EL CIFRADO:   'd' aparece más → probablemente es 'a'
                              'h' aparece seguido → probablemente es 'e'

CONCLUSIÓN: desplazamiento k = 3  →  texto descifrado en segundos
```

### Pasos del ataque de al-Kindi sobre César o Atbash

| Paso | Acción |
|:---:|---|
| 1 | Interceptar el texto cifrado |
| 2 | Contar la frecuencia de cada carácter en el texto cifrado |
| 3 | Ordenar los caracteres de mayor a menor frecuencia |
| 4 | Comparar con la tabla de frecuencias del idioma original |
| 5 | Establecer correspondencias: símbolo más frecuente = letra más común |
| 6 | Probar el desplazamiento o sustitución derivada |
| 7 | Ajustar con contexto lingüístico hasta obtener texto legible |

Este proceso puede realizarse **manualmente en minutos** y computacionalmente **en microsegundos**, lo que convierte a los cifrados monoalfabéticos en completamente indefendibles ante cualquier atacante moderno.

---

## ¿Por qué César y Atbash ya no son viables como métodos de protección?

Los cifrados César y Atbash presentan cuatro vulnerabilidades estructurales que los hacen inaceptables para proteger información real:

### 1. Preservan la distribución estadística del idioma
Un texto en español cifrado con César sigue teniendo la misma proporción de vocales y consonantes. Solo cambian los símbolos, no su frecuencia. Al-Kindi demostró que esto es suficiente para romper cualquier cifrado de sustitución simple.

### 2. Espacio de claves mínimo
El cifrado César sobre el alfabeto de 26 letras tiene únicamente **25 claves posibles**. Un atacante puede probar todas las combinaciones en menos de un segundo, incluso sin análisis de frecuencias. Esto se denomina ataque de **fuerza bruta**.

### 3. El Atbash no tiene clave variable
El Atbash es un cifrado **determinista sin clave**: el algoritmo mismo es la clave. Cualquier persona que conozca el método puede descifrar cualquier mensaje Atbash de forma instantánea, sin necesidad de ningún secreto adicional.

### 4. No cumplen los criterios modernos de Shannon
Claude Shannon estableció en 1949 que un cifrado seguro debe cumplir dos propiedades:
- **Difusión**: cambiar un carácter del texto original debe alterar radicalmente el texto cifrado.
- **Confusión**: la relación entre la clave y el texto cifrado debe ser lo más compleja posible.

César y Atbash no cumplen ninguna de las dos propiedades. Cambiar una letra en el texto original solo cambia esa misma letra en el cifrado, sin afectar al resto del mensaje.

---

> **Conclusión de la introducción:** El legado de al-Kindi nos enseña que la seguridad de un sistema criptográfico no debe depender del secreto del algoritmo, sino de la imposibilidad matemática de romperlo incluso conociéndolo — principio que hoy llamamos **Principio de Kerckhoffs**. César y Atbash fallan completamente en este principio y tienen hoy valor únicamente educativo, no como herramientas de protección de datos reales.

---

---

# 🎯 2. Objetivo

Desarrollar e implementar un sistema web interactivo de cifrado y descifrado de texto que permita al usuario aplicar los métodos históricos de cifrado **César** y **Atbash**, utilizando la tabla **ASCII** como conjunto base de caracteres configurable, con el fin de comprender de manera práctica los principios fundamentales de la criptografía clásica, sus limitaciones matemáticas y la relevancia del criptoanálisis moderno iniciado por al-Kindi.

### Objetivos específicos

- Implementar el algoritmo de cifrado César con desplazamiento configurable usando aritmética modular sobre un conjunto de caracteres definido por el usuario.
- Implementar el algoritmo de cifrado Atbash como inversión especular del índice de cada carácter dentro del conjunto activo.
- Permitir al usuario definir libremente el conjunto de caracteres que participan en el cifrado, incluyendo la opción del rango ASCII completo (32–126).
- Mostrar en tiempo real el mapeo de transformación carácter por carácter con sus valores ASCII correspondientes.
- Identificar visualmente el módulo o método de cifrado activo en todo momento de la sesión.
- Publicar el sistema en la web de forma accesible, sin dependencias de servidor ni instalación.

---

---

# ⚙️ 3. Desarrollo

## 3.1 Documentación del programa (segura)

> La documentación del programa se presenta directamente en este repositorio de GitHub, vinculada al código fuente. Esto garantiza trazabilidad, fecha de creación verificable y autoría registrada — sin necesidad de impresiones físicas.

### Arquitectura general

Kallie es una aplicación web de una sola página construida en tres capas completamente separadas:

| Archivo | Capa | Responsabilidad |
|---|---|---|
| `index.html` | Presentación | Estructura del DOM, elementos interactivos |
| `styles.css` | Diseño | Variables CSS, animaciones, responsividad |
| `script.js` | Lógica | Algoritmos de cifrado, gestión de estado, eventos |

---

### Variables de estado
```javascript
let method = 'caesar';  // Método activo: 'caesar' o 'atbash'
let shift = 3;          // Desplazamiento para César (valor k)
let asciiMode = false;  // Si está en modo ASCII completo
```

Estas tres variables controlan el estado global de la aplicación. Cualquier cambio en la interfaz actualiza una o más de estas variables y dispara las funciones de refresco de la interfaz.

---

### `getCharset()` — Obtener el conjunto de caracteres
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

Esta función decide qué caracteres participan en el cifrado. Si el usuario activó el modo ASCII completo, genera automáticamente todos los caracteres del código 32 (espacio) al 126 (~), un total de 95 caracteres. Si no, lee directamente el campo de texto editable por el usuario.

---

### `caesarChar()` — Cifrado César carácter por carácter
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

El parámetro `dir` vale `+1` para cifrar y `-1` para descifrar. La doble operación módulo `(% n + n) % n` garantiza que el resultado nunca sea negativo, situación que ocurre al descifrar cuando el índice resultante es menor que cero.

---

### `atbashChar()` — Cifrado Atbash carácter por carácter
```javascript
function atbashChar(c) {
  const cs  = getCharset();    // Trae el conjunto activo
  const n   = cs.length;       // Tamaño del conjunto
  const idx = cs.indexOf(c);   // Busca la posición del carácter

  if (idx === -1) return c;     // Si no está en el conjunto, lo deja igual

  return cs[n - 1 - idx];      // Devuelve el espejo: primero↔último
}
```

El Atbash es su propia inversa matemática: aplicar la función dos veces sobre el mismo carácter devuelve el original. Por esta razón los botones Cifrar y Descifrar producen el mismo resultado en este modo.

---

### `process()` — Procesar el texto completo
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

Función principal de la aplicación. Recorre el texto de entrada carácter a carácter y aplica el algoritmo correspondiente a cada uno, acumulando el resultado en la variable `result` hasta completar el mensaje.

---

### `updateMapping()` — Vista previa del mapeo
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
    // El tooltip muestra los valores ASCII de ambos caracteres
    pair.title = `ASCII: ${cs.charCodeAt(i)} → ${enc.charCodeAt(0)}`;
  }
}
```

Se ejecuta automáticamente cada vez que el usuario cambia el método, el desplazamiento o el conjunto de caracteres. Permite visualizar el efecto del cifrado antes de procesar cualquier texto.

---

### `setMethod()` — Cambiar entre César y Atbash
```javascript
function setMethod(m) {
  method = m; // Actualiza la variable de estado global

  // Activa visualmente el botón correcto
  document.getElementById('btnCaesar').classList.toggle('active', m === 'caesar');
  document.getElementById('btnAtbash').classList.toggle('active', m === 'atbash');

  // Muestra u oculta el control de desplazamiento (solo aplica a César)
  document.getElementById('shiftGroup').style.display = m === 'caesar' ? '' : 'none';

  // Actualiza el badge indicador de módulo activo
  const badge = document.getElementById('modeBadge');
  badge.className = 'method-badge ' + m;
  document.getElementById('badgeText').textContent =
    'Módulo: ' + (m === 'caesar' ? 'César' : 'Atbash');

  updateInfo();    // Refresca las pastillas de información
  updateMapping(); // Refresca la vista previa del mapeo
}
```

---

### `toggleAscii()` — Modo ASCII completo
```javascript
function toggleAscii() {
  asciiMode = !asciiMode; // Alterna entre true y false

  document.getElementById('asciiToggle').classList.toggle('on', asciiMode);
  document.getElementById('charset').disabled = asciiMode; // Bloquea el campo
  document.getElementById('charset').style.opacity = asciiMode ? 0.4 : 1;

  if (asciiMode) {
    document.getElementById('charset').value = '(Modo ASCII: 32–126)';
  } else {
    document.getElementById('charset').value =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,;:!?-_';
  }

  updateInfo();
  updateMapping();
}
```

---

### `index.html` — Estructura

El HTML organiza la interfaz en tres tarjetas (`div.card`) con responsabilidades separadas:
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

El fondo animado se genera con pseudo-elementos CSS sin JavaScript ni imágenes:
```css
/* Rejilla de puntos animada */
body::before {
  background-image:
    linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridPulse 8s ease-in-out infinite;
}

/* Orbe de luz ambiental */
body::after {
  background: radial-gradient(ellipse 40% 40% at 60% 40%,
    rgba(201,168,76,0.06) 0%, transparent 70%);
  animation: orb 12s ease-in-out infinite alternate;
}
```

---

---

## 3.2 Programa Web — Kallie

<div align="center">

[![Ver Kallie en vivo](https://img.shields.io/badge/🔐%20Kallie-Ver%20en%20vivo-C9A84C?style=for-the-badge&logo=google-chrome&logoColor=white)](https://jdmonteroa.github.io/Kallie-/)

**https://jdmonteroa.github.io/Kallie-/**

</div>

### 3.2.1 Descripción funcional

**Kallie** es una aplicación web completamente funcional publicada en la web, sin necesidad de instalación ni servidor. Todas las operaciones de cifrado se ejecutan en el navegador del usuario, garantizando que ningún dato es transmitido por red. El sistema puede desplegarse en Google Sites, GitHub Pages o abrirse localmente desde cualquier navegador moderno.

### 3.2.2 Algoritmos matemáticos

#### Cifrado César
```
Cifrado:    índice_nuevo = (índice_original + k) mod n
Descifrado: índice_nuevo = (índice_original − k + n) mod n

donde:
  n = tamaño del conjunto de caracteres (módulo aritmético)
  k = desplazamiento definido por el usuario (1 ≤ k ≤ n-1)
```

**Ejemplo con k=3, conjunto = abcdefghijklmnopqrstuvwxyz (n=26):**

| Original | Índice | + k | mod 26 | Cifrado |
|:---:|:---:|:---:|:---:|:---:|
| h | 7 | 10 | 10 | k |
| o | 14 | 17 | 17 | r |
| l | 11 | 14 | 14 | o |
| a | 0 | 3 | 3 | d |

#### Cifrado Atbash
```
índice_cifrado = (n − 1) − índice_original

Es simétrico: la misma operación cifra y descifra.
```

**Ejemplo con conjunto = abcdefghijklmnopqrstuvwxyz (n=26):**

| Original | Índice | (26-1) - índice | Cifrado |
|:---:|:---:|:---:|:---:|
| a | 0 | 25 | z |
| b | 1 | 24 | y |
| m | 12 | 13 | n |
| z | 25 | 0 | a |

### 3.2.3 Cómo usar Kallie

1. Selecciona el método: **César** o **Atbash** en el panel superior
2. Define el conjunto de caracteres en el campo de texto, o activa **Modo ASCII completo**
3. Si elegiste César, ajusta el desplazamiento `k` con el slider o los botones − / +
4. Observa la vista previa del mapeo para verificar las transformaciones
5. Escribe o pega tu mensaje en el área de texto de entrada
6. Haz clic en **⬆ Cifrar** o **⬇ Descifrar** según la operación deseada
7. Copia el resultado con el botón **Copiar** que aparece al pasar el cursor

### 3.2.4 Cómo ejecutar localmente
```bash
git clone https://github.com/jdmonteroa/Kallie-.git
cd Kallie-
# Abre index.html en tu navegador — no requiere servidor ni instalación
```

---

---

# ✅ 4. Conclusión

El desarrollo de Kallie permitió explorar de manera práctica los fundamentos de la criptografía clásica, evidenciando tanto la elegancia matemática de los cifrados de sustitución históricos como sus limitaciones estructurales frente a la seguridad moderna.

El trabajo con los algoritmos César y Atbash sobre la base del código ASCII demostró que la fortaleza de un sistema criptográfico no depende de la complejidad aparente de la transformación, sino de la solidez matemática del espacio de claves y de su capacidad para resistir ataques estadísticos. Al-Kindi, con su análisis de frecuencias del siglo IX, estableció un principio que sigue siendo válido hoy: cualquier cifrado que preserve la distribución estadística del idioma subyacente es, por definición, vulnerable ante un atacante con conocimientos básicos de estadística.

Desde el punto de vista técnico, el proyecto demostró la viabilidad de construir herramientas educativas de criptografía como aplicaciones web ligeras, sin dependencias externas ni servidores, desplegables en plataformas públicas como GitHub Pages o Google Sites. La separación entre presentación, diseño y lógica siguió principios de arquitectura limpia que facilitan el mantenimiento y la extensión del sistema.

Los cifrados César y Atbash tienen hoy valor **exclusivamente pedagógico**: permiten comprender de forma intuitiva conceptos como módulo aritmético, inversión de índice, espacio de claves y análisis de frecuencias. Sin embargo, para la protección real de datos en sistemas modernos, son completamente insuficientes. Los estándares actuales como **AES-256**, **RSA** o **ChaCha20** operan sobre principios matemáticos radicalmente distintos, con espacios de claves de tal magnitud que el análisis de al-Kindi no tiene ninguna aplicabilidad práctica contra ellos.

---

---

# 📚 5. Bibliografía

- Al-Kindi, A. Y. (ca. 850). *Risālah fī Istikhrāj al-Kutub al-Muʿammāh* [Manuscrito sobre el desciframiento de mensajes crípticos]. Biblioteca de Sulaimaniyyah, Estambul.

- Singh, S. (1999). *The Code Book: The Science of Secrecy from Ancient Egypt to Quantum Cryptography*. Fourth Estate. Londres, Reino Unido.

- Kahn, D. (1967). *The Codebreakers: The Comprehensive History of Secret Communication*. Macmillan. Nueva York, EE. UU.

- Shannon, C. E. (1949). Communication Theory of Secrecy Systems. *Bell System Technical Journal*, 28(4), 656–715. https://doi.org/10.1002/j.1538-7305.1949.tb00928.x

- Paar, C. & Pelzl, J. (2010). *Understanding Cryptography: A Textbook for Students and Practitioners*. Springer. Berlín, Alemania.

- National Institute of Standards and Technology. (2001). *Advanced Encryption Standard (AES) — FIPS PUB 197*. U.S. Department of Commerce. https://doi.org/10.6028/NIST.FIPS.197

- Mozilla Developer Network. (2024). *String.prototype.charCodeAt() — JavaScript Reference*. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt

- The Unicode Consortium. (2023). *The Unicode Standard, Version 15.1*. https://www.unicode.org/versions/Unicode15.1.0/

---

<div align="center">

---

| Campo | Datos |
|:---:|:---:|
| **Alumno** | Jesús David Montero Ayala |
| **Carrera** | Ing. en Sistemas Computacionales |
| **Semestre** | 8° — Grupo "B" |
| **Profesor** | Arturo Ocampo Silva |
| **Institución** | Universidad Autónoma de Aguascalientes |
| **Fecha** | 20 de Febrero del 2026 |

---

*Kallie — Criptografía clásica con propósito educativo*

*Centro de Ciencias Básicas — UAA — 2026*

</div>
