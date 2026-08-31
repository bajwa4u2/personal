(() => {
  const nodes = document.querySelectorAll('.journey-condition,.journey-gap,.journey-close');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.dataset.seen = 'true';
      observer.unobserve(entry.target);
    }
  }), { threshold: .08 });
  nodes.forEach((node) => observer.observe(node));
})();
