import esbuild from 'esbuild';
import {globSync} from 'glob';

const ejsFiles = globSync('src/views/**/*.ejs');

esbuild
    .build({
        entryPoints: ['src/app.ts', ...ejsFiles],
        bundle: true,
        minify: true,
        sourcemap: true,
        platform: 'node',
        outdir: 'dist',
        loader: {'.ejs': 'copy'},
        external: ['pg-hstore']
    })
    .catch(() => process.exit(1));
