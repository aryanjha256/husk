#!/usr/bin/env node

/**
 * husk build script
 * Zero dependencies — just Node.js
 * Concatenates src/ files into dist/ bundle
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const PKG = require('./package.json');

// CSS files in load order
const CSS_FILES = [
    'base.css',
    'typography.css',
    'forms.css',
    'tables.css',
    'components/card.css',
    'components/dialog.css',
    'components/details.css',
    'components/nav.css',
    'components/toast.css',
    'components/badge.css',
    'components/progress.css',
    'components/tooltip.css',
    'components/alert.css',
    'components/switch.css',
    'components/skeleton.css',
    'components/sidebar.css',
    'components/spinner.css',
    'components/breadcrumb.css',
];

// JS files in load order
const JS_FILES = [
    'js/toast.js',
    'js/dialog.js',
];

// ——— Helpers ———

function read(file) {
    return fs.readFileSync(path.join(SRC, file), 'utf8');
}

function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '')       // strip comments
        .replace(/\s+/g, ' ')                    // collapse whitespace
        .replace(/\s*([{}:;,>~+])\s*/g, '$1')   // trim around symbols
        .replace(/;}/g, '}')                      // drop trailing ;
        .trim();
}

function sizeKB(str) {
    return (Buffer.byteLength(str, 'utf8') / 1024).toFixed(1);
}

// ——— Build ———

if (!fs.existsSync(DIST)) {
    fs.mkdirSync(DIST, { recursive: true });
}

// CSS bundle
let css = `/*! husk v${PKG.version} | MIT License | https://github.com/aryanjha256/husk */\n\n`;
for (const file of CSS_FILES) {
    css += `/* --- ${file} --- */\n${read(file)}\n\n`;
}
fs.writeFileSync(path.join(DIST, 'husk.css'), css);

const cssMin = minifyCSS(css);
fs.writeFileSync(path.join(DIST, 'husk.min.css'), cssMin);

// JS bundle
let js = `/*! husk v${PKG.version} | MIT License */\n`;
js += '(function(root){\n"use strict";\n\n';
for (const file of JS_FILES) {
    const src = read(file)
        // Remove each file's own IIFE wrapper to avoid double-wrapping
        .replace(/^\(function\s*\([^)]*\)\s*\{[\s\S]*?'use strict';\s*/m, '')
        .replace(/\}\)\(typeof window[\s\S]*$/, '');
    js += `// --- ${file} ---\n${src}\n`;
}
js += '})(typeof window !== "undefined" ? window : this)\n';
fs.writeFileSync(path.join(DIST, 'husk.js'), js);

// Report
console.log(`\n  husk v${PKG.version} built successfully\n`);
console.log(`  dist/husk.css      ${sizeKB(css)} KB`);
console.log(`  dist/husk.min.css  ${sizeKB(cssMin)} KB`);
console.log(`  dist/husk.js       ${sizeKB(js)} KB`);

// Copy to docs/ for GitHub Pages
const DOCS = path.join(ROOT, 'docs');
if (fs.existsSync(DOCS)) {
    fs.copyFileSync(path.join(DIST, 'husk.min.css'), path.join(DOCS, 'husk.css'));
    fs.copyFileSync(path.join(DIST, 'husk.js'), path.join(DOCS, 'husk.js'));
    const mascot = path.join(ROOT, 'assets', 'mascot.png');
    if (fs.existsSync(mascot)) {
        fs.copyFileSync(mascot, path.join(DOCS, 'mascot.png'));
    }
    console.log('  docs/ assets synced');
}
console.log('');
