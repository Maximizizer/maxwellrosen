# Interest photos

Photos for the popups on the About page. One folder per interest:

- `images/interests/running/`
- `images/interests/hiking/`
- `images/interests/food/`

## Before uploading

- **Format:** JPG, not HEIC.
- **Size:** about 1600px wide and under 500 KB. On macOS: `sips -Z 1600 photo.jpg`
- **Strip GPS location.**
  - Photos app export: uncheck "Location Information".
  - iPhone Share sheet: tap Options and turn Location off.
- **Captions:** avoid anything that reveals routines or places you go regularly.
- **Filenames:** lowercase with dashes, no spaces (e.g. `torrey-pines-sunset.jpg`).

## Adding a photo (GitHub web UI)

1. Open the folder above on GitHub → **Add file → Upload files** → commit.
2. Open `interests/<slug>.html` → pencil icon → paste this inside the `<div class="modal-gallery">`:

   ```html
   <figure>
     <img src="images/interests/running/torrey-pines-sunset.jpg" alt="Short description" loading="lazy" data-lightbox>
     <figcaption>Caption text</figcaption>
   </figure>
   ```

3. Delete one `<div class="photo-tile-placeholder">` line, then commit. The site updates in a minute or two.
