import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollIndicator: React.FC = () => {
  useEffect(() => {
    const indicator = document.querySelector('.scroll-indicator');
    
    if (indicator) {
      gsap.to(indicator, {
        scaleX: 1,
        transformOrigin: 'left',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }
  }, []);

  return <div className="scroll-indicator" />;
};

export default ScrollIndicator;