(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const toast = document.querySelector('.toast');
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('open', !open);
    toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open navigation');
  }));

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));

  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }));

  const form = document.querySelector('#enquiry-form');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Website enquiry: ${data.get('interest')}`);
    const body = encodeURIComponent(
      `Name / Company: ${data.get('name')}\nEmail: ${data.get('email')}\nBusiness area: ${data.get('interest')}\n\nEnquiry details:\n${data.get('message') || 'Not provided'}`
    );
    window.location.href = `mailto:info@hotspingoils.com?subject=${subject}&body=${body}`;
    if (toast) {
      toast.textContent = 'Your email app should open with the enquiry ready to send.';
      toast.classList.add('show');
      window.setTimeout(() => toast.classList.remove('show'), 4200);
    }
  });
})();

// Expandable service and industry details. These remain on this one-page site.
document.querySelectorAll('.expand-trigger').forEach(button => {
  const label = button.querySelector('span:first-child');
  if (label) button.dataset.closedLabel = label.textContent.trim();
  button.addEventListener('click', () => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;
    const opening = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(opening));
    panel.hidden = !opening;
    if (label) label.textContent = opening ? 'Hide service details' : button.dataset.closedLabel;
  });
});

document.querySelectorAll('.sector-row').forEach(button => {
  button.addEventListener('click', () => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;
    const opening = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(opening));
    panel.hidden = !opening;
  });
});
