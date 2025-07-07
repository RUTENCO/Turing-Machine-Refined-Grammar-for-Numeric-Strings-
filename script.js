// ==============================
// Alerta Bootstrap personalizada
// ==============================

/**
 * Muestra un mensaje de alerta Bootstrap dentro de un contenedor.
 * @param {string} cId - ID del contenedor donde mostrar la alerta.
 * @param {string} msg - Mensaje a mostrar.
 * @param {string} type - Tipo de alerta (ej. 'danger', 'warning', 'success'). Por defecto: 'danger'.
 */
function showAlert(cId, msg, type = 'danger') {
  document.getElementById(cId).innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${msg}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
}


// ====================================
// 1. Derivación según gramática formal
// ====================================

let gSteps = [], gIndex = 0;

/**
 * Ejecuta el análisis gramatical de una cadena numérica válida
 * y genera los pasos de derivación usando las reglas definidas.
 */
function runGrammar() {
  const s = document.getElementById('gInput').value.trim();
  const isNum = /^-?(0|[1-9][0-9]*)$/.test(s);

   // Detectar caracteres inválidos
  const invalidChars = s.replace(/[-0-9]/g, '');
  if (!isNum) {
    let msg = 'Cadena inválida.';
    if (invalidChars.length > 0) {
      // Mostrar los caracteres inválidos encontrados, sin repeticiones
      const unique = [...new Set(invalidChars.split(''))].join(', ');
      msg += ` Caracteres no permitidos: <b>${unique}</b>`;
    }
    showAlert('gAlert', msg, 'warning');
    setTimeout(() => {
    document.getElementById('gAlert').innerHTML = '';
    }, 2000); // 2000 ms = 2 segundos
    return;
  }

  const neg = s.startsWith('-');
  const core = neg ? s.slice(1) : s;

  // Reinicia pasos anteriores
  document.getElementById('gAlert').innerHTML = '';
  gSteps = [];

  // Paso 1: Regla 1
  gSteps.push("Numero ⇒ Signo NumeroSinSigno (Regla 1)");

  // Paso 2: Regla 2 o 3
  if (neg) {
    gSteps.push("⇒ '−' NumeroSinSigno (Regla 2)");
  } else {
    gSteps.push("⇒ ε NumeroSinSigno (Regla 3)");
  }

  // Paso 3: Cuerpo del número
  if (core === '0') {
    gSteps.push("NumeroSinSigno ⇒ '0' (Regla 5)");
    gSteps.push(`⇒ "${s}"`);
  } else {
    gSteps.push("NumeroSinSigno ⇒ DigitoNoCero Digitos (Regla 4)");

    // Paso 4: Primer dígito no cero
    const first = +core[0];
    const rnum = 9 + first; // reglas 10 a 18
    gSteps.push(`⇒ '${core[0]}' Digitos (Regla ${rnum})`);

    // Paso 5: Resto de dígitos
    for (let i = 1; i < core.length; i++) {
      gSteps.push("Digitos ⇒ Digito Digitos (Regla 6)");
      if (core[i] === '0') {
        gSteps.push("⇒ '0' Digitos (Regla 8)");
      } else {
        const ri = 9 + (+core[i]);
        gSteps.push("⇒ DigitoNoCero Digitos (Regla 9)");
        gSteps.push(`⇒ '${core[i]}' Digitos (Regla ${ri})`);
      }
    }

    // Paso 6: Finalizar con regla 7
    gSteps.push("Digitos ⇒ ε (Regla 7)");
    gSteps.push(`⇒ "${s}"`);
  }

  gIndex = 0;
  renderG();
}

/**
 * Renderiza los pasos de derivación en pantalla y
 * resalta la regla aplicada y el paso actual.
 */
function renderG() {
  document.querySelectorAll('.grammar-table tr.active')
    .forEach(tr => tr.classList.remove('active'));

  const ul = document.getElementById('gSteps');
  ul.innerHTML = '';

  gSteps.forEach((step, i) => {
    const li = document.createElement('li');
    li.className = 'list-group-item step';

    const m = step.match(/Regla (\d+)/);
    if (m) {
      const rn = +m[1];
      const row = document.querySelector(`.grammar-table tr.r${rn}`);
      if (row) row.classList.add('active');

      li.innerHTML = step.replace(
        /(Regla \d+)/,
        `<span class="r${rn}">$1</span>`
      );
    } else {
      li.textContent = step;
    }

    if (i === gIndex) li.classList.add('highlight');
    ul.appendChild(li);
  });
}

// Navegación entre pasos
function nextG() { if (gIndex < gSteps.length - 1) gIndex++; renderG(); }
function prevG() { if (gIndex > 0) gIndex--; renderG(); }


// ================================
// 2. Simulación de Máquina de Turing
// ================================

/**
 * Definición de la Máquina de Turing que reconoce la misma
 * gramática de los números aceptados (positivos, negativos, sin ceros a la izquierda).
 */
