import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';

let registered = false;

export function ensureGsapRegistered() {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    gsap.defaults({
      ease: 'power3.out',
      duration: 0.9,
    });
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
    registered = true;
  }
}

export {gsap, ScrollTrigger, ScrollToPlugin};
