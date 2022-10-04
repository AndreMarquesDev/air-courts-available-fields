module.exports = {
    extends: ['andremarquesdev'],
    plugins: ['svelte3'],
    parserOptions: {
        project: ['tsconfig.json', './cypress/tsconfig.json'],
    },
    overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
    settings: {
        'svelte3/typescript': () => require('typescript')
    },
};
