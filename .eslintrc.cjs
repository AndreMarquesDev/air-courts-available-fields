module.exports = {
    extends: ['andremarquesdev'],
    plugins: ['svelte3'],
    overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
    settings: {
        'svelte3/typescript': () => require('typescript'),
    },
};
