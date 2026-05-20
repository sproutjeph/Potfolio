import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

let registered = false;

export function registerGsap() {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function splitChars(target: Element | string): SplitType {
  return new SplitType(target as HTMLElement, {
    types: 'chars,words',
    tagName: 'span',
    charClass: 'split-char',
    wordClass: 'split-word',
  });
}

export function splitWords(target: Element | string): SplitType {
  return new SplitType(target as HTMLElement, {
    types: 'words',
    tagName: 'span',
    wordClass: 'split-word',
  });
}

export { gsap, ScrollTrigger, SplitType };
