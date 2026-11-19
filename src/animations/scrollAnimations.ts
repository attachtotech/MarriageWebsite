import {gsap, ScrollTrigger} from './gsapConfig';

export function animateDrawPaths(
  container: HTMLElement | null,
  reducedMotion: boolean,
  triggerStart = 'top 82%',
) {
  if (!container || reducedMotion) return;
  const paths = container.querySelectorAll<SVGGeometryElement>('[data-draw-path]');
  paths.forEach((path) => {
    const length = typeof path.getTotalLength === 'function' ? path.getTotalLength() : 220;
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.25,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: path,
        start: triggerStart,
        once: true,
      },
    });
  });
}

export function animateClipReveal(
  element: HTMLElement | null,
  reducedMotion: boolean,
  options?: {
    fromClip?: string;
    duration?: number;
    delay?: number;
    start?: string;
  },
) {
  if (!element || reducedMotion) return;
  const fromClip = options?.fromClip ?? 'inset(10% 0% 10% 0%)';
  gsap.fromTo(
    element,
    {
      clipPath: fromClip,
      opacity: 0.35,
    },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      duration: options?.duration ?? 1.15,
      delay: options?.delay ?? 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: options?.start ?? 'top 84%',
        once: true,
      },
    },
  );
}

export function animateParallax(
  element: HTMLElement | null,
  trigger: HTMLElement | null,
  reducedMotion: boolean,
  yPercent = 10,
) {
  if (!element || !trigger || reducedMotion) return;
  gsap.fromTo(
    element,
    {yPercent: -yPercent / 2, scale: 1.06},
    {
      yPercent: yPercent / 2,
      scale: 1.06,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    },
  );
}

export function animateStaggerWords(
  elements: NodeListOf<Element> | HTMLElement[] | null,
  trigger: HTMLElement | null,
  reducedMotion: boolean,
  delay = 0,
) {
  if (!elements || elements.length === 0 || reducedMotion) return;
  gsap.fromTo(
    elements,
    {
      y: 22,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.055,
      delay,
      ease: 'power3.out',
      scrollTrigger: trigger
        ? {
            trigger,
            start: 'top 84%',
            once: true,
          }
        : undefined,
    },
  );
}

export function refreshScrollTriggersSoon() {
  if (typeof window === 'undefined') return;
  window.requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}
