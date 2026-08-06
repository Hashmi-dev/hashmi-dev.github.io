// Position values are percentages of the scene container so layout stays
// resize-safe before drag ever kicks in. Drift range/duration are in
// px / seconds; rotate is the max degrees of ambient sway.
const floatingItems = [
  {
    id: 'matcha',
    label: 'Matcha',
    image: '/floating-images/Matcha.png',
    size: 100,
    initial: { xPct: 12, yPct: 22 },
    drift: { range: 14, duration: 6.5, rotate: 4 },
    zIndex: 2,
  },
  {
    id: 'matcha-strawberry',
    label: 'Strawberry matcha',
    image: '/floating-images/Matcha-Strawberry.jpg',
    size: 92,
    framed: true,
    initial: { xPct: 86, yPct: 26 },
    drift: { range: 12, duration: 5.8, rotate: 4 },
    zIndex: 2,
  },
  {
    id: 'lily',
    label: 'Lily',
    image: '/floating-images/Lily-yellow.png',
    size: 88,
    initial: { xPct: 18, yPct: 72 },
    drift: { range: 16, duration: 7, rotate: 3 },
    zIndex: 2,
  },
  {
    id: 'lily-two',
    label: 'Lily',
    image: '/floating-images/Lily-orange-yellow.png',
    size: 94,
    initial: { xPct: 80, yPct: 68 },
    drift: { range: 13, duration: 6, rotate: 4 },
    zIndex: 2,
  },
  {
    id: 'hydrangea',
    label: 'Hydrangea',
    image: '/floating-images/hydreagena-blue.png',
    size: 86,
    initial: { xPct: 50, yPct: 12 },
    drift: { range: 11, duration: 5, rotate: 5 },
    zIndex: 2,
  },
];

export default floatingItems;
