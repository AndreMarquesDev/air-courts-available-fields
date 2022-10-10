module.exports = {
    extends: ['andremarquesdev'],
    plugins: ['svelte3'],
    overrides: [
        {
            files: ['*.svelte'],
            processor: 'svelte3/svelte3',
        },
        {
            files: ['*'],
            rules: {
                'line-comment-position': 'off',
            },
        },
    ],
    settings: {
        'svelte3/typescript': () => require('typescript'),
    },
};
