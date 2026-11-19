import {gsap, ScrollTrigger} from './gsapConfig';

export function createScopedAnimation(
  scope: HTMLElement | null,
  setup: () => void,
): () => void {
  if (!scope) return () => {};
  const ctx = gsap.context(() => {
    setup();
  }, scope);

  return () => {
    ctx.revert();
  };
}

export function cleanupAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
