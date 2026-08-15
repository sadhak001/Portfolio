// ---------- decrypt text effect ----------
  function decryptText(el, finalText, duration){
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01#$%&";
    var totalFrames = 26;
    var frame = 0;
    var interval = duration / totalFrames;
    function update(){
      var output = "";
      var revealCount = Math.floor((frame / totalFrames) * finalText.length);
      for(var i = 0; i < finalText.length; i++){
        if(finalText[i] === " "){ output += " "; continue; }
        if(i < revealCount){ output += finalText[i]; }
        else { output += chars[Math.floor(Math.random() * chars.length)]; }
      }
      el.textContent = output;
      frame++;
      if(frame <= totalFrames){ setTimeout(update, interval); }
      else { el.textContent = finalText; }
    }
    update();
  }

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nameEl = document.getElementById('decryptName');
  if(nameEl){
    if(prefersReduced){ nameEl.textContent = "Aman Attri"; }
    else { decryptText(nameEl, "Aman Attri", 900); }
  }

  // ---------- cursor glow ----------
  var glow = document.getElementById('cursorGlow');
  if(glow && !prefersReduced){
    window.addEventListener('mousemove', function(e){
      glow.style.background = 'radial-gradient(560px circle at ' + e.clientX + 'px ' + e.clientY + 'px, rgba(108,159,255,0.055), transparent 42%)';
    }, { passive: true });
  }

  // ---------- scroll reveal ----------
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('visible'); });
  }

  // ---------- nav active link ----------
  var navLinks = document.querySelectorAll('[data-nav]');
  var sections = ['about','experience','skills','certifications','contact'].map(function(id){
    return document.getElementById(id);
  }).filter(Boolean);

  function onScroll(){
    var pos = window.scrollY + window.innerHeight * 0.3;
    var current = null;
    sections.forEach(function(sec){
      if(sec.offsetTop <= pos){ current = sec.id; }
    });
    navLinks.forEach(function(link){
      var match = link.getAttribute('href') === '#' + current;
      link.classList.toggle('active', match);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- magnetic button ----------
  if(!prefersReduced){
    ['magneticBtn', 'magneticBtn2'].forEach(function(id){
      var btn = document.getElementById(id);
      if(!btn) return;
      btn.addEventListener('mousemove', function(e){
        var rect = btn.getBoundingClientRect();
        var x = (e.clientX - rect.left - rect.width / 2) * 0.25;
        var y = (e.clientY - rect.top - rect.height / 2) * 0.4;
        btn.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      btn.addEventListener('mouseleave', function(){
        btn.style.transform = 'translate(0,0)';
      });
    });
  }