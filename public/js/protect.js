/**
 * RE Luxe - Client-Side Code Protection
 * Blocks inspect, right-click, view-source, and common DevTools shortcuts
 */
(function () {
  'use strict';

  // ── 1. Disable Right-Click Context Menu ─────────────────────────────────
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  });

  // ── 2. Block DevTools Keyboard Shortcuts ────────────────────────────────
  document.addEventListener('keydown', function (e) {
    const key = e.key || e.keyCode;

    // F12
    if (e.keyCode === 123) { e.preventDefault(); return false; }

    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (Inspect / Console / Elements)
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
      e.preventDefault(); return false;
    }

    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) { e.preventDefault(); return false; }

    // Ctrl+S (Save Page)
    if (e.ctrlKey && e.keyCode === 83) { e.preventDefault(); return false; }

    // Ctrl+A (Select All)
    if (e.ctrlKey && e.keyCode === 65) { e.preventDefault(); return false; }

    // Ctrl+P (Print)
    if (e.ctrlKey && e.keyCode === 80) { e.preventDefault(); return false; }
  });

  // ── 3. DevTools Open Detection ──────────────────────────────────────────
  var devtoolsWarning = document.createElement('div');
  devtoolsWarning.id = '_dt_warning';
  devtoolsWarning.style.cssText = [
    'display:none',
    'position:fixed',
    'inset:0',
    'background:rgba(0,0,0,0.97)',
    'z-index:999999',
    'align-items:center',
    'justify-content:center',
    'flex-direction:column',
    'gap:16px',
    'color:#fff',
    'font-family:sans-serif',
    'text-align:center',
    'padding:2rem'
  ].join(';');
  devtoolsWarning.innerHTML = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="#d4af37" stroke-width="1.5">',
    '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>',
    '</svg>',
    '<h2 style="font-size:1.5rem;font-weight:700;color:#d4af37;margin:0">Developer Tools Detected</h2>',
    '<p style="color:#aaa;max-width:400px;margin:0">This content is proprietary and protected. Please close Developer Tools to continue browsing.</p>'
  ].join('');
  document.body.appendChild(devtoolsWarning);

  function checkDevTools() {
    var threshold = 160;
    var widthDiff  = window.outerWidth  - window.innerWidth;
    var heightDiff = window.outerHeight - window.innerHeight;
    var open = widthDiff > threshold || heightDiff > threshold;
    devtoolsWarning.style.display = open ? 'flex' : 'none';
  }

  // Poll every 1.5s
  setInterval(checkDevTools, 1500);
  // Also check on resize (undocking devtools changes dimensions)
  window.addEventListener('resize', checkDevTools);

  // ── 4. Disable Text Selection (CSS via JS for all elements) ─────────────
  var noSelect = document.createElement('style');
  noSelect.textContent = [
    '*, *::before, *::after {',
    '  -webkit-user-select: none !important;',
    '  -moz-user-select: none !important;',
    '  -ms-user-select: none !important;',
    '  user-select: none !important;',
    '}',
    '/* Allow selection inside form inputs */',
    'input, textarea, select {',
    '  -webkit-user-select: text !important;',
    '  user-select: text !important;',
    '}'
  ].join('\n');
  document.head.appendChild(noSelect);

  // ── 5. Disable Image Dragging ────────────────────────────────────────────
  document.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  });

  // ── 6. Block view-source:// protocol attempts ───────────────────────────
  if (window.location.href.indexOf('view-source:') !== -1) {
    window.location.href = '/';
  }

})();
