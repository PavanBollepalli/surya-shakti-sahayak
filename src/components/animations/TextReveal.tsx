import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  stagger = 0.02 
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const text = children;
    const chars = text.split('');
    
    // Create spans for each character
    textRef.current.innerHTML = chars
      .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');
    
    const spans = textRef.current.querySelectorAll('span');
    
    // Set initial state
    gsap.set(spans, { 
      opacity: 0, 
      y: 50,
      rotationX: -90,
    });
    
    // Animate on scroll
    ScrollTrigger.create({
      trigger: textRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(spans, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger,
          delay,
          ease: 'back.out(1.7)',
        });
      },
    });

  }, [children, delay, stagger]);

  return (
    <div ref={textRef} className={className} />
  );
};

export default TextReveal;