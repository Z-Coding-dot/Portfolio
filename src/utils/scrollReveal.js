// Reveal once, then leave content settled so scrolling never hides it again.
export const getScrollReveal = (reduceMotion, delay = 0) => ({
  initial: reduceMotion ? false : 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.08 },
  variants: {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 28,
      transition: { duration: reduceMotion ? 0 : 0.2, delay: 0 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.55,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
});
