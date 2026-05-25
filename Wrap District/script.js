/* ═══════════════════════════════════════════════
   WRAP DISTRICT BOUTIQUE  —  script.js
═══════════════════════════════════════════════ */

/* ─── CUSTOM CURSOR ─── */
const cursor = document.querySelector('.cursor');
const ring   = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function loopRing() {
  rx += (mx - rx) * .11;
  ry += (my - ry) * .11;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(loopRing);
})();

/* cursor expand on interactive elements */
const interactives = document.querySelectorAll('a, button, .srv-card, .cs-ring');
interactives.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
    ring.style.width  = '58px';
    ring.style.height = '58px';
    ring.style.borderColor = 'rgba(200,144,30,.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.width  = '34px';
    ring.style.height = '34px';
    ring.style.borderColor = 'rgba(200,144,30,.55)';
  });
});

/* ─── NAVBAR ─── */
const nav    = document.getElementById('nav');
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 48);
  updateActiveLink();
}, { passive: true });

burger.addEventListener('click', () => {
  drawer.classList.toggle('open');
});
drawer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => drawer.classList.remove('open'));
});

/* active nav link */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nl');

function updateActiveLink() {
  const mid = window.scrollY + window.innerHeight / 2;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const bot = top + sec.offsetHeight;
    if (mid >= top && mid < bot) {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + sec.id);
      });
    }
  });
}

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.rv-u, .rv-l, .rv-r');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -44px 0px' });

revealEls.forEach(el => revealObs.observe(el));

/* ─── STAT COUNTERS ─── */
const statNums = document.querySelectorAll('.stat-n');
let counted = false;

const statObs = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting || counted) return;
  counted = true;
  statNums.forEach(el => {
    const target = +el.dataset.target;
    const dur    = 1900;
    const step   = target / (dur / 16);
    let cur = 0;
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = Math.floor(cur).toLocaleString();
    }, 16);
  });
}, { threshold: 0.5 });

const statSec = document.querySelector('.stats-sec');
if (statSec) statObs.observe(statSec);

/* ─── CAROUSEL DRAG ─── */
const csRing = document.getElementById('csRing');
if (csRing) {
  let dragging = false;
  let startX   = 0;
  let baseAngle = 0;
  let currentAngle = 0;
  let velX = 0;
  let prevX = 0;
  let animId;
  let paused = false;

  /* read current CSS angle from computed transform when drag starts */
  function getComputedAngle() {
    const style  = window.getComputedStyle(csRing);
    const matrix = new DOMMatrix(style.transform);
    return Math.round(Math.atan2(matrix.m13, matrix.m33) * (180 / Math.PI));
  }

  function startDrag(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    paused = true;
    csRing.style.animation = 'none';
    baseAngle = getComputedAngle();
    startX = clientX;
    prevX  = clientX;
    velX   = 0;
    dragging = true;
    cancelAnimationFrame(animId);
  }

  function onDrag(e) {
    if (!dragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    velX = clientX - prevX;
    prevX = clientX;
    const delta = clientX - startX;
    currentAngle = baseAngle + delta * .35;
    csRing.style.transform = `rotateY(${currentAngle}deg)`;
  }

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    /* momentum */
    (function momentum() {
      if (Math.abs(velX) < .3) {
        paused = false;
        /* resume CSS animation from current angle */
        csRing.style.animation = '';
        return;
      }
      velX   *= .93;
      currentAngle += velX * .35;
      csRing.style.transform = `rotateY(${currentAngle}deg)`;
      animId = requestAnimationFrame(momentum);
    })();
  }

  csRing.addEventListener('mousedown',  startDrag);
  window.addEventListener('mousemove',  onDrag);
  window.addEventListener('mouseup',    endDrag);
  csRing.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('touchmove',  onDrag,    { passive: true });
  window.addEventListener('touchend',   endDrag);
}

