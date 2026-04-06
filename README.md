<p align="center">
  <strong>husk</strong>
</p>

<p align="center">
  Write HTML. Ship design.
</p>

---

An ultra-lightweight UI library that styles semantic HTML. No classes. No frameworks. No build step. Just HTML that looks good.

```html
<link rel="stylesheet" href="husk.css" />
```

That's it. Your `<button>` looks like a button. Your `<table>` looks like a table. Your `<dialog>` is a modal. Write HTML the way it was meant to be written.

## Why husk?

- **0 classes to memorize** — styles semantic HTML elements directly
- **0 dependencies** — copy one CSS file and you're done
- **0 build step** — no bundler, no config, no framework
- **~4 KB gzipped** — lighter than a hero image
- **Dark mode built-in** — respects `prefers-color-scheme` automatically
- **Modular** — use the full bundle or import only what you need
- **JS optional** — CSS-first; tiny JS only for dynamic components (toasts)

## How it compares

| Task      | Bootstrap                                   | Tailwind                                                    | shadcn/ui                       | **husk**                 |
| --------- | ------------------------------------------- | ----------------------------------------------------------- | ------------------------------- | ------------------------ |
| Button    | `<button class="btn btn-primary">`          | `<button class="bg-blue-500 text-white px-4 py-2 rounded">` | `<Button variant="default">`    | **`<button>`**           |
| Card      | `<div class="card"><div class="card-body">` | `<div class="rounded-lg shadow p-6">`                       | `<Card><CardContent>`           | **`<article>`**          |
| Modal     | JS plugin + 5 nested divs                   | Headless UI component                                       | Dialog component                | **`<dialog>`**           |
| Accordion | JS plugin + classes                         | Custom JS                                                   | Accordion component             | **`<details>`**          |
| Alert     | `<div class="alert alert-danger">`          | `<div class="bg-red-50 border ...">`                        | `<Alert variant="destructive">` | **`<div role="alert">`** |

## Quick start

### Option 1: CDN (fastest)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/husk-ui@latest/dist/husk.css"
    />
    <title>My App</title>
  </head>
  <body>
    <main>
      <h1>Hello, world</h1>
      <p>This already looks good.</p>
      <button>Click me</button>
    </main>
  </body>
</html>
```

### Option 2: npm

```bash
npm install husk-ui
```

```html
<link rel="stylesheet" href="node_modules/husk-ui/dist/husk.css" />
```

Or import in your CSS/JS bundler:

```css
@import "husk-ui/css";
```

### Option 3: Download

Download `dist/husk.css` and drop it in your project. Done.

## Modular imports

Don't want everything? Import only what you need:

```html
<!-- Just the foundation -->
<link rel="stylesheet" href="husk-ui/src/base.css" />
<link rel="stylesheet" href="husk-ui/src/typography.css" />

<!-- Add forms only if you need them -->
<link rel="stylesheet" href="husk-ui/src/forms.css" />

<!-- Pick specific components -->
<link rel="stylesheet" href="husk-ui/src/components/card.css" />
<link rel="stylesheet" href="husk-ui/src/components/dialog.css" />
```

## Semantic HTML cheatsheet

husk styles the elements you already know:

| HTML                      | What you get                    |
| ------------------------- | ------------------------------- |
| `<article>`               | Card with shadow and padding    |
| `<dialog>`                | Centered modal with backdrop    |
| `<details>` / `<summary>` | Accordion / collapsible         |
| `<nav>` with `<ul>`       | Horizontal navigation bar       |
| `<table>`                 | Clean striped table             |
| `<blockquote>`            | Styled quote with accent border |
| `<code>` / `<pre>`        | Syntax-style code blocks        |
| `<kbd>`                   | Keyboard key styling            |
| `<mark>`                  | Highlighted badge               |
| `<progress>` / `<meter>`  | Styled progress bars            |
| `<div role="alert">`      | Alert / notification box        |
| `<a role="button">`       | Link styled as button           |
| `[data-tooltip]`          | Hover tooltip                   |

## Interactive components (JS)

For dynamic components, add the tiny JS file (~1 KB):

```html
<script src="https://unpkg.com/husk-ui@latest/dist/husk.js"></script>
```

### Toast notifications

```js
Husk.toast("File saved successfully");
Husk.toast("Something went wrong", { type: "danger" });
Husk.toast("Heads up!", { type: "warning", duration: 5000 });
```

### Dialog helpers

Wire up modals with zero JS:

```html
<button data-open="my-modal">Open Modal</button>

<dialog id="my-modal">
  <h2>Confirm</h2>
  <p>Are you sure?</p>
  <menu>
    <button data-close>Cancel</button>
    <button data-close>Confirm</button>
  </menu>
</dialog>
```

## Customization

Override CSS custom properties to theme husk:

```css
:root {
  --husk-accent: #e11d48;
  --husk-radius: 0.25rem;
  --husk-font: "Inter", sans-serif;
}
```

All design tokens are exposed as `--husk-*` custom properties.

## Browser support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Uses standard CSS and HTML — no polyfills needed.

## License

MIT
