# Edgerunr Blog

Personal, anonymous blog about homelabs, privacy, self-hosting, development,
and useful technology.

## Development

Requirements:

- Node.js 22.12 or newer
- pnpm 10.33 or newer

Install dependencies and start the development server:

```powershell
pnpm install
pnpm dev
```

The site is available at `http://localhost:4321`.

## Build

```powershell
$env:SITE_URL = "https://blog.edgerunr-v.com"
pnpm build
```

The static output is written to `dist/`.

## Writing posts

Create English Markdown posts in
[`src/content/posts/`](src/content/posts/). The required frontmatter is
validated by [`src/content.config.ts`](src/content.config.ts). Copy
[`src/content/posts/_template.md`](src/content/posts/_template.md), replace
the example values, and delete any optional fields you do not need. The
leading underscore keeps the template out of the generated posts.

### Post frontmatter

| Field         | Required | Values and purpose                                                                                                                 |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | Yes      | The post title.                                                                                                                    |
| `description` | Yes      | A short summary used on cards and in metadata.                                                                                     |
| `date`        | Yes      | Publication date in `YYYY-MM-DD` format.                                                                                           |
| `lang`        | No       | `en` (the only currently supported language); defaults to `en`.                                                                    |
| `category`    | Yes      | One of `homelab`, `local-ai`, `dev-notes`, or `thoughts`.                                                                          |
| `tags`        | Yes      | A list of free-form strings. Tags do not need to be registered.                                                                    |
| `cover`       | Yes      | One of `astro`, `vue`, `css`, `notes`, `life`, `typescript`, `git`, or `design`; or an image path such as `/images/my-cover.webp`. |
| `featured`    | No       | `true` highlights the post and changes its cover treatment; defaults to `false`.                                                   |
| `draft`       | No       | `true` hides the post from the site; defaults to `false`.                                                                          |

The template contains all supported fields with inline explanations. Do not
remove the required fields unless the schema is changed as well.

### Callout blocks

Posts support Obsidian-style callout blocks. Write them as blockquotes whose
first line starts with a `[!type]` marker; the text after the marker becomes
the title (it defaults to the type name):

```md
> [!note]
> A simple note block.

> [!warning] Custom title
> The body can use regular Markdown.

> [!tip]- Collapsed by default
> Add `-` or `+` after the closing bracket to make the block collapsible
> (`-` starts it collapsed).
```

Available types: `note`, `info`, `tip`, `success`, `question`, `warning`,
`danger`, `failure`, `bug`, `example`, and `quote`. Any other name works too
and falls back to the default styling. Regular blockquotes that do not start
with a `[!type]` marker keep their normal quote styling.

## Configuration

Site identity, author details, navigation, and social links are configured in
[`src/site.config.json`](src/site.config.json). English interface text is in
[`src/i18n/en.json`](src/i18n/en.json).

## Visual themes

Visual presets live in [`src/themes/`](src/themes/). To add a preset, create a
CSS file with a `data-preset` selector, import it from
[`src/styles/global.css`](src/styles/global.css), and add its name to
[`src/themes/presets.ts`](src/themes/presets.ts). The palette and
`--hero-image` variable control the page colors and hero background.

Post previews can use the generated covers listed in
`src/data/post-options.ts` (for example `cover: notes`) or a local image
stored in `public/images/`:

```yaml
cover: /images/my-preview.webp
```

Markdown images inside the post use the same `public/images/` folder:

```md
![Description of the image](/images/my-image.webp)
```
