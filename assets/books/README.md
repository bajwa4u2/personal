# Book covers

Drop book-cover images here. Each cover should be:

- **Aspect ratio:** 2:3 (standard book cover). Square or 3:4 covers will be center-cropped to 2:3 by the page CSS.
- **Resolution:** at least 800 × 1200 px so the rendered tile stays crisp on Retina.
- **Format:** PNG or JPEG.
- **Filename:** lowercase, hyphens or underscores, no spaces. E.g. `the_burden_of_knowing.png`.

After adding a cover here, register it in `../../data/books.json`:

```json
{
  "id": "the-new-book",
  "title": "The New Book",
  "cover": "assets/books/the_new_book.png",
  "alt": "Cover of 'The New Book' by M S Bajwa.",
  "url": "https://bajwawrites.com/the-new-book"
}
```

The `Selected Works · Books` section on `writing.html` renders straight from
`books.json`. Empty or missing manifest collapses to a graceful empty state.
