const Ceninha     = document.getElementById('Ceninha');
const sitezinho   = document.getElementById('sitezinho');
const flashbranco = document.getElementById('flash-branco');
const btnEntrar   = document.getElementById('btn-entrar');

btnEntrar.addEventListener('click', () => {
  if (Ceninha.classList.contains('zooming')) return;

  Ceninha.classList.add('zooming');
  setTimeout(() => flashbranco.classList.add('flash'), 1000);
  setTimeout(() => {
    Ceninha.style.display = 'none';
    flashbranco.classList.remove('flash');
    sitezinho.classList.add('visible');
  }, 1400);
});

// Revela os cards quando o usuario rolar pra baixo
const reveals  = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('revealed'), i * 100);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));

// RUnas de cima em carrosel
const linhasRunas = [
  "❧  ᚠ  ᚢ  ᚦ  ᚨ  ᚱ  ᚲ  ✦  ᚷ  ᚹ  ᚺ  ᚾ  ❧",
  "✦  ᛁ  ᛃ  ᛇ  ᛈ  ᛉ  ᛊ  ᛏ  ᛒ  ᛖ  ᛗ  ᛚ  ✦",
  "❧  ᛜ  ᛞ  ᛟ  ᚩ  ᚪ  ᚫ  ✦  ᚬ  ᚭ  ᚮ  ᚯ  ❧",
];

const runas = document.querySelector('.runas');
if (runas) {
  //duplicando os bagulhetes
  const inner = document.createElement('div');
  inner.className = 'runas-inner';

  // preenche duas vezes 
  [0, 1].forEach(() => {
    linhasRunas.forEach(txt => {
      const span = document.createElement('span');
      span.textContent = txt;
      inner.appendChild(span);
    });
  });

  runas.appendChild(inner);
}

class RunicDecoder {
    constructor(el) {
        this.el = el;
        // as runas 
        this.chars = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ᛫᛬᛭ᛮᛯᛰ#@$%&';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="rune-char">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

//a troca de runa paea portugues
const elRunic = document.querySelector('.runinhas');
const fx = new RunicDecoder(elRunic);
const phrase = elRunic.getAttribute('data-text');

// animação só vai começar depoisss de clicar no botão do site 
btnEntrar.addEventListener('click', () => {
  setTimeout(() => {
    fx.setText(phrase);
  }, 1600); // esse trequinho garaente que o usuario veja a animação, pq senão vai aparecer só no final das letrinha spor causa do flash
});
