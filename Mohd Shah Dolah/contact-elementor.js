/**
 * contact-elementor.js
 * Mohd Shah Dolah — Contact Page · Standalone JS
 *
 * HOW TO USE (pick one):
 *   A) Custom JS plugin (e.g. "Custom Scripts") — paste in footer section
 *   B) Child theme functions.php:
 *        add_action('wp_footer', function() {
 *          wp_enqueue_script('msd-contact', get_stylesheet_directory_uri().'/contact-elementor.js', [], false, true);
 *        });
 *   C) Elementor → Site Settings → Custom Code → Body End
 *
 * This file is the exact JS from contact-elementor-widget.html, without <script> tags.
 * It expects the HTML from that widget to already be in the DOM when this runs.
 */

(function () {
  'use strict';

  /* ── Scroll reveal (IntersectionObserver) ── */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('msd-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.msd-r').forEach(function (el) { io.observe(el); });
  } else {
    /* Fallback: reveal immediately for older browsers */
    document.querySelectorAll('.msd-r').forEach(function (el) { el.classList.add('msd-in'); });
  }

  /* ── Sticky nav ── */
  var navEl = document.getElementById('msd-nav');
  if (navEl) {
    window.addEventListener('scroll', function () {
      navEl.classList.toggle('msd-stuck', window.scrollY > 30);
    }, { passive: true });
  }

  /* ── Contact form ── */
  (function () {
    var btn        = document.getElementById('msd-sendBtn');
    var toast      = document.getElementById('msd-toast');
    var nameEl     = document.getElementById('msd-f-name');
    var emailEl    = document.getElementById('msd-f-email');
    var phoneEl    = document.getElementById('msd-f-phone');
    var subjectEl  = document.getElementById('msd-f-subject');
    var interestEl = document.getElementById('msd-f-interest');
    var msgEl      = document.getElementById('msd-f-msg');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var name  = nameEl.value.trim();
      var email = emailEl.value.trim();
      if (!name || !email) {
        var bad = !name ? nameEl : emailEl;
        bad.focus();
        bad.style.borderColor = '#C97D5A';
        setTimeout(function () { bad.style.borderColor = ''; }, 2000);
        return;
      }
      btn.disabled = true;
      btn.dataset.state = 'sending';
      setTimeout(function () {
        btn.dataset.state = 'done';
        if (toast) toast.classList.add('show');
        nameEl.value = ''; emailEl.value = ''; phoneEl.value = '';
        subjectEl.value = ''; interestEl.selectedIndex = 0; msgEl.value = '';
      }, 1200);
    });
  }());

  /* ── Chatbot ── */
  (function () {
    var WA = '60127120366';
    var KB = [
      { re: /^(hello|hi|hey|salam|hai)/i,
        msg: "Hello!\nI'm Shah's virtual assistant. Ask me about listings, fees, viewings, or anything about buying/selling in KL.",
        qr: ['View listings', 'Agent fees', 'Book a viewing', 'About Shah'] },
      { re: /(listing|propert|available|on sale|on rent)/i,
        msg: "Five listings are live:\n\nOL341 · Bungalow Alam Damai — RM 3.5M\nOL357 · Office Setiawangsa — RM 7,500/mo\nOL351 · 3-storey Salak South — RM 1.5M\nOL369 · Office Setiawangsa — RM 800K\nOL361 · Puchong terrace — RM 480K",
        qr: ['Bungalow details', 'Office for rent', 'Book a viewing'] },
      { re: /(fee|commission|charge|3%|1\.25)/i,
        msg: "Agent Fees:\n\n• Sale: max 3% of sale price\n• Rental: 1.25 month\n• Both + 8% SST\n\nGazetted under Act 242, Rule 48.",
        qr: ['Book a viewing', 'About Shah'] },
      { re: /(book|viewing|appointment|schedule|visit)/i,
        msg: "To schedule a viewing:\n\n1. WhatsApp: 012-712 0366\n2. Call directly\n3. Use the contact form above\n\nHours: 9am – 9pm GMT+8.",
        qr: ['WhatsApp now'] },
      { re: /(loan|mortgage|finance|installment)/i,
        msg: "Loan estimates (~4.25%, 30yrs):\n\n• RM3.5M → ~RM15.5K/mo\n• RM1.5M → ~RM6.5K/mo\n• RM800K → ~RM3.5K/mo\n• RM480K → ~RM2.1K/mo\n\nShah can run a tailored estimate.",
        qr: ['WhatsApp now'] },
      { re: /(contact|phone|call|email|whatsapp|mobile)/i,
        msg: "Direct line:\n\n• Mobile / WA: 012-712 0366\n• Email: shah@msdproniaga.biz.my\n• Studio: Jalan 1/48A, KL\n• Open: 9am – 9pm GMT+8",
        qr: ['WhatsApp now', 'Book a viewing'] },
      { re: /(about|who|shah|experience|background)/i,
        msg: "About Shah:\n\n6+ years registered with BOVAEP as PEA 3211. Based in KL, Klang Valley specialist. Small deliberate portfolio — every listing handled by one pair of hands.",
        qr: ['View listings', 'Book a viewing'] },
      { re: /(thanks|thank|terima|ok|noted|great)/i,
        msg: "You're welcome!\nAnything else I can help with?",
        qr: ['View listings', 'Book a viewing'] },
    ];
    var FALLBACK = { msg: "Not sure about that one.\n\nWhatsApp Shah directly on 012-712 0366 — replies usually within the hour.", qr: ['WhatsApp now', 'View listings', 'Book a viewing'] };
    var GREETING = { msg: "Hi! Welcome to the Contact page.\n\nAsk me about listings, fees, viewings, or buying/selling in KL.", qr: ['View listings', 'Agent fees', 'Book a viewing', 'About Shah'] };

    function handleAction(text) {
      var t = text.toLowerCase().trim();
      if (/whatsapp now/.test(t)) {
        window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent("Hi Shah, I'd like to enquire about a property."), '_blank', 'noopener,noreferrer');
        return true;
      }
      if (/call now/.test(t)) { window.location.href = 'tel:+' + WA; return true; }
      return false;
    }
    function getReply(text) {
      for (var i = 0; i < KB.length; i++) { if (KB[i].re.test(text)) return KB[i]; }
      return FALLBACK;
    }

    var cbot     = document.getElementById('msd-cbot');
    var fab      = document.getElementById('msd-cbotFab');
    var closeBtn = document.getElementById('msd-cbotClose');
    var msgsEl   = document.getElementById('msd-cbotMsgs');
    var chipsEl  = document.getElementById('msd-cbotChips');
    var input    = document.getElementById('msd-cbotInput');
    var sendBtn  = document.getElementById('msd-cbotSend');
    if (!cbot || !fab) return;
    var hasOpened = false;

    function clearNode(n) { while (n.firstChild) n.removeChild(n.firstChild); }
    function scrollBottom() { requestAnimationFrame(function () { msgsEl.scrollTop = msgsEl.scrollHeight; }); }
    function renderChips(chips) {
      clearNode(chipsEl);
      if (!chips || !chips.length) { chipsEl.classList.add('empty'); return; }
      chipsEl.classList.remove('empty');
      chips.forEach(function (c) {
        var b = document.createElement('button');
        b.className = 'cbot__chip'; b.textContent = c;
        b.addEventListener('click', function () { send(c); });
        chipsEl.appendChild(b);
      });
    }
    function addBot(text, qr) { var b = document.createElement('div'); b.className = 'cbot__bub cbot__bub--bot'; b.textContent = text; msgsEl.appendChild(b); renderChips(qr || []); scrollBottom(); }
    function addUser(text)    { var b = document.createElement('div'); b.className = 'cbot__bub cbot__bub--user'; b.textContent = text; msgsEl.appendChild(b); scrollBottom(); }
    function showTyping() {
      var t = document.createElement('div'); t.className = 'cbot__typing'; t.id = 'msd-cbotTyping';
      for (var i = 0; i < 3; i++) t.appendChild(document.createElement('span'));
      msgsEl.appendChild(t); scrollBottom();
    }
    function hideTyping() { var t = document.getElementById('msd-cbotTyping'); if (t) t.remove(); }
    function send(raw) {
      var text = (raw || '').trim(); if (!text) return;
      addUser(text);
      input.value = ''; sendBtn.disabled = true;
      chipsEl.classList.add('empty'); clearNode(chipsEl);
      var wasAction = handleAction(text); showTyping();
      setTimeout(function () {
        hideTyping();
        if (wasAction) addBot("Done — opened in a new tab.\nAnything else?", ['View listings', 'About Shah']);
        else { var r = getReply(text); addBot(r.msg, r.qr); }
      }, 850 + Math.random() * 450);
    }
    function openChat() {
      cbot.classList.add('open', 'read');
      if (!hasOpened) {
        hasOpened = true; showTyping();
        setTimeout(function () { hideTyping(); addBot(GREETING.msg, GREETING.qr); setTimeout(function () { input.focus(); }, 200); }, 900);
      } else { setTimeout(function () { input.focus(); }, 200); }
    }
    function closeChat() { cbot.classList.remove('open'); }

    fab.addEventListener('click',     function () { cbot.classList.contains('open') ? closeChat() : openChat(); });
    closeBtn.addEventListener('click', closeChat);
    input.addEventListener('input',    function () { sendBtn.disabled = !input.value.trim(); });
    input.addEventListener('keydown',  function (e) { if (e.key === 'Enter' && input.value.trim()) send(input.value); });
    sendBtn.addEventListener('click',  function () { send(input.value); });
  }());
}());
