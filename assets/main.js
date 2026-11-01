(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const cfg = window.MLY_CONFIG || {};
  const $ = (sel) => document.querySelector(sel);
  const filled = (v) => typeof v === 'string' && v.trim().length > 0;
  const safeUrl = (v) => {
    if (!filled(v)) return null;
    try { const u = new URL(v); return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : null; }
    catch { return null; }
  };
  const setText = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };

  // Bandeau avant-première. Le meta noindex est retiré MANUELLEMENT lors de la publication.
  const preview = $('#preview-banner');
  if (preview) preview.hidden = cfg.demoMode === false;
  if (cfg.demoMode === false) setText('services-intro', 'Une approche de la coiffure pensée pour chaque style, chaque envie et chaque moment.');
  const note = $('#services-note');
  if (note) note.hidden = cfg.demoMode === false;
  const galleryNotice = $('.gallery-notice');
  if (galleryNotice) galleryNotice.hidden = cfg.demoMode === false;

  setText('year', String(new Date().getFullYear()));

  // Prestations, contrôlées depuis config.js. textContent empêche les injections HTML.
  const grid = $('#service-grid');
  if (grid && Array.isArray(cfg.services) && cfg.services.length) {
    grid.replaceChildren();
    cfg.services.forEach((item, idx) => {
      const article = document.createElement('article');
      article.className = 'service-card reveal';
      const top = document.createElement('div'); top.className = 'service-card-top';
      const number = document.createElement('span'); number.className = 'service-number'; number.textContent = item.number || String(idx + 1).padStart(2, '0');
      const icon = document.createElement('span'); icon.className = 'service-icon'; icon.setAttribute('aria-hidden','true'); icon.textContent = '↗';
      top.append(number, icon);
      const title = document.createElement('h3'); title.textContent = item.title || 'Prestation';
      const desc = document.createElement('p'); desc.textContent = item.description || '';
      article.append(top, title, desc);
      if (filled(item.price)) { const price = document.createElement('span'); price.className = 'service-price'; price.textContent = item.price; article.append(price); }
      grid.append(article);
    });
  }

  // Adresse : aucune ville, numéro, téléphone ou horaire n'est inventé.
  const address = [cfg.address, cfg.city].filter(filled).join(', ');
  if (address) setText('address-display', address);
  const mapLink = $('#map-link');
  const mapUrl = safeUrl(cfg.mapUrl);
  if (mapLink && mapUrl) { mapLink.href = mapUrl; mapLink.hidden = false; }

  const contactDetails = $('#contact-details');
  const lines = [];
  if (filled(cfg.phone)) {
    const dial = cfg.phone.replace(/[^+\d]/g, '');
    if (dial) { const a = document.createElement('a'); a.href = 'tel:' + dial; a.textContent = cfg.phone; lines.push(a); }
  }
  if (filled(cfg.email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cfg.email)) {
    const a = document.createElement('a'); a.href = 'mailto:' + cfg.email; a.textContent = cfg.email; lines.push(a);
  }
  if (contactDetails && lines.length) {
    contactDetails.replaceChildren();
    lines.forEach((a, i) => { if (i) contactDetails.append(document.createElement('br')); contactDetails.append(a); });
  }
  const hours = $('#hours-display');
  if (hours && Array.isArray(cfg.hours) && cfg.hours.length) {
    hours.replaceChildren();
    cfg.hours.forEach(({day, time}) => {
      const row = document.createElement('div');
      const d = document.createElement('span'); d.textContent = day || '';
      const t = document.createElement('span'); t.textContent = time || '';
      row.append(d,t); hours.append(row);
    });
  }

  const instagramLink = $('#instagram-link');
  const instagramUrl = safeUrl(cfg.instagramUrl);
  if (instagramLink && instagramUrl) { instagramLink.href = instagramUrl; instagramLink.hidden = false; }

  const bookingUrl = safeUrl(cfg.bookingUrl);
  const contactAction = $('#contact-action');
  const headerCta = $('#header-cta');
  if (bookingUrl) {
    if (contactAction) { contactAction.href = bookingUrl; contactAction.innerHTML = 'Prendre rendez-vous <span aria-hidden="true">↗</span>'; contactAction.target = '_blank'; contactAction.rel = 'noopener noreferrer'; }
    if (headerCta) { headerCta.href = bookingUrl; headerCta.innerHTML = 'Réserver <span aria-hidden="true">↗</span>'; headerCta.target = '_blank'; headerCta.rel = 'noopener noreferrer'; }
  } else if (filled(cfg.phone)) {
    const dial = cfg.phone.replace(/[^+\d]/g, '');
    if (dial && contactAction) { contactAction.href = 'tel:' + dial; contactAction.innerHTML = 'Appeler le salon <span aria-hidden="true">↗</span>'; }
  } else if (filled(cfg.email)) {
    if (contactAction) { contactAction.href = 'mailto:' + cfg.email; contactAction.innerHTML = 'Écrire au salon <span aria-hidden="true">↗</span>'; }
  } else if (contactAction) {
    // Pas de CTA mensonger si les coordonnées ne sont pas encore fournies.
    contactAction.hidden = true;
  }

  // Navigation mobile accessible.
  const menuButton = $('#menu-toggle');
  const nav = $('#main-nav');
  const closeNav = () => { nav?.classList.remove('open'); menuButton?.setAttribute('aria-expanded','false'); menuButton?.setAttribute('aria-label','Ouvrir le menu'); };
  menuButton?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open') || false;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', (evt) => { if(evt.key === 'Escape') closeNav(); });
  document.addEventListener('click', (evt) => { if(nav?.classList.contains('open') && !nav.contains(evt.target) && !menuButton?.contains(evt.target)) closeNav(); });

  // Animations discrètes, désactivées si l'utilisateur préfère moins de mouvement.
  const nodes = document.querySelectorAll('.reveal');
  if (typeof IntersectionObserver === 'function' && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } });
    }, {threshold:.08, rootMargin:'0px 0px -15px 0px'});
    nodes.forEach(el => observer.observe(el));
  } else { nodes.forEach(el => el.classList.add('in-view')); }
})();