const TM = {
  blank: 'B',
  trans: {
    // q0: inicio
    'q0,-': ['q1','B','R'],  // signo negativo
    'q0,0': ['q6','B','R'],  // cero directo
    'q0,1': ['q2','B','R'], 'q0,2': ['q2','B','R'], 'q0,3': ['q2','B','R'],
    'q0,4': ['q2','B','R'], 'q0,5': ['q2','B','R'], 'q0,6': ['q2','B','R'],
    'q0,7': ['q2','B','R'], 'q0,8': ['q2','B','R'], 'q0,9': ['q2','B','R'],
    // q1: luego del signo negativo
    'q1,0': ['q6','B','R'], 
    'q1,1': ['q2','B','R'], 'q1,2': ['q2','B','R'], 'q1,3': ['q2','B','R'],
    'q1,4': ['q2','B','R'], 'q1,5': ['q2','B','R'], 'q1,6': ['q2','B','R'],
    'q1,7': ['q2','B','R'], 'q1,8': ['q2','B','R'], 'q1,9': ['q2','B','R'],
    // q2: estado de lectura de dígitos no iniciales
    'q2,0': ['q2','B','R'], 'q2,1': ['q2','B','R'], 'q2,2': ['q2','B','R'],
    'q2,3': ['q2','B','R'], 'q2,4': ['q2','B','R'], 'q2,5': ['q2','B','R'],
    'q2,6': ['q2','B','R'], 'q2,7': ['q2','B','R'], 'q2,8': ['q2','B','R'],
    'q2,9': ['q2','B','R'], 'q2,B': ['qacepta','B','R'],
    // q6: acepta si era solo 0
    'q6,B': ['qacepta','B','R']
  }
};

let tSteps = [], tIndex = -1;

/**
 * Prepara la simulación de la MT: inicializa cinta, estado, posición y genera pasos.
 */
function prepareTM() {
  const s = document.getElementById('tInput').value.trim();
  const isNum = /^-?(0|[1-9][0-9]*)$/.test(s);

  // Detectar caracteres inválidos
  const invalidChars = s.replace(/[-0-9]/g, '');
  if (!isNum) {
    let msg = 'Cadena inválida para MT.';
    if (invalidChars.length > 0) {
      const unique = [...new Set(invalidChars.split(''))].join(', ');
      msg += ` Caracteres no permitidos: <b>${unique}</b>`;
    }
    showAlert('tAlert', msg, 'warning');
    setTimeout(() => {
    document.getElementById('tAlert').innerHTML = '';
    }, 2000); // 2000 ms = 2 segundos
    return;
  }

  const margin = 5;
  const tape = Array(s.length + margin * 2).fill(TM.blank);
  for (let i = 0; i < s.length; i++) tape[margin + i] = s[i];

  let head = margin, state = 'q0', stepNum = 0;
  tSteps = [{
    step: 0, state, read: tape[head], write: '', move: '', newState: state, headPos: head, tape: [...tape]
  }];

  while (true) {
    const read = tape[head], key = state + ',' + read;
    if (!TM.trans[key]) break;

    const [ns, w, m] = TM.trans[key];
    tape[head] = w;
    head += m === 'R' ? 1 : -1;

    tSteps.push({
      step: ++stepNum, state, read, write: w, move: m, newState: ns, headPos: head, tape: [...tape]
    });

    state = ns;
    if (state === 'qacepta' || state === 'qrechaza') break;
  }

  tIndex = -1;
  document.getElementById('tape').innerHTML = '';
  document.querySelector('#tTable tbody').innerHTML = '';

  /*alerta de éxito*/
  showAlert('tAlert', 'Cadena cargada correctamente para la Máquina de Turing.', 'success');
  setTimeout(() => {
    document.getElementById('tAlert').innerHTML = '';
  }, 2000); // 2000 ms = 2 segundos
}

/**
 * Avanza un paso en la simulación de la Máquina de Turing.
 * Actualiza cinta y tabla de transiciones.
 */
function nextT() {
  if (tIndex < tSteps.length - 1) {
    tIndex++;
    const st = tSteps[tIndex];

    const tapeDiv = document.getElementById('tape');
    tapeDiv.innerHTML = '';
    st.tape.forEach((c, i) => {
      const cell = document.createElement('div');
      cell.className = 'cell' + (i === st.headPos ? ' head' : '');
      cell.textContent = c;
      tapeDiv.appendChild(cell);
    });

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${st.step}</td><td>${st.state}</td><td>${st.read}</td>
      <td>${st.write}</td><td>${st.move}</td><td>${st.newState}</td>`;
    document.querySelector('#tTable tbody').appendChild(tr);
  }
}

/**
 * Retrocede un paso en la simulación de la Máquina de Turing.
 * Quita la última transición y actualiza la cinta.
 */
function prevT() {
  if (tIndex >= 0) {
    const tb = document.querySelector('#tTable tbody');
    tb.removeChild(tb.lastElementChild);
    tIndex--;

    const tapeDiv = document.getElementById('tape');
    tapeDiv.innerHTML = '';

    if (tIndex >= 0) {
      const st = tSteps[tIndex];
      st.tape.forEach((c, i) => {
        const cell = document.createElement('div');
        cell.className = 'cell' + (i === st.headPos ? ' head' : '');
        cell.textContent = c;
        tapeDiv.appendChild(cell);
      });
    }
  }
}
