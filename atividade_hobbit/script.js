  // Inject base64 image
  const img = document.getElementById('hobbit-bg');
  // The image is already set via src attribute

  const introScene = document.getElementById('intro-scene');
  const siteContent = document.getElementById('site-content');
  const flashOverlay = document.getElementById('flash-overlay');

  introScene.addEventListener('click', () => {
    if (introScene.classList.contains('zooming')) return;

    // Start zoom
    introScene.classList.add('zooming');

    // Flash and reveal content
    setTimeout(() => {
      flashOverlay.classList.add('flash');
    }, 2400);

    setTimeout(() => {
      introScene.style.display = 'none';
      siteContent.style.display = 'block';
      flashOverlay.classList.remove('flash');
      setTimeout(() => siteContent.classList.add('visible'), 50);
    }, 2900);
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('revealed'), i * 100);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));