# junwei0102.github.io

Personal research site. Hand-built static HTML/CSS/JS — no build step, no dependencies.

```
index.html    the whole page
style.css     all styling; the palette lives in the :root block at the top
main.js       email assembly, nav scroll-spy, theme toggle
assets/       portrait + CV
```

## Editing

Open `index.html` and edit the text. Sections are marked with banner comments
(`ABOUT`, `RESEARCH`, `NEWS`, `PUBLICATIONS`, `EXPERIENCE`, `EDUCATION`).

**Adding a news item** — copy an existing `<li>` in the `.news` list and put it at the
top. Newest first.

**Adding a paper** — papers are grouped by area; each `.pub-group` has its own `.pubs`
list. Copy an existing `<li>` into the right group, newest first, and give it an `id`
so other parts of the page can link to it. Links go in the `.pub-links` line under the
summary; drop any the paper doesn't have:

```html
<p class="pub-links"><a href="…">arXiv</a> <a href="…">project page</a> <a href="…">code</a></p>
```

To start a new area, copy a whole `.pub-group` block and give it the next number.

**Changing colours** — edit the tokens in `:root` in `style.css`. Each one is defined
three times: the light default, then the dark overrides under
`@media (prefers-color-scheme: dark)` and `:root[data-theme="dark"]`. Change all three.

**Updating the CV** — replace `assets/cv.pdf`.

## Preview locally

```sh
python3 -m http.server 8000
```

then open <http://localhost:8000>. Opening `index.html` directly works too.

## Deploy

First time — create an empty repo named `junwei0102.github.io` on GitHub (no README,
no license), then:

```sh
git remote add origin git@github.com:junwei0102/junwei0102.github.io.git
git push -u origin main
```

GitHub Pages serves user sites from this repo automatically; the site appears at
<https://junwei0102.github.io> within a minute or two. After that, every deploy is:

```sh
git add -A && git commit -m "update" && git push
```

## TODO

- Replace the placeholder Google Scholar URL in `index.html` (search for `TODO`).
- Verify the inferred months in the News section (search for `NOTE`).
