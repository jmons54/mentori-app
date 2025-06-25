const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'pastel-blue': '#dbeafe',
        'pastel-green': '#dcfce7',
        'pastel-pink': '#fce7f3',
        'pastel-orange': '#ffedd5',
        'mentori-green': '#207567',
        'mentori-orange': '#f28a38',
      },
    },
  },
  plugins: [],
};
