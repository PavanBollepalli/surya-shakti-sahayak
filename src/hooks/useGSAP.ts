import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAP = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {}, ref);
    return () => ctx.revert();
  }, []);

  return { ref, gsap, ScrollTrigger };
};

export const useScrollAnimation = (
  selector: string,
  animation: gsap.TweenVars,
  trigger?: ScrollTrigger.Vars
) => {
  const { ref } = useGSAP();

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(selector);
    
    elements.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50, ...animation.from },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          ...animation.to,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            ...trigger,
          },
        }
      );
    });
  }, [selector, animation, trigger]);

  return ref;
};

export const useCounterAnimation = (
  selector: string,
  endValue: number,
  duration: number = 2
) => {
  const { ref } = useGSAP();

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(selector);
    
    elements.forEach((element) => {
      const counter = { value: 0 };
      
      gsap.to(counter, {
        value: endValue,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          element.textContent = Math.round(counter.value).toLocaleString();
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, [selector, endValue, duration]);

  return ref;
};

export const useParallax = (selector: string, speed: number = 0.5) => {
  const { ref } = useGSAP();

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(selector);
    
    elements.forEach((element) => {
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }, [selector, speed]);

  return ref;
};

export const useStaggerAnimation = (
  selector: string,
  animation: gsap.TweenVars,
  stagger: number = 0.1
) => {
  const { ref } = useGSAP();

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(selector);
    
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30, ...animation.from },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger,
        ...animation.to,
        scrollTrigger: {
          trigger: elements[0],
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [selector, animation, stagger]);

  return ref;
};

export const useTextReveal = (selector: string) => {
  const { ref } = useGSAP();

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(selector);
    
    elements.forEach((element) => {
      const text = element.textContent;
      const chars = text?.split('') || [];
      
      element.innerHTML = chars
        .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');
      
      const spans = element.querySelectorAll('span');
      
      gsap.fromTo(
        spans,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.02,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, [selector]);

  return ref;
};