// BARBM312 content protection. Deters casual copying, printing, saving.
// Note: client-side protection cannot be absolute, but blocks normal copy/print/right-click.
(function(){
  var stop=function(e){e.preventDefault();e.stopPropagation();return false;};
  // disable context menu, copy, cut, drag, and text selection start
  ['contextmenu','copy','cut','dragstart','selectstart'].forEach(function(ev){
    document.addEventListener(ev, stop, {capture:true});
  });
  // blank the clipboard if a copy somehow fires
  document.addEventListener('copy', function(e){
    try{ e.clipboardData.setData('text/plain', '\u00A9 Dr. Hildegard Haas 2026 \u2014 EU Business School. Copying disabled.'); }catch(_){}
    e.preventDefault();
  }, true);
  // block common shortcuts: Ctrl/Cmd + C, X, S, P, U, A ; F12 ; Ctrl+Shift+I/J/C
  document.addEventListener('keydown', function(e){
    var k=(e.key||'').toLowerCase(), m=e.ctrlKey||e.metaKey;
    if(e.key==='F12'){return stop(e);}
    if(m && e.shiftKey && (k==='i'||k==='j'||k==='c')){return stop(e);}
    if(m && (k==='c'||k==='x'||k==='s'||k==='p'||k==='u'||k==='a')){return stop(e);}
  }, true);
  // discourage image dragging/saving
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('img,svg').forEach(function(el){
      el.setAttribute('draggable','false');
      el.addEventListener('contextmenu', stop, true);
    });
  });
})();