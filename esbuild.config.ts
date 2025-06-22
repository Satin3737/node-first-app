import dotenv from 'dotenv';
import esbuild from 'esbuild';
import {globSync} from 'glob';

dotenv.config();

esbuild
    .build({
        entryPoints: ['src/app.ts', ...globSync('src/views/**/*.ejs')],
        bundle: true,
        minify: true,
        sourcemap: true,
        platform: 'node',
        outdir: 'dist',
        loader: {'.ejs': 'copy'},
        define: Object.fromEntries(
            Object.entries(process.env).map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
        )
    })
    .catch(() => process.exit(1));
