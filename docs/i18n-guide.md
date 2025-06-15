# CMS Translation Guide

This project uses markdown files under the `content/` directory as the source for CMS data.  To provide multilingual content you can create language-specific copies of these files.

## Directory Structure

```
content/
  <language>/
    company/
    contact/
    pages/
    services/
    news/
```

Each `<language>` folder uses the same filenames as the default Chinese content.  For example, the English translation of `content/company/basic-info.md` lives at `content/en/company/basic-info.md`.

Currently supported language codes:

- `zh` – Simplified Chinese (default)
- `ja` – Japanese
- `en` – English

## Updating Translations

1. Copy the original Chinese markdown file to the appropriate language folder.
2. Translate the front matter fields and the body text.
3. Run `npm run generate-cms` to regenerate CMS JSON files under `public/api/`.
4. Run `npm run generate-news` to rebuild multilingual news indexes.

The hooks in `src/hooks/useCMSContent.js` will automatically load `/api/<path>.<lang>.json` if it exists, falling back to the default file when a translation is missing.
