export interface Pattern {
  id: string;
  name: string;
  css: string;
}

export const patterns: Pattern[] = [
  {
    id: 'none',
    name: 'Solid Color',
    css: 'none'
  },
  {
    id: 'dots',
    name: 'Polka Dots',
    css: 'radial-gradient(circle, var(--color-primary-light) 1px, transparent 1px) 0 0 / 20px 20px'
  },
  {
    id: 'grid',
    name: 'Graph Paper',
    css: 'linear-gradient(to right, var(--color-primary-light) 1px, transparent 1px) 0 0 / 20px 20px, linear-gradient(to bottom, var(--color-primary-light) 1px, transparent 1px) 0 0 / 20px 20px'
  },
  {
    id: 'lines',
    name: 'Diagonal Lines',
    css: 'repeating-linear-gradient(45deg, var(--color-primary-light), var(--color-primary-light) 2px, transparent 2px, transparent 10px)'
  },
  {
    id: 'waves',
    name: 'Subtle Waves',
    css: 'radial-gradient(circle at 100% 50%, transparent 20%, var(--color-primary-light) 21%, var(--color-primary-light) 34%, transparent 35%, transparent) 0 0 / 40px 40px'
  },
  {
    id: 'checker',
    name: 'Checkerboard',
    css: 'conic-gradient(var(--color-primary-light) 90deg, transparent 90deg 180deg, var(--color-primary-light) 180deg 270deg, transparent 270deg) 0 0 / 40px 40px'
  }
];
