# 📘 Simulación Interactiva: Gramática y Máquina de Turing

Este proyecto web permite simular paso a paso la derivación de números enteros con una **gramática formal** y validar su aceptación usando una **Máquina de Turing (MT)**. Ideal para estudiantes o docentes que trabajan con teoría de lenguajes y autómatas.

### 🚀 Funcionalidades

- ✔️ Derivación paso a paso de una cadena numérica según una gramática libre de contexto.
- ✔️ Visualización de reglas aplicadas y resaltado en tabla.
- ✔️ Simulación de una Máquina de Turing que valida la misma clase de cadenas.
- ✔️ Despliegue de cinta, transiciones y estados.
- ✔️ Navegación paso a paso hacia adelante o atrás.

### 🧠 Tecnologías usadas

- HTML5, CSS3, JavaScript ES6
- [Bootstrap 5](https://getbootstrap.com) para estilos y componentes
- Sin dependencias externas adicionales

### 📚 Gramática utilizada

```text
1. Numero → Signo NumeroSinSigno
2. Signo → '−'
3. Signo → λ
4. NumeroSinSigno → DigitoNoCero Digitos
5. NumeroSinSigno → '0'
6. Digitos → Digito Digitos
7. Digitos → λ
8. Digito → '0'
9. Digito → DigitoNoCero
10. DigitoNoCero → '1'
11. DigitoNoCero → '2'
12. DigitoNoCero → '3'
13. DigitoNoCero → '4'
14. DigitoNoCero → '5'
15. DigitoNoCero → '6'
16. DigitoNoCero → '7'
17. DigitoNoCero → '8'
18. DigitoNoCero → '9'
```

## 🌐 Ver en línea (GitHub Pages)

Puedes usar el simulador directamente desde tu navegador:

🔗 **[Abrir simulador en línea](https://rutenco.github.io/Turing-Machine-Refined-Grammar-for-Numeric-Strings-/)**

---

## 💻 Cómo usar localmente

Si prefieres correrlo en tu propio equipo, sigue estos pasos:

### 1. Clona el repositorio

```bash
git clone https://github.com/rutenco/Turing-Machine-Refined-Grammar-for-Numeric-Strings-.git
cd Turing-Machine-Refined-Grammar-for-Numeric-Strings-
```

### 2. Abre el archivo index.html
Haz doble clic sobre index.html, o abre una terminal y ejecuta:

```bash
# Linux
xdg-open index.html

# Windows
start index.html

# macOS
open index.html
```
¡Listo! La simulación se abrirá en tu navegador.

## 🤖 Máquina de Turing
La MT trabaja sobre una cinta con el alfabeto {0,1,...,9, −, B} y realiza validaciones según los siguientes estados:

q0: Estado inicial

q1: Signo negativo

q2: Recorre los dígitos

q6: Acepta si es 0

qacepta: Estado final de aceptación

## ✅ Ejemplos válidos
123

-45

0

-0

## ❌ Casos inválidos
--12

01

2+5

abc

¡Gracias por visitar el proyecto! Puedes usarlo, modificarlo o contribuir para mejorarlo. ⭐
