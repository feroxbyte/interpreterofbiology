// Adds .is-visible to .reveal elements as they enter the viewport.
// Respects prefers-reduced-motion (CSS already shows them; this is progressive enhancement).
function initReveal() {
  // Motion-sensitive users: CSS already renders .reveal fully visible, so skip
  // the observer entirely rather than animating anything in.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const els = document.querySelectorAll<HTMLElement>(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add("is-visible");
          io.unobserve(el);
          // Release the GPU layer hint once the slide-in is done so dozens of
          // revealed cards don't each keep a composited layer alive.
          el.addEventListener(
            "transitionend",
            () => {
              el.style.willChange = "auto";
            },
            { once: true },
          );
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );
  els.forEach((el) => io.observe(el));
}

document.addEventListener("DOMContentLoaded", initReveal);
