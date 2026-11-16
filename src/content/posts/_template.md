---
# Required: the post title shown on cards, the post page, and metadata.
title: "Replace with your post title"

# Required: the short summary shown below the title and in metadata.
description: "Replace with a one-sentence summary"

# Required: publication date. Use YYYY-MM-DD.
date: 2026-01-01

# Optional: the only currently supported language. Defaults to en.
lang: en

# Required: use one of: homelab, local-ai, dev-notes, thoughts.
category: homelab

# Required: tags are free-form strings; they do not need to be registered elsewhere.
tags: ["Homelab", "Example"]

# Required: use a generated cover name (astro, vue, css, notes, life, typescript,
# git, design), or a local image such as /images/my-cover.webp
# (supported formats: avif, gif, jpeg, jpg, png, webp).
cover: notes

# Optional: highlights the post and changes its cover treatment.
featured: false

# Optional: keeps the post out of the site until you are ready to publish it.
draft: false
edits:
  - date: 2026-11-14
    note: "Added a cover image"
# Optional: notes about what changed after publishing (a new cover, a
# restyle, a config update, …). Each entry needs a date (YYYY-MM-DD) and a
# short note; they render as small "edit: …" lines at the bottom of the post.
# Uncomment and add one line per edit:
# edits:
#   - date: 2026-01-02
#     note: "Added a new post cover"
---

Write your post here. Delete this example text and replace it with Markdown.

## Text and formatting

Use **bold**, _italic_, _**bold italic**_, ~~strikethrough~~, and `inline code` in any paragraph.

Link to other posts with internal links like [the first post](/posts/welcome-to-edgerunr-blog/) and to external references like [example.com](https://example.com).

## Images

Put image files in `public/images/` and reference them with an absolute path:

![Alt text describing the image](/images/my-image.webp)

## Code

Fenced code blocks with a language name:

```bash
pnpm install
pnpm dev
```

```ts
const greeting = "Hello, Choom";
```

## Lists

Unordered lists:

- First item
- Second item
  - Nested item

Numbered lists:

1. First step
2. Second step

## Tables

| Label  | Value |
| ------ | ----- |
| First  | Value |
| Second | Value |

## Plain blockquote and horizontal rule

> A blockquote without a `[!type]` marker stays a plain quote.

---

## Callout blocks

Obsidian-style note blocks. Write them as blockquotes whose first line starts
with a `[!type]` marker; the text after the marker becomes the title (it
defaults to the type name), and the body can use regular Markdown.

> [!note]
> A plain note block.

> [!info] Something to know
> An info block with a custom title.

> [!tip] A quick tip
> A tip block.

> [!success] It worked
> A success block.

> [!warning] Careful
> A warning block.

> [!danger] Dangerous
> A danger block.

> [!failure] It broke
> A failure block.

> [!question] A question
> A question block.

> [!bug] A bug
> A bug block.

> [!example] An example
> An example block.

> [!quote] A quote
> A quote block.

### Collapsible callouts

Add `-` (starts collapsed) or `+` (starts open) after the closing bracket:

> [!note]- Click to expand
> This block is collapsed by default.

> [!tip]+ Already open
> This block starts in the expanded state.

Unknown types are still allowed and fall back to the default note styling.

<!-- HTML comments are not rendered; use them for TODOs, for example:
TODO: add a screenshot of the setup -->
